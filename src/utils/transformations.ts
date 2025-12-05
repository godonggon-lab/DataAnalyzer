import { DataType } from '../types';
import { toNumber } from './typeInference';

export enum TransformationType {
    DROP_MISSING = 'DROP_MISSING',
    FILL_MISSING = 'FILL_MISSING',
    REMOVE_DUPLICATES = 'REMOVE_DUPLICATES',
    GROUP_BY = 'GROUP_BY',
    SORT = 'SORT',
}

export interface Transformation {
    id: string;
    type: TransformationType;
    config: any;
}

export interface Column {
    name: string;
    type: DataType;
}

// Helper to check if a value is "missing" (null, undefined, empty string, NaN for numbers)
const isMissing = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (typeof value === 'number' && isNaN(value)) return true;
    return false;
};

// 1. Drop Missing Values
export const dropMissingValues = (data: any[][], columns: Column[], targetColumns: string[] = []): any[][] => {
    if (targetColumns.length === 0) {
        // Check all columns if none specified
        return data.filter(row => !row.some(cell => isMissing(cell)));
    }

    const indices = targetColumns.map(name => columns.findIndex(c => c.name === name)).filter(i => i !== -1);
    return data.filter(row => !indices.some(i => isMissing(row[i])));
};

// 2. Fill Missing Values
export const fillMissingValues = (data: any[][], columns: Column[], targetColumn: string, strategy: 'ZERO' | 'MEAN' | 'MEDIAN' | 'MODE' | 'CUSTOM', customValue?: any): any[][] => {
    const colIndex = columns.findIndex(c => c.name === targetColumn);
    if (colIndex === -1) return data;

    const newData = data.map(row => [...row]); // Deep copy rows
    const columnValues = data.map(row => row[colIndex]).filter(v => !isMissing(v));

    let fillValue: any = customValue;

    if (strategy === 'ZERO') fillValue = 0;
    else if (strategy === 'MEAN') {
        const sum = columnValues.reduce((acc, val) => acc + toNumber(val), 0);
        fillValue = sum / columnValues.length;
    }
    else if (strategy === 'MEDIAN') {
        const sorted = columnValues.map(toNumber).sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        fillValue = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    else if (strategy === 'MODE') {
        const counts: Record<string, number> = {};
        columnValues.forEach(v => counts[v] = (counts[v] || 0) + 1);
        fillValue = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    for (let i = 0; i < newData.length; i++) {
        if (isMissing(newData[i][colIndex])) {
            newData[i][colIndex] = fillValue;
        }
    }

    return newData;
};

// 3. Remove Duplicates
export const removeDuplicates = (data: any[][], columns: Column[], targetColumns: string[] = []): any[][] => {
    const seen = new Set();
    return data.filter(row => {
        const key = targetColumns.length === 0
            ? JSON.stringify(row)
            : JSON.stringify(targetColumns.map(name => {
                const idx = columns.findIndex(c => c.name === name);
                return idx !== -1 ? row[idx] : null;
            }));
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

// 4. Sort
export const sortBy = (data: any[][], columns: Column[], targetColumn: string, direction: 'ASC' | 'DESC'): any[][] => {
    const colIndex = columns.findIndex(c => c.name === targetColumn);
    if (colIndex === -1) return data;

    return [...data].sort((a, b) => {
        const valA = a[colIndex];
        const valB = b[colIndex];

        // Try numeric sort first
        const numA = toNumber(valA);
        const numB = toNumber(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
            return direction === 'ASC' ? numA - numB : numB - numA;
        }

        // Fallback to string sort
        const strA = String(valA);
        const strB = String(valB);
        return direction === 'ASC' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
};

// 5. Group By (Aggregation)
// Returns { data: newRows, columns: newColumns }
export const groupBy = (data: any[][], columns: Column[], groupColumn: string, aggColumn: string, aggType: 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX'): { data: any[][], columns: Column[] } => {
    const groupIdx = columns.findIndex(c => c.name === groupColumn);
    const aggIdx = columns.findIndex(c => c.name === aggColumn);

    if (groupIdx === -1 || aggIdx === -1) return { data, columns };

    const groups: Record<string, any[]> = {};

    data.forEach(row => {
        const key = String(row[groupIdx]);
        if (!groups[key]) groups[key] = [];
        groups[key].push(row[aggIdx]);
    });

    const newData: any[][] = [];
    Object.keys(groups).forEach(key => {
        const values = groups[key];
        let result = 0;

        if (aggType === 'COUNT') {
            result = values.length;
        } else {
            const nums = values.map(toNumber).filter(n => !isNaN(n));
            if (nums.length === 0) result = 0;
            else if (aggType === 'SUM') result = nums.reduce((a, b) => a + b, 0);
            else if (aggType === 'AVG') result = nums.reduce((a, b) => a + b, 0) / nums.length;
            else if (aggType === 'MIN') result = Math.min(...nums);
            else if (aggType === 'MAX') result = Math.max(...nums);
        }

        newData.push([key, result]);
    });

    // New Columns Schema
    const newColumns: Column[] = [
        { name: groupColumn, type: columns[groupIdx].type },
        { name: `${aggType}_${aggColumn}`, type: DataType.NUMBER }
    ];

    return { data: newData, columns: newColumns };
};

// Master Process Function
export const processData = (rawData: any[][], rawColumns: Column[], transformations: Transformation[]): { data: any[][], columns: Column[] } => {
    let currentData = [...rawData];
    let currentColumns = [...rawColumns];

    for (const t of transformations) {
        switch (t.type) {
            case TransformationType.DROP_MISSING:
                currentData = dropMissingValues(currentData, currentColumns, t.config.columns);
                break;
            case TransformationType.FILL_MISSING:
                currentData = fillMissingValues(currentData, currentColumns, t.config.column, t.config.strategy, t.config.value);
                break;
            case TransformationType.REMOVE_DUPLICATES:
                currentData = removeDuplicates(currentData, currentColumns, t.config.columns);
                break;
            case TransformationType.SORT:
                currentData = sortBy(currentData, currentColumns, t.config.column, t.config.direction);
                break;
            case TransformationType.GROUP_BY:
                const result = groupBy(currentData, currentColumns, t.config.groupColumn, t.config.aggColumn, t.config.aggType);
                currentData = result.data;
                currentColumns = result.columns;
                break;
        }
    }

    return { data: currentData, columns: currentColumns };
};
