import Papa from 'papaparse';

// 타입 정의
// 타입 정의
interface WorkerMessage {
    type: 'init' | 'chunk' | 'progress' | 'complete' | 'error';
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
    chunkData?: any[][];
}

// WebWorker 컨텍스트에서 실행
self.onmessage = async (event: MessageEvent) => {
    const file = event.data as File;

    try {
        console.log('[CSV Worker] Starting to parse file:', file.name);

        // CSV 파싱
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
                    let chunkData: any[][] = [];

                    if (isFirstChunk && data.length > 0) {
                        headers = data[0].map((h: any) => String(h || '').trim());
                        const firstChunkRows = data.slice(1);
                        chunkData = firstChunkRows;

                        // 컬럼 정보 생성 및 init 메시지 전송
                        const columns = headers.map((name) => ({
                            name,
                            type: 'string', // 초기에는 string으로 설정, 추후 개선 가능
                            sampleValues: [],
                        }));

                        const initMessage: WorkerMessage = {
                            type: 'init',
                            columns,
                            progress: 0,
                        };
                        self.postMessage(initMessage);

                        isFirstChunk = false;
                    } else {
                        chunkData = data;
                    }

                    if (chunkData.length > 0) {
                        const chunkMessage: WorkerMessage = {
                            type: 'chunk',
                            chunkData,
                            progress: Math.min(99, (processedBytes / totalBytes) * 100),
                        };
                        self.postMessage(chunkMessage);
                    }

                    processedBytes += JSON.stringify(data).length;

                } catch (error) {
                    parser.abort();
                    throw error;
                }
            },
            complete: () => {
                console.log('[CSV Worker] Parse complete');

                const completeMessage: WorkerMessage = {
                    type: 'complete',
                    progress: 100,
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
