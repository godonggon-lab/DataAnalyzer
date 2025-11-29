import * as XLSX from 'xlsx';

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
        console.log('[Excel Worker] Starting to parse file:', file.name);

        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 50; // 읽기 50%
                self.postMessage({ type: 'progress', progress } as WorkerMessage);
            }
        };

        reader.onload = (event) => {
            try {
                const data = event.target?.result as ArrayBuffer;
                const workbook = XLSX.read(data, { type: 'array', cellDates: true }); // cellDates: true로 날짜 객체 자동 변환

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

                // 컬럼 타입 추론
                const columns = headers.map((name, index) => {
                    const sampleValues = rows
                        .slice(0, 100)
                        .map(row => row[index])
                        .filter(val => val !== null && val !== undefined && val !== '');

                    let type = 'string';
                    if (sampleValues.length > 0) {
                        let numberCount = 0;
                        let dateCount = 0;
                        const total = sampleValues.length;

                        for (const val of sampleValues) {
                            // Date check
                            if (val instanceof Date || (typeof val === 'string' && !isNaN(Date.parse(val)) && val.length > 5 && (val.includes('-') || val.includes('/')))) {
                                dateCount++;
                                continue;
                            }

                            // Number check
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

                // 1. Init 메시지 전송
                self.postMessage({
                    type: 'init',
                    columns,
                    progress: 60
                } as WorkerMessage);

                // 2. Chunk 메시지 전송 (Excel은 한번에 처리하지만 구조 통일)
                // 대용량일 경우 나눠서 보낼 수도 있지만 일단 한번에 전송
                const chunkSize = 5000;
                for (let i = 0; i < rows.length; i += chunkSize) {
                    const chunk = rows.slice(i, i + chunkSize);
                    self.postMessage({
                        type: 'chunk',
                        chunkData: chunk,
                        progress: 60 + Math.min(39, ((i + chunk.length) / rows.length) * 39)
                    } as WorkerMessage);
                }

                // 3. Complete 메시지 전송
                self.postMessage({
                    type: 'complete',
                    progress: 100,
                } as WorkerMessage);

            } catch (error) {
                console.error('[Excel Worker] Parse error:', error);
                self.postMessage({
                    type: 'error',
                    error: error instanceof Error ? error.message : '파싱 중 오류가 발생했습니다.',
                } as WorkerMessage);
            }
        };

        reader.onerror = () => {
            self.postMessage({
                type: 'error',
                error: '파일 읽기 실패',
            } as WorkerMessage);
        };

        reader.readAsArrayBuffer(file);

    } catch (error) {
        console.error('[Excel Worker] Error:', error);
        self.postMessage({
            type: 'error',
            error: error instanceof Error ? error.message : '파싱 중 오류가 발생했습니다.',
        } as WorkerMessage);
    }
};

export { };
