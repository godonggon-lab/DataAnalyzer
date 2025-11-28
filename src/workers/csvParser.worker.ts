import Papa from 'papaparse';

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

                        // 컬럼 타입 추론 로직 (Inline implementation for Worker stability)
                        const columns = headers.map((name, index) => {
                            const sampleValues = firstChunkRows
                                .slice(0, 100)
                                .map(row => row[index])
                                .filter(val => val !== null && val !== undefined && val !== '');

                            let type = 'string';
                            if (sampleValues.length > 0) {
                                let numberCount = 0;
                                let dateCount = 0;
                                const total = sampleValues.length;

                                for (const val of sampleValues) {
                                    // Date check FIRST (날짜를 먼저 체크해야 "2025-11-28"이 숫자로 잘못 인식되지 않음)
                                    let isDate = false;
                                    if (typeof val === 'string' && val.length > 5) {
                                        // 간단한 날짜 형식 체크 (YYYY-MM-DD, MM/DD/YYYY 등)
                                        const datePattern = /^(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{4})/;
                                        if (datePattern.test(val)) {
                                            const date = new Date(val);
                                            isDate = !isNaN(date.getTime());
                                        }
                                    }
                                    if (isDate) {
                                        dateCount++;
                                        continue; // 날짜면 숫자 체크 스킵
                                    }

                                    // Number check (날짜가 아닐 때만)
                                    let isNum = false;
                                    if (typeof val === 'number') {
                                        isNum = !isNaN(val) && isFinite(val);
                                    } else if (typeof val === 'string') {
                                        const cleaned = val.replace(/,/g, '');
                                        const num = parseFloat(cleaned);
                                        isNum = !isNaN(num) && isFinite(num) && cleaned.trim() !== '';
                                    }
                                    if (isNum) numberCount++;
                                }

                                if (numberCount / total >= 0.8) type = 'number';
                                else if (dateCount / total >= 0.8) type = 'datetime';
                            }

                            return {
                                name,
                                type,
                                sampleValues: sampleValues.slice(0, 5),
                            };
                        });

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
