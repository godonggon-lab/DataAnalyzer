import { create } from 'zustand';
import { ColumnInfo, ChartType, FileInfo } from '../types';

interface DataState {
    // 데이터 상태
    rawData: any[][];
    columns: ColumnInfo[];
    fileInfo: FileInfo | null;

    // 선택된 컬럼
    selectedXColumn: string | null;
    selectedYColumn: string | null;
    chartType: ChartType;

    // UI 상태
    isLoading: boolean;
    progress: number;
    error: string | null;

    // 액션
    setData: (data: any[][], columns: ColumnInfo[], fileInfo: FileInfo) => void;
    initData: (columns: ColumnInfo[], fileInfo: FileInfo) => void;
    appendData: (chunk: any[][]) => void;
    finalizeData: () => void;
    setSelectedXColumn: (column: string | null) => void;
    setSelectedYColumn: (column: string | null) => void;
    setChartType: (type: ChartType) => void;
    setLoading: (loading: boolean) => void;
    setProgress: (progress: number) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useDataStore = create<DataState>((set) => ({
    // 초기 상태
    rawData: [],
    columns: [],
    fileInfo: null,
    selectedXColumn: null,
    selectedYColumn: null,
    chartType: ChartType.SCATTER,
    isLoading: false,
    progress: 0,
    error: null,

    // 액션 구현
    setData: (data, columns, fileInfo) => set({
        rawData: data,
        columns,
        fileInfo,
        isLoading: false,
        progress: 100,
        error: null,
    }),

    initData: (columns, fileInfo) => set({
        rawData: [],
        columns,
        fileInfo,
        isLoading: true,
        progress: 0,
        error: null,
    }),

    appendData: (chunk) => set((state) => ({
        rawData: [...state.rawData, ...chunk],
    })),

    finalizeData: () => set({
        isLoading: false,
        progress: 100,
    }),

    setSelectedXColumn: (column) => set({ selectedXColumn: column }),

    setSelectedYColumn: (column) => set({ selectedYColumn: column }),

    setChartType: (type) => set({ chartType: type }),

    setLoading: (loading) => set({ isLoading: loading }),

    setProgress: (progress) => set({ progress }),

    setError: (error) => set({ error, isLoading: false }),

    reset: () => set({
        rawData: [],
        columns: [],
        fileInfo: null,
        selectedXColumn: null,
        selectedYColumn: null,
        chartType: ChartType.SCATTER,
        isLoading: false,
        progress: 0,
        error: null,
    }),
}));
