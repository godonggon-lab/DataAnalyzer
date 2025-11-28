import * as XLSX from 'xlsx';
import { ParsedData } from '../types';

/**
 * Excel 파일 파싱
 */
export function parseExcelFile(
    file: File,
    onProgress: (progress: number) => void
): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 90; // 90%까지만
                onProgress(progress);
            }
        };

        reader.onload = (event) => {
            try {
                onProgress(95);

                const data = event.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, { type: 'array' });

                // 첫 번째 시트 선택
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // 시트를 배열로 변환
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    blankrows: false,
                }) as any[][];

                if (jsonData.length === 0) {
                    reject(new Error('Excel 파일이 비어있습니다.'));
                    return;
                }

                // 첫 번째 행을 헤더로 사용
                const headers = jsonData[0].map((h: any) => String(h || '').trim());
                const rows = jsonData.slice(1);

                onProgress(100);

                resolve({
                    headers,
                    rows,
                    rowCount: rows.length,
                });
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('파일 읽기 실패'));
        };

        reader.readAsArrayBuffer(file);
    });
}
