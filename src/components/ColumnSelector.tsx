import React from 'react';
import { useDataStore } from '../store/dataStore';
import { ChartType, DataType } from '../types';
import { isNumericColumn } from '../utils/typeInference';

const ColumnSelector: React.FC = () => {
    const {
        columns,
        selectedXColumn,
        selectedYColumn,
        chartType,
        setSelectedXColumn,
        setSelectedYColumn,
        setChartType,
    } = useDataStore();

    const xColumn = columns.find(c => c.name === selectedXColumn);
    const yColumn = columns.find(c => c.name === selectedYColumn);

    const xColumnValid = xColumn ? (isNumericColumn(xColumn) || xColumn.type === DataType.DATETIME) : false;
    const yColumnValid = yColumn ? isNumericColumn(yColumn) : false;

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

    return (
        <div className="w-full space-y-6 animate-slide-up">
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    축 선택
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* X축 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            X축 (가로)
                        </label>
                        <select
                            value={selectedXColumn || ''}
                            onChange={(e) => setSelectedXColumn(e.target.value || null)}
                            className="w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                            <option value="">선택하세요</option>
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
                                권장: 숫자형 데이터
                            </p>
                        )}
                    </div>

                    {/* Y축 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            Y축 (세로)
                        </label>
                        <select
                            value={selectedYColumn || ''}
                            onChange={(e) => setSelectedYColumn(e.target.value || null)}
                            className="w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                            <option value="">선택하세요</option>
                            {columns.map((col) => (
                                <option key={col.name} value={col.name}>
                                    {col.name} ({col.type})
                                </option>
                            ))}
                        </select>

                        {selectedYColumn && yColumn && (
                            <div className="mt-2 flex items-center text-sm">
                                {getTypeIcon(yColumn.type)}
                                <span className={`ml-2 ${yColumnValid ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {yColumn.type}
                                </span>
                            </div>
                        )}

                        {selectedYColumn && !yColumnValid && (
                            <p className="mt-2 text-xs text-yellow-400 flex items-start">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                권장: 숫자형 데이터
                            </p>
                        )}
                    </div>

                    {/* 차트 타입 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            차트 타입
                        </label>
                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value as ChartType)}
                            className="w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                            <option value={ChartType.SCATTER}>산점도 (Scatter)</option>
                            <option value={ChartType.LINE}>꺾은선 (Line)</option>
                            <option value={ChartType.BAR}>막대 (Bar)</option>
                        </select>

                        <div className="mt-2 text-xs text-dark-400">
                            {chartType === ChartType.SCATTER && '점으로 데이터 표시'}
                            {chartType === ChartType.LINE && '선으로 연결하여 표시'}
                            {chartType === ChartType.BAR && '막대로 표시'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColumnSelector;
