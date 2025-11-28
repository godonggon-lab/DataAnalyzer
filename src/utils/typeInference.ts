import { DataType, ColumnInfo } from '../types';

/**
 * 데이터 타입 자동 추론
 * 샘플 데이터를 기반으로 각 컬럼의 타입을 판단
 */
export function inferColumnTypes(
    headers: string[],
    rows: any[][],
    sampleSize: number = 100
): ColumnInfo[] {
    const sampleRows = rows.slice(0, Math.min(sampleSize, rows.length));

    return headers.map((header, columnIndex) => {
        const sampleValues = sampleRows
            .map(row => row[columnIndex])
            .filter(val => val !== null && val !== undefined && val !== '');

        const type = inferType(sampleValues);

        return {
            name: header,
            type,
            sampleValues: sampleValues.slice(0, 5), // 처음 5개만 저장
        };
    });
}

/**
 * 단일 컬럼의 타입을 추론
 */
function inferType(values: any[]): DataType {
    if (values.length === 0) {
        return DataType.UNKNOWN;
    }

    let numberCount = 0;
    let dateCount = 0;
    let stringCount = 0;

    for (const value of values) {
        if (isNumber(value)) {
            numberCount++;
        } else if (isDate(value)) {
            dateCount++;
        } else {
            stringCount++;
        }
    }

    const total = values.length;
    const threshold = 0.8; // 80% 이상이면 해당 타입으로 간주

    if (numberCount / total >= threshold) {
        return DataType.NUMBER;
    } else if (dateCount / total >= threshold) {
        return DataType.DATETIME;
    } else {
        return DataType.STRING;
    }
}

/**
 * 숫자 타입 체크
 */
function isNumber(value: any): boolean {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }

    if (typeof value === 'string') {
        // 콤마 제거 후 체크
        const cleaned = value.replace(/,/g, '');
        const num = parseFloat(cleaned);
        return !isNaN(num) && isFinite(num) && cleaned.trim() !== '';
    }

    return false;
}

/**
 * 날짜 타입 체크
 */
function isDate(value: any): boolean {
    if (value instanceof Date) {
        return !isNaN(value.getTime());
    }

    if (typeof value === 'string') {
        // ISO 8601 형식, 일반적인 날짜 형식 체크
        const datePatterns = [
            /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
            /^\d{2}\/\d{2}\/\d{4}/, // MM/DD/YYYY
            /^\d{2}-\d{2}-\d{4}/, // DD-MM-YYYY
            /^\d{4}\/\d{2}\/\d{2}/, // YYYY/MM/DD
        ];

        const matchesPattern = datePatterns.some(pattern => pattern.test(value));
        if (!matchesPattern) {
            return false;
        }

        const date = new Date(value);
        return !isNaN(date.getTime());
    }

    return false;
}

/**
 * 값을 숫자로 변환
 */
export function toNumber(value: any): number {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const cleaned = value.replace(/,/g, '');
        return parseFloat(cleaned);
    }

    return NaN;
}

/**
 * 숫자형 컬럼인지 확인
 */
export function isNumericColumn(column: ColumnInfo): boolean {
    return column.type === DataType.NUMBER;
}
