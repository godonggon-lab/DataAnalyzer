import React from 'react';
import { useDataStore } from '../store/dataStore';

const DataStats: React.FC = () => {
    const { rawData, columns, fileInfo } = useDataStore();

    if (!fileInfo || rawData.length === 0) {
        return null;
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="w-full bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 animate-slide-up">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Data Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-dark-900/50 rounded-lg p-4">
                    <div className="text-slate-500 dark:text-dark-400 text-base mb-2">File Name</div>
                    <div className="text-slate-900 dark:text-white font-semibold text-base truncate" title={fileInfo.name}>
                        {fileInfo.name}
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-dark-900/50 rounded-lg p-4">
                    <div className="text-slate-500 dark:text-dark-400 text-base mb-2">File Size</div>
                    <div className="text-slate-900 dark:text-white font-semibold text-base">
                        {formatFileSize(fileInfo.size)}
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-dark-900/50 rounded-lg p-4">
                    <div className="text-slate-500 dark:text-dark-400 text-base mb-2">Total Rows</div>
                    <div className="text-slate-900 dark:text-white font-semibold text-base">
                        {rawData.length.toLocaleString()}
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-dark-900/50 rounded-lg p-4">
                    <div className="text-slate-500 dark:text-dark-400 text-base mb-2">Columns</div>
                    <div className="text-slate-900 dark:text-white font-semibold text-base">
                        {columns.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataStats;

