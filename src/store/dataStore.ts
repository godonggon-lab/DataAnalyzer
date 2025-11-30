import { create } from 'zustand';
import { ColumnInfo, ChartType, FileInfo } from '../types';

interface DataState {
    // 데이터 상태
    rawData: any[][];
    columns: ColumnInfo[];
    fileInfo: FileInfo | null;

    // 선택된 컬럼
    selectedXColumn: string | null;
    selectedYColumns: string[]; // 다중 Y축 선택
    chartType: ChartType;

    // UI 상태
    isLoading: boolean;
    progress: number;
    error: string | null;

    // 필터 및 옵션
    filterRange: { min: number; max: number } | null;
    binCount: number;
    boxPlotMaxCategories: number;

    // 액션
    setData: (data: any[][], columns: ColumnInfo[], fileInfo: FileInfo) => void;
    initData: (columns: ColumnInfo[], fileInfo: FileInfo) => void;
    appendData: (chunk: any[][]) => void;
    finalizeData: () => void;
    setSelectedXColumn: (column: string | null) => void;
    setSelectedYColumns: (columns: string[]) => void;
    toggleYColumn: (columnName: string) => void;
    setChartType: (type: ChartType) => void;
    setLoading: (loading: boolean) => void;
    setProgress: (progress: number) => void;
    setError: (error: string | null) => void;
    setFilterRange: (range: { min: number; max: number } | null) => void;
    setBinCount: (count: number) => void;
    setBoxPlotMaxCategories: (count: number) => void;
    reset: () => void;
}

export const useDataStore = create<DataState>((set) => ({
    // 초기 상태
    rawData: [],
    columns: [],
    fileInfo: null,
    selectedXColumn: null,
    selectedYColumns: [],
    chartType: ChartType.SCATTER,
    isLoading: false,
    progress: 0,
    error: null,
    filterRange: null,
    binCount: 20,
    boxPlotMaxCategories: 5,

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

    setSelectedYColumns: (columns) => set({ selectedYColumns: columns }),

    toggleYColumn: (columnName) => set((state) => {
        const isSelected = state.selectedYColumns.includes(columnName);
        return {
            selectedYColumns: isSelected
                ? state.selectedYColumns.filter(col => col !== columnName)
                : [...state.selectedYColumns, columnName]
        };
    }),

    setChartType: (type) => set({ chartType: type }),

    setLoading: (loading) => set({ isLoading: loading }),

    setProgress: (progress) => set({ progress }),

    setError: (error) => set({ error, isLoading: false }),

    setFilterRange: (range) => set({ filterRange: range }),

    setBinCount: (count) => set({ binCount: count }),

    setBoxPlotMaxCategories: (count) => set({ boxPlotMaxCategories: count }),

    reset: () => set({
        rawData: [],
        columns: [],
        fileInfo: null,
        selectedXColumn: null,
        selectedYColumns: [],
        chartType: ChartType.SCATTER,
        isLoading: false,
        progress: 0,
        error: null,
        filterRange: null,
        binCount: 20,
        boxPlotMaxCategories: 5,
    }),
}));
