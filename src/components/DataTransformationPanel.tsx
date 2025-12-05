import React, { useState } from 'react';
import { useDataStore } from '../store/dataStore';
import { TransformationType, Transformation } from '../utils/transformations';
import { DataType } from '../types';

const DataTransformationPanel: React.FC = () => {
    const {
        columns,
        transformations,
        addTransformation,
        removeTransformation,
        resetTransformations
    } = useDataStore();

    const [isAdding, setIsAdding] = useState(false);
    const [selectedType, setSelectedType] = useState<TransformationType>(TransformationType.DROP_MISSING);
    const [config, setConfig] = useState<any>({});

    const handleAdd = () => {
        const newTransformation: Transformation = {
            id: Date.now().toString(),
            type: selectedType,
            config: config
        };
        addTransformation(newTransformation);
        setIsAdding(false);
        setConfig({});
    };

    const renderConfigForm = () => {
        switch (selectedType) {
            case TransformationType.DROP_MISSING:
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-slate-500 dark:text-dark-400">
                            Drop rows that contain missing values (null, undefined, empty string).
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Target Columns (Optional)
                            </label>
                            <select
                                multiple
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setConfig({ ...config, columns: selected });
                                }}
                            >
                                {columns.map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-400 mt-1">Hold Ctrl/Cmd to select multiple. Leave empty to check all columns.</p>
                        </div>
                    </div>
                );
            case TransformationType.FILL_MISSING:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Target Column
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, column: e.target.value })}
                            >
                                <option value="">Select a column...</option>
                                {columns.map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Strategy
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, strategy: e.target.value })}
                            >
                                <option value="ZERO">Fill with 0</option>
                                <option value="MEAN">Mean (Average)</option>
                                <option value="MEDIAN">Median</option>
                                <option value="MODE">Mode (Most Frequent)</option>
                            </select>
                        </div>
                    </div>
                );
            case TransformationType.REMOVE_DUPLICATES:
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-slate-500 dark:text-dark-400">
                            Remove duplicate rows based on selected columns.
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Subset Columns (Optional)
                            </label>
                            <select
                                multiple
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setConfig({ ...config, columns: selected });
                                }}
                            >
                                {columns.map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-400 mt-1">Leave empty to consider all columns.</p>
                        </div>
                    </div>
                );
            case TransformationType.GROUP_BY:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Group By Column
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, groupColumn: e.target.value })}
                            >
                                <option value="">Select...</option>
                                {columns.map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Aggregate Column
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, aggColumn: e.target.value })}
                            >
                                <option value="">Select...</option>
                                {columns.filter(c => c.type === DataType.NUMBER).map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Aggregation Type
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, aggType: e.target.value })}
                            >
                                <option value="SUM">Sum</option>
                                <option value="AVG">Average</option>
                                <option value="COUNT">Count</option>
                                <option value="MIN">Min</option>
                                <option value="MAX">Max</option>
                            </select>
                        </div>
                    </div>
                );
            case TransformationType.SORT:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Sort By Column
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, column: e.target.value })}
                            >
                                <option value="">Select...</option>
                                {columns.map(col => (
                                    <option key={col.name} value={col.name}>{col.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                                Direction
                            </label>
                            <select
                                className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                onChange={(e) => setConfig({ ...config, direction: e.target.value })}
                            >
                                <option value="ASC">Ascending (A-Z, 0-9)</option>
                                <option value="DESC">Descending (Z-A, 9-0)</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Data Pipeline
                </h2>
                {transformations.length > 0 && (
                    <button
                        onClick={resetTransformations}
                        className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline"
                    >
                        Reset All
                    </button>
                )}
            </div>

            {/* Active Transformations List */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
                {transformations.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 dark:text-dark-500 text-sm border-2 border-dashed border-slate-200 dark:border-dark-700 rounded-xl">
                        No transformations applied.<br />
                        Add a step to clean or shape your data.
                    </div>
                ) : (
                    transformations.map((t, index) => (
                        <div key={t.id} className="group relative bg-white dark:bg-dark-700 p-3 rounded-lg border border-slate-200 dark:border-dark-600 shadow-sm flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-dark-600 text-slate-500 dark:text-dark-400 flex items-center justify-center text-xs font-bold mr-3">
                                    {index + 1}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {t.type.replace(/_/g, ' ')}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-dark-400">
                                        {t.type === TransformationType.GROUP_BY ? `By ${t.config.groupColumn} -> ${t.config.aggType}(${t.config.aggColumn})` : ''}
                                        {t.type === TransformationType.SORT ? `By ${t.config.column} (${t.config.direction})` : ''}
                                        {t.type === TransformationType.FILL_MISSING ? `${t.config.column} with ${t.config.strategy}` : ''}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeTransformation(t.id)}
                                className="text-slate-400 hover:text-red-500 dark:text-dark-400 dark:hover:text-red-400 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Connector Line */}
                            {index < transformations.length - 1 && (
                                <div className="absolute left-6 top-full h-2 w-0.5 bg-slate-200 dark:bg-dark-600 -ml-px z-0"></div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Add New Transformation */}
            {isAdding ? (
                <div className="bg-slate-50 dark:bg-dark-700/50 rounded-xl p-4 border border-primary-200 dark:border-primary-500/30 animate-fade-in">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-1">
                            Transformation Type
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value as TransformationType);
                                setConfig({});
                            }}
                            className="w-full rounded-md border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                            <option value={TransformationType.DROP_MISSING}>Drop Missing Values</option>
                            <option value={TransformationType.FILL_MISSING}>Fill Missing Values</option>
                            <option value={TransformationType.REMOVE_DUPLICATES}>Remove Duplicates</option>
                            <option value={TransformationType.SORT}>Sort Data</option>
                            <option value={TransformationType.GROUP_BY}>Group By (Aggregate)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        {renderConfigForm()}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleAdd}
                            className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                            Add Step
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="px-3 py-2 bg-white dark:bg-dark-700 text-slate-700 dark:text-dark-300 border border-slate-300 dark:border-dark-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-dark-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-dark-600 rounded-xl text-slate-500 dark:text-dark-400 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-all flex items-center justify-center gap-2 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Transformation Step
                </button>
            )}
        </div>
    );
};

export default DataTransformationPanel;
