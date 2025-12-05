import { create } from 'zustand';
import { ColumnInfo, ChartType, FileInfo } from '../types';
import { Transformation, processData } from '../utils/transformations';

interface DataState {
    // 데이터 상태
    rawData: any[][];
    columns: ColumnInfo[];
    processedData: any[][]; // 변환된 데이터
    processedColumns: ColumnInfo[]; // 변환된 컬럼 정보
    transformations: Transformation[]; // 적용된 변환 목록
    fileInfo: FileInfo | null;

    // 선택된 컬럼
    selectedXColumn: string | null;
    selectedYColumns: string[]; // 다중 Y축 선택
    selectedCorrelationColumns: string[]; // 상관관계 분석용 컬럼 선택
    chartType: ChartType;

    // UI 상태
    isLoading: boolean;
    progress: number;
    error: string | null;

    // 필터 및 옵션
    filterRange: { min: number; max: number } | null;
    binCount: number;
    boxPlotMaxCategories: number;
    yAxisAssignment: { [columnName: string]: 0 | 1 }; // 0 = left, 1 = right

    // 액션
    setData: (data: any[][], columns: ColumnInfo[], fileInfo: FileInfo) => void;
    initData: (columns: ColumnInfo[], fileInfo: FileInfo) => void;
    appendData: (chunk: any[][]) => void;
    finalizeData: () => void;
    setSelectedXColumn: (column: string | null) => void;
    setSelectedYColumns: (columns: string[]) => void;
    toggleYColumn: (columnName: string) => void;
    setSelectedCorrelationColumns: (columns: string[]) => void;
    toggleCorrelationColumn: (columnName: string) => void;
    setChartType: (type: ChartType) => void;
    setLoading: (loading: boolean) => void;
    setProgress: (progress: number) => void;
    setError: (error: string | null) => void;
    setFilterRange: (range: { min: number; max: number } | null) => void;
    setBinCount: (count: number) => void;
    setBoxPlotMaxCategories: (count: number) => void;
    setYAxisAssignment: (columnName: string, axisIndex: 0 | 1) => void;

    // 변환 액션
    addTransformation: (transformation: Transformation) => void;
    removeTransformation: (id: string) => void;
    resetTransformations: () => void;

    reset: () => void;
}

export const useDataStore = create<DataState>((set) => ({
    // 초기 상태
    rawData: [],
    columns: [],
    processedData: [],
    processedColumns: [],
    transformations: [],
    fileInfo: null,
    selectedXColumn: null,
    selectedYColumns: [],
    selectedCorrelationColumns: [],
    chartType: ChartType.SCATTER,
    isLoading: false,
    progress: 0,
    error: null,
    filterRange: null,
    binCount: 20,
    boxPlotMaxCategories: 5,
    yAxisAssignment: {},

    // 액션 구현
    setData: (data, columns, fileInfo) => set({
        rawData: data,
        columns,
        processedData: data, // 초기에는 원본과 동일
        processedColumns: columns,
        transformations: [], // 새 데이터 로드 시 변환 초기화
        fileInfo,
        isLoading: false,
        progress: 100,
        error: null,
    }),

    initData: (columns, fileInfo) => set({
        rawData: [],
        columns,
        processedData: [],
        processedColumns: columns,
        transformations: [],
        fileInfo,
        isLoading: true,
        progress: 0,
        error: null,
    }),

    appendData: (chunk) => set((state) => ({
        rawData: [...state.rawData, ...chunk],
        // append 중에는 processedData도 같이 업데이트 (변환 없이)
        processedData: [...state.processedData, ...chunk],
    })),

    finalizeData: () => set({
        isLoading: false,
        progress: 100,
    }),

    setSelectedXColumn: (column) => set({ selectedXColumn: column }),

    setSelectedYColumns: (columns) => set({ selectedYColumns: columns }),

    toggleYColumn: (columnName) => set((state) => {
        const isCurrentlySelected = state.selectedYColumns.includes(columnName);
        const newYColumns = isCurrentlySelected
            ? state.selectedYColumns.filter(c => c !== columnName)
            : [...state.selectedYColumns, columnName];

        // Update yAxisAssignment
        const newAssignment = { ...state.yAxisAssignment };
        if (!isCurrentlySelected) {
            // Adding new column - assign to left axis (0) by default
            newAssignment[columnName] = 0;
        } else {
            // Removing column - clean up assignment
            delete newAssignment[columnName];
        }

        return {
            selectedYColumns: newYColumns,
            yAxisAssignment: newAssignment
        };
    }),

    setSelectedCorrelationColumns: (columns) => set({ selectedCorrelationColumns: columns }),

    toggleCorrelationColumn: (columnName) => set((state) => {
        const isCurrentlySelected = state.selectedCorrelationColumns.includes(columnName);
        return {
            selectedCorrelationColumns: isCurrentlySelected
                ? state.selectedCorrelationColumns.filter(c => c !== columnName)
                : [...state.selectedCorrelationColumns, columnName]
        };
    }),

    setChartType: (type) => set({ chartType: type }),

    setLoading: (loading) => set({ isLoading: loading }),

    setProgress: (progress) => set({ progress }),

    setError: (error) => set({ error, isLoading: false }),

    setFilterRange: (range) => set({ filterRange: range }),

    setBinCount: (count) => set({ binCount: count }),

    setBoxPlotMaxCategories: (count) => set({ boxPlotMaxCategories: count }),

    setYAxisAssignment: (columnName, axisIndex) => set((state) => ({
        yAxisAssignment: {
            ...state.yAxisAssignment,
            [columnName]: axisIndex
        }
    })),

    addTransformation: (transformation) => set((state) => {
        const newTransformations = [...state.transformations, transformation];
        const { data, columns } = processData(state.rawData, state.columns, newTransformations);
        return {
            transformations: newTransformations,
            processedData: data,
            processedColumns: columns as ColumnInfo[], // Type assertion needed if ColumnInfo has extra fields
        };
    }),

    removeTransformation: (id) => set((state) => {
        const newTransformations = state.transformations.filter(t => t.id !== id);
        const { data, columns } = processData(state.rawData, state.columns, newTransformations);
        return {
            transformations: newTransformations,
            processedData: data,
            processedColumns: columns as ColumnInfo[],
        };
    }),

    resetTransformations: () => set((state) => ({
        transformations: [],
        processedData: state.rawData,
        processedColumns: state.columns,
    })),

    reset: () => set({
        rawData: [],
        columns: [],
        processedData: [],
        processedColumns: [],
        transformations: [],
        fileInfo: null,
        selectedXColumn: null,
        selectedYColumns: [],
        selectedCorrelationColumns: [],
        chartType: ChartType.SCATTER,
        isLoading: false,
        progress: 0,
        error: null,
        filterRange: null,
        binCount: 20,
        boxPlotMaxCategories: 5,
        yAxisAssignment: {},
    }),
}));
