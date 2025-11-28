import Papa from 'papaparse';

// 타입 정의
interface WorkerMessage {
    type: 'progress' | 'complete' | 'error';
    progress?: number;
    data?: {
        headers: string[];
        rows: any[][];
        rowCount: number;
    };
    columns?: Array<{
        name: string;
        type: string;
        sampleValues?: any[];
    }>;
    error?: string;
}

// WebWorker 컨텍스트에서 실행
self.onmessage = async (event: MessageEvent) => {
    const file = event.data as File;

    try {
        console.log('[CSV Worker] Starting to parse file:', file.name);

        // CSV 파싱
        const rows: any[][] = [];
        let headers: string[] = [];
        let isFirstChunk = true;
        let processedBytes = 0;
        const totalBytes = file.size;

        Papa.parse(file, {
            worker: false,
            header: false,
            skipEmptyLines: true,
            chunk: (results, parser) => {
                try {
                    const data = results.data as any[][];

                    if (isFirstChunk && data.length > 0) {
                        headers = data[0].map((h: any) => String(h || '').trim());
                        const firstChunkRows = data.slice(1);
                        for (let i = 0; i < firstChunkRows.length; i++) {
                            rows.push(firstChunkRows[i]);
                        }
                        isFirstChunk = false;
                    } else {
                        for (let i = 0; i < data.length; i++) {
                            rows.push(data[i]);
                        }
                    }

                    processedBytes += JSON.stringify(data).length;
                    const progress = Math.min(95, (processedBytes / totalBytes) * 100);

                    const progressMessage: WorkerMessage = {
                        type: 'progress',
                        progress,
                    };
                    self.postMessage(progressMessage);
                } catch (error) {
                    parser.abort();
                    throw error;
                }
            },
            complete: () => {
                console.log('[CSV Worker] Parse complete, rows:', rows.length);

                // 컬럼 타입 추론 (간단 버전)
                const columns = headers.map((name) => ({
                    name,
                    type: 'string', // 일단 모두 string으로
                    sampleValues: [],
                }));

                const completeMessage: WorkerMessage = {
                    type: 'complete',
                    progress: 100,
                    data: {
                        headers,
                        rows,
                        rowCount: rows.length,
                    },
                    columns,
                };

                self.postMessage(completeMessage);
            },
            error: (error) => {
                console.error('[CSV Worker] Parse error:', error);
                throw error;
            },
        });

    } catch (error) {
        console.error('[CSV Worker] Error:', error);
        const errorMessage: WorkerMessage = {
            type: 'error',
            error: error instanceof Error ? error.message : '파싱 중 오류가 발생했습니다.',
        };
        self.postMessage(errorMessage);
    }
};

export { };
