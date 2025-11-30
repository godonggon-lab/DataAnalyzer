import React, { useEffect, useState } from 'react';
import { useDataStore } from '../store/dataStore';
import { ChartType, DataType } from '../types';
import { isNumericColumn, toNumber } from '../utils/typeInference';

// 시리즈 색상 팔레트
const seriesColors = [
    '#38bdf8', // Sky Blue
    '#34d399', // Green
    '#fbbf24', // Yellow
    '#f87171', // Red
    '#a78bfa', // Purple
];

const ColumnSelector: React.FC = () => {
    const {
        columns,
        selectedXColumn,
        selectedYColumns,
        chartType,
        rawData,
        filterRange,
        binCount,
        boxPlotMaxCategories,
        setSelectedXColumn,
        toggleYColumn,
        setChartType,
        setFilterRange,
        setBinCount,
        setBoxPlotMaxCategories,
    } = useDataStore();

    // 로컬 입력 상태 (입력 중 끊김 방지)
    const [localMin, setLocalMin] = useState<string>('');
    const [localMax, setLocalMax] = useState<string>('');

    // Bin 카운트 로컬 상태 (smooth slider)
    const [localBinCount, setLocalBinCount] = useState(binCount);
    const [localBoxPlotMax, setLocalBoxPlotMax] = useState(boxPlotMaxCategories);

    // 필터 대상 컬럼 결정
    const targetColumnName = chartType === ChartType.HISTOGRAM ? selectedYColumns[0] : selectedXColumn;
    const targetColumn = columns.find(c => c.name === targetColumnName);
    const isTargetNumeric = targetColumn ? isNumericColumn(targetColumn) : false;

    // 컬럼 변경 시 필터 범위 초기화 및 로컬 상태 동기화
    useEffect(() => {
        if (!targetColumnName || !isTargetNumeric || rawData.length === 0) {
            setFilterRange(null);
            setLocalMin('');
            setLocalMax('');
            return;
        }

        const colIndex = columns.findIndex(c => c.name === targetColumnName);
        if (colIndex === -1) return;

        let min = Infinity;
        let max = -Infinity;

        // 데이터 스캔하여 Min/Max 찾기
        for (const row of rawData) {
            const val = toNumber(row[colIndex]);
            if (!isNaN(val) && isFinite(val)) {
                if (val < min) min = val;
                if (val > max) max = val;
            }
        }

        if (min !== Infinity && max !== -Infinity) {
            setFilterRange({ min, max });
            setLocalMin(min.toString());
            setLocalMax(max.toString());
        }
    }, [targetColumnName, isTargetNumeric, columns, rawData, setFilterRange]);

    // Bin count debouncing (300ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setBinCount(localBinCount);
        }, 300);
        return () => clearTimeout(timer);
    }, [localBinCount, setBinCount]);

    // BoxPlot max categories debouncing (300ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setBoxPlotMaxCategories(localBoxPlotMax);
        }, 300);
        return () => clearTimeout(timer);
    }, [localBoxPlotMax, setBoxPlotMaxCategories]);

    // Store 값 변경 시 local 동기화
    useEffect(() => {
        setLocalBinCount(binCount);
    }, [binCount]);

    useEffect(() => {
        setLocalBoxPlotMax(boxPlotMaxCategories);
    }, [boxPlotMaxCategories]);

    // 입력 핸들러
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMin(e.target.value);
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && filterRange) {
            setFilterRange({ ...filterRange, min: val });
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMax(e.target.value);
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && filterRange) {
            setFilterRange({ ...filterRange, max: val });
        }
    };

    const xColumn = columns.find(c => c.name === selectedXColumn);
    const xColumnValid = xColumn ? (isNumericColumn(xColumn) || xColumn.type === DataType.DATETIME) : false;

    const getTypeIcon = (type: DataType) => {
        switch (type) {
            case DataType.NUMBER:
                return (
                    <span className="text-green-400" title="숫자">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 3h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm5 2v10h1V5H8zm3 0v10h1V5h-1z" />
                        </svg>
                    </span>
                );
            case DataType.STRING:
                return (
                    <span className="text-blue-400" title="문자열">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6z" />
                        </svg>
                    </span>
                );
            case DataType.DATETIME:
                return (
                    <span className="text-purple-400" title="날짜/시간">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </span>
                );
            default:
                return (
                    <span className="text-gray-400" title="알 수 없음">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    </span>
                );
        }
    };

    if (columns.length === 0) {
        return null;
    }

    const numericColumns = columns.filter(col => isNumericColumn(col));

    return (
        <div className="w-full space-y-6 animate-slide-up">
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Axis Selection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* X축 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            X-Axis (Horizontal)
                        </label>
                        <select
                            value={selectedXColumn || ''}
                            onChange={(e) => setSelectedXColumn(e.target.value || null)}
                            className="w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                            <option value="">Select...</option>
                            {columns.map((col) => (
                                <option key={col.name} value={col.name}>
                                    {col.name} ({col.type})
                                </option>
                            ))}
                        </select>

                        {selectedXColumn && xColumn && (
                            <div className="mt-2 flex items-center text-sm">
                                {getTypeIcon(xColumn.type)}
                                <span className={`ml-2 ${xColumnValid ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {xColumn.type}
                                </span>
                            </div>
                        )}

                        {selectedXColumn && !xColumnValid && (
                            <p className="mt-2 text-xs text-yellow-400 flex items-start">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Recommended: Numeric or DateTime data
                            </p>
                        )}
                    </div>

                    {/* Y축 선택 (다중 선택) */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            Y-Axis (Vertical) - Multiple Selection
                            {selectedYColumns.length > 0 && (
                                <span className="ml-2 text-xs text-primary-400">
                                    ({selectedYColumns.length} selected)
                                </span>
                            )}
                        </label>

                        <div className="bg-dark-700 border border-dark-600 rounded-lg p-3 max-h-60 overflow-y-auto space-y-2">
                            {numericColumns.map((col, index) => {
                                const isSelected = selectedYColumns.includes(col.name);
                                const colorIndex = selectedYColumns.indexOf(col.name);
                                const seriesColor = colorIndex >= 0 ? seriesColors[colorIndex % seriesColors.length] : seriesColors[index % seriesColors.length];

                                return (
                                    <label
                                        key={col.name}
                                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isSelected
                                            ? 'bg-dark-600 border border-primary-500/50'
                                            : 'hover:bg-dark-600/50'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleYColumn(col.name)}
                                            className="w-4 h-4 rounded border-dark-500 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
                                        />
                                        <div className="flex-1 flex items-center ml-3">
                                            {getTypeIcon(col.type)}
                                            <span className="ml-2 text-white text-sm">
                                                {col.name}
                                            </span>
                                            <span className="ml-2 text-xs text-dark-400">
                                                ({col.type})
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <div
                                                className="w-4 h-4 rounded-full ml-2"
                                                style={{ backgroundColor: seriesColor }}
                                                title="시리즈 색상"
                                            />
                                        )}
                                    </label>
                                );
                            })}
                            {numericColumns.length === 0 && (
                                <p className="text-dark-400 text-sm text-center py-4">
                                    No numeric columns available
                                </p>
                            )}
                        </div>

                        {selectedYColumns.length === 0 && (
                            <p className="mt-2 text-xs text-yellow-400 flex items-start">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Select at least one Y-axis
                            </p>
                        )}
                    </div>

                    {/* 차트 타입 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            Chart Type
                        </label>
                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value as ChartType)}
                            className="w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                            <option value={ChartType.SCATTER}>Scatter Plot</option>
                            <option value={ChartType.LINE}>Line Chart</option>
                            <option value={ChartType.BAR}>Bar Chart</option>
                            <option value={ChartType.HISTOGRAM}>Histogram</option>
                            <option value={ChartType.BOXPLOT}>Box Plot</option>
                        </select>

                        <div className="mt-2 text-xs text-dark-400">
                            {chartType === ChartType.SCATTER && 'Display data as points'}
                            {chartType === ChartType.LINE && 'Display with connected lines'}
                            {chartType === ChartType.BAR && 'Display as bars'}
                            {chartType === ChartType.HISTOGRAM && 'Display frequency distribution (Y-axis data)'}
                            {chartType === ChartType.BOXPLOT && 'Display statistical distribution (Min, Q1, Median, Q3, Max)'}
                        </div>
                    </div>
                </div>

                {/* 필터 및 옵션 섹션 */}
                {(filterRange || chartType === ChartType.HISTOGRAM) && (
                    <div className="mt-6 pt-6 border-t border-dark-600">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Data Filter & Options
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 범위 필터 */}
                            {filterRange && (
                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">
                                        Data Range Filter ({targetColumnName})
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1">
                                            <span className="text-xs text-dark-400 block mb-1">Min</span>
                                            <input
                                                type="number"
                                                value={localMin}
                                                onChange={handleMinChange}
                                                className="w-full bg-dark-700 border border-dark-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                            />
                                        </div>
                                        <span className="text-dark-400 mt-5">~</span>
                                        <div className="flex-1">
                                            <span className="text-xs text-dark-400 block mb-1">Max</span>
                                            <input
                                                type="number"
                                                value={localMax}
                                                onChange={handleMaxChange}
                                                className="w-full bg-dark-700 border border-dark-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-dark-400">
                                        Adjust min/max to filter data points.
                                    </p>
                                </div>
                            )}

                            {/* 히스토그램 Bin 설정 */}
                            {chartType === ChartType.HISTOGRAM && (
                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">
                                        Histogram Bins: {localBinCount}
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="100"
                                        step="1"
                                        value={localBinCount}
                                        onChange={(e) => setLocalBinCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                    />
                                    <div className="flex justify-between text-xs text-dark-400 mt-1">
                                        <span>5 (Coarse)</span>
                                        <span>100 (Fine)</span>
                                    </div>
                                </div>
                            )}

                            {/* BoxPlot 최대 카테고리 설정 */}
                            {chartType === ChartType.BOXPLOT && (
                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">
                                        BoxPlot Max Categories: {localBoxPlotMax}
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="100"
                                        step="5"
                                        value={localBoxPlotMax}
                                        onChange={(e) => setLocalBoxPlotMax(parseInt(e.target.value))}
                                        className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                    />
                                    <div className="flex justify-between text-xs text-dark-400 mt-1">
                                        <span>5 (Coarse)</span>
                                        <span>100 (Fine)</span>
                                    </div>
                                    <p className="mt-2 text-xs text-dark-400">
                                        If X-axis has more categories, they will be grouped.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColumnSelector;
