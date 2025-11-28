// 데이터 타입 enum
export enum DataType {
    NUMBER = 'number',
    STRING = 'string',
    DATETIME = 'datetime',
    UNKNOWN = 'unknown',
}

// 차트 타입 enum
export enum ChartType {
    SCATTER = 'scatter',
    LINE = 'line',
    BAR = 'bar',
}

// 컬럼 정보 인터페이스
export interface ColumnInfo {
    name: string;
    type: DataType;
    sampleValues?: any[];
}

// 파싱된 데이터 구조
export interface ParsedData {
    headers: string[];
    rows: any[][];
    rowCount: number;
}

// WebWorker 메시지 타입
export interface WorkerMessage {
    type: 'init' | 'chunk' | 'progress' | 'complete' | 'error';
    progress?: number;
    data?: ParsedData;
    columns?: ColumnInfo[];
    error?: string;
    // For chunk updates
    chunkData?: any[][];
    isFirstChunk?: boolean;
}

// 차트 데이터 포인트
export interface ChartDataPoint {
    x: any;
    y: any;
}

// 파일 정보
export interface FileInfo {
    name: string;
    size: number;
    type: string;
}
