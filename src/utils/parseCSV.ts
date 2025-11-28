import Papa from 'papaparse';
import { ParsedData } from '../types';

/**
 * CSV 파일을 스트리밍 방식으로 파싱
 */
export function parseCSVFile(
    file: File,
    onProgress: (progress: number) => void
): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
        const rows: any[][] = [];
        let headers: string[] = [];
        let isFirstChunk = true;
        let processedBytes = 0;
        const totalBytes = file.size;

        Papa.parse(file, {
            worker: false, // WebWorker에서 실행되므로 여기서는 false
            header: false,
            skipEmptyLines: true,
            chunk: (results, parser) => {
                try {
                    const data = results.data as any[][];

                    if (isFirstChunk && data.length > 0) {
                        // 첫 번째 행을 헤더로 사용
                        headers = data[0].map((h: any) => String(h || '').trim());
                        rows.push(...data.slice(1));
                        isFirstChunk = false;
                    } else {
                        rows.push(...data);
                    }

                    // 진행률 업데이트 (근사치)
                    processedBytes += JSON.stringify(data).length;
                    const progress = Math.min(95, (processedBytes / totalBytes) * 100);
                    onProgress(progress);
                } catch (error) {
                    parser.abort();
                    reject(error);
                }
            },
            complete: () => {
                onProgress(100);
                resolve({
                    headers,
                    rows,
                    rowCount: rows.length,
                });
            },
            error: (error) => {
                reject(error);
            },
        });
    });
}
