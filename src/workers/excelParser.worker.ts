import * as XLSX from 'xlsx';

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
        console.log('[Excel Worker] Starting to parse file:', file.name);

        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 90;
                const progressMessage: WorkerMessage = {
                    type: 'progress',
                    progress,
                };
                self.postMessage(progressMessage);
            }
        };

        reader.onload = (event) => {
            try {
                const data = event.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, { type: 'array' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    blankrows: false,
                }) as any[][];

                if (jsonData.length === 0) {
                    throw new Error('Excel 파일이 비어있습니다.');
                }

                const headers = jsonData[0].map((h: any) => String(h || '').trim());
                const rows = jsonData.slice(1);

                console.log('[Excel Worker] Parse complete, rows:', rows.length);

                // 컬럼 타입 추론 (간단 버전)
                const columns = headers.map((name) => ({
                    name,
                    type: 'string',
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
            } catch (error) {
                console.error('[Excel Worker] Parse error:', error);
                const errorMessage: WorkerMessage = {
                    type: 'error',
                    error: error instanceof Error ? error.message : '파싱 중 오류가 발생했습니다.',
                };
                self.postMessage(errorMessage);
            }
        };

        reader.onerror = () => {
            const errorMessage: WorkerMessage = {
                type: 'error',
                error: '파일 읽기 실패',
            };
            self.postMessage(errorMessage);
        };

        reader.readAsArrayBuffer(file);

    } catch (error) {
        console.error('[Excel Worker] Error:', error);
        const errorMessage: WorkerMessage = {
            type: 'error',
            error: error instanceof Error ? error.message : '파싱 중 오류가 발생했습니다.',
        };
        self.postMessage(errorMessage);
    }
};

export { };
