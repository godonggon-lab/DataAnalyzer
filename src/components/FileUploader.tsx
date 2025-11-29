import { useCallback, useState } from 'react';
import { useDataStore } from '../store/dataStore';
import { WorkerMessage } from '../types';

const FileUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const { isLoading, progress, error, setData, setLoading, setProgress, setError } = useDataStore();

    const handleFile = useCallback(async (file: File) => {
        // 파일 형식 검증
        const validExtensions = ['.csv', '.xlsx', '.xls'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            setError('Unsupported file format. Please upload a CSV or Excel file.');
            return;
        }

        setLoading(true);
        setProgress(0);
        setError(null);

        try {
            // 파일 형식에 따라 적절한 Worker 선택
            let worker: Worker;

            if (fileExtension === '.csv') {
                worker = new Worker(
                    new URL('../workers/csvParser.worker.ts', import.meta.url),
                    { type: 'module' }
                );
            } else {
                worker = new Worker(
                    new URL('../workers/excelParser.worker.ts', import.meta.url),
                    { type: 'module' }
                );
            }

            // Worker 메시지 리스너
            worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
                const message = event.data;

                switch (message.type) {
                    case 'init':
                        if (message.columns) {
                            const fileInfo = {
                                name: file.name,
                                size: file.size,
                                type: file.type,
                            };
                            // 초기화 및 로딩 시작
                            useDataStore.getState().initData(message.columns, fileInfo);
                        }
                        break;

                    case 'chunk':
                        if (message.chunkData) {
                            // 청크 데이터 추가
                            useDataStore.getState().appendData(message.chunkData);
                            if (message.progress) {
                                setProgress(message.progress);
                            }
                        }
                        break;

                    case 'progress':
                        if (message.progress !== undefined) {
                            setProgress(message.progress);
                        }
                        break;

                    case 'complete':
                        // 완료 처리
                        useDataStore.getState().finalizeData();
                        worker.terminate();
                        break;

                    case 'error':
                        setError(message.error || 'An error occurred while processing the file.');
                        setLoading(false);
                        worker.terminate();
                        break;
                }
            };

            worker.onerror = (event) => {
                const errorMsg = event.message || 'Unknown error occurred during Worker execution.';
                setError('Worker Error: ' + errorMsg);
                setLoading(false);
                worker.terminate();
            };

            // Worker에 파일 전송
            worker.postMessage(file);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred while processing the file.');
            setLoading(false);
        }
    }, [setData, setLoading, setProgress, setError]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    return (
        <div className="w-full">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 ease-in-out
          ${isDragging
                        ? 'border-primary-500 bg-primary-500/10 scale-105'
                        : 'border-dark-600 bg-dark-800/50 hover:border-primary-600 hover:bg-dark-800/70'
                    }
          ${isLoading ? 'pointer-events-none opacity-70' : 'cursor-pointer'}
          backdrop-blur-sm
        `}
            >
                {!isLoading ? (
                    <>
                        <div className="mb-6">
                            <svg
                                className={`mx-auto h-16 w-16 transition-transform duration-300 ${isDragging ? 'scale-110 text-primary-500' : 'text-dark-400'
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2">
                            Drag and drop or click to upload a file
                        </h3>

                        <p className="text-dark-400 mb-6">
                            Supports CSV, XLSX, XLS files • No size limit
                        </p>

                        <label className="inline-block">
                            <input
                                type="file"
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileInput}
                                disabled={isLoading}
                            />
                            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Select File
                            </span>
                        </label>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="animate-pulse">
                            <svg
                                className="mx-auto h-16 w-16 text-primary-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold text-white">
                            Processing file...
                        </h3>

                        <div className="w-full max-w-md mx-auto">
                            <div className="flex justify-between text-sm text-dark-400 mb-2">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300 ease-out rounded-full"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="h-full w-full bg-white/20 animate-pulse-slow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-slide-up">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="text-red-400 font-medium">오류 발생</h4>
                            <p className="text-red-300 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
