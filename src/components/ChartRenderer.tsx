import React, { useMemo, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useDataStore } from '../store/dataStore';
import { ChartType, ChartDataPoint } from '../types';
import { downsampleData } from '../utils/dataSampling';
import { toNumber } from '../utils/typeInference';

const ChartRenderer: React.FC = () => {
    const chartRef = useRef<ReactECharts>(null);
    const {
        rawData,
        columns,
        selectedXColumn,
        selectedYColumn,
        chartType,
    } = useDataStore();

    // 차트 데이터 준비
    const chartData = useMemo(() => {
        if (!selectedXColumn || !selectedYColumn || rawData.length === 0) {
            return null;
        }

        const xIndex = columns.findIndex(c => c.name === selectedXColumn);
        const yIndex = columns.findIndex(c => c.name === selectedYColumn);

        if (xIndex === -1 || yIndex === -1) {
            return null;
        }

        // 데이터 포인트 생성
        const dataPoints: ChartDataPoint[] = [];

        for (const row of rawData) {
            const xValue = toNumber(row[xIndex]);
            const yValue = toNumber(row[yIndex]);

            // 유효한 숫자인 경우만 포함
            if (!isNaN(xValue) && !isNaN(yValue) && isFinite(xValue) && isFinite(yValue)) {
                dataPoints.push({ x: xValue, y: yValue });
            }
        }

        // 다운샘플링 적용
        const sampledData = downsampleData(dataPoints, 10000);

        return {
            original: dataPoints.length,
            sampled: sampledData.length,
            data: sampledData,
        };
    }, [rawData, columns, selectedXColumn, selectedYColumn]);

    // ECharts 옵션 생성
    const chartOption = useMemo(() => {
        if (!chartData) {
            return null;
        }

        const seriesData = chartData.data.map(point => [point.x, point.y]);

        const baseOption = {
            backgroundColor: 'transparent',
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true,
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderColor: '#475569',
                borderWidth: 1,
                textStyle: {
                    color: '#e2e8f0',
                },
                axisPointer: {
                    type: chartType === ChartType.BAR ? 'shadow' : 'cross',
                    crossStyle: {
                        color: '#64748b',
                    },
                },
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none',
                    },
                    restore: {},
                    saveAsImage: {
                        backgroundColor: '#0f172a',
                        name: 'chart',
                    },
                },
                iconStyle: {
                    borderColor: '#64748b',
                },
                emphasis: {
                    iconStyle: {
                        borderColor: '#0ea5e9',
                    },
                },
            },
            xAxis: {
                type: 'value',
                name: selectedXColumn,
                nameLocation: 'middle',
                nameGap: 30,
                nameTextStyle: {
                    color: '#cbd5e1',
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                axisLine: {
                    lineStyle: {
                        color: '#475569',
                    },
                },
                axisLabel: {
                    color: '#94a3b8',
                },
                splitLine: {
                    lineStyle: {
                        color: '#334155',
                        type: 'dashed',
                    },
                },
            },
            yAxis: {
                type: 'value',
                name: selectedYColumn,
                nameLocation: 'middle',
                nameGap: 50,
                nameTextStyle: {
                    color: '#cbd5e1',
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                axisLine: {
                    lineStyle: {
                        color: '#475569',
                    },
                },
                axisLabel: {
                    color: '#94a3b8',
                },
                splitLine: {
                    lineStyle: {
                        color: '#334155',
                        type: 'dashed',
                    },
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'filter',
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'filter',
                },
            ],
        };

        // 차트 타입별 시리즈 설정
        let series: any;

        switch (chartType) {
            case ChartType.SCATTER:
                series = {
                    type: 'scatter',
                    data: seriesData,
                    symbolSize: 6,
                    itemStyle: {
                        color: '#38bdf8',
                        opacity: 0.7,
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#0ea5e9',
                            opacity: 1,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                    },
                };
                break;

            case ChartType.LINE:
                series = {
                    type: 'line',
                    data: seriesData,
                    smooth: true,
                    lineStyle: {
                        color: '#38bdf8',
                        width: 2,
                    },
                    itemStyle: {
                        color: '#38bdf8',
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(56, 189, 248, 0.3)' },
                                { offset: 1, color: 'rgba(56, 189, 248, 0.05)' },
                            ],
                        },
                    },
                    symbol: 'circle',
                    symbolSize: 4,
                };
                break;

            case ChartType.BAR:
                series = {
                    type: 'bar',
                    data: seriesData,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#38bdf8' },
                                { offset: 1, color: '#0284c7' },
                            ],
                        },
                        borderRadius: [4, 4, 0, 0],
                    },
                    emphasis: {
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#0ea5e9' },
                                    { offset: 1, color: '#0369a1' },
                                ],
                            },
                        },
                    },
                };
                break;

            default:
                series = {
                    type: 'scatter',
                    data: seriesData,
                };
        }

        return {
            ...baseOption,
            series: [series],
        };
    }, [chartData, chartType, selectedXColumn, selectedYColumn]);

    // 윈도우 리사이즈 시 차트 크기 조정
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                try {
                    const instance = chartRef.current.getEchartsInstance();
                    if (instance && !instance.isDisposed()) {
                        instance.resize();
                    }
                } catch (error) {
                    // 차트가 이미 dispose된 경우 무시
                    console.warn('Chart resize failed:', error);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!selectedXColumn || !selectedYColumn) {
        return (
            <div className="w-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-12 border border-dark-700 text-center animate-slide-up">
                <svg className="mx-auto h-16 w-16 text-dark-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-semibold text-dark-400 mb-2">
                    X축과 Y축을 선택해주세요
                </h3>
                <p className="text-dark-500">
                    위에서 컬럼을 선택하면 차트가 표시됩니다
                </p>
            </div>
        );
    }

    if (!chartData || chartData.data.length === 0) {
        return (
            <div className="w-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-12 border border-dark-700 text-center animate-slide-up">
                <svg className="mx-auto h-16 w-16 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    유효한 데이터가 없습니다
                </h3>
                <p className="text-dark-400">
                    선택한 컬럼에 숫자 데이터가 포함되어 있지 않습니다
                </p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4 animate-slide-up">
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        데이터 시각화
                    </h2>

                    <div className="text-sm text-dark-400">
                        <span className="font-medium text-primary-400">{chartData.sampled.toLocaleString()}</span>
                        {' / '}
                        <span>{chartData.original.toLocaleString()}</span> 포인트
                        {chartData.sampled < chartData.original && (
                            <span className="ml-2 text-xs text-yellow-400">
                                (다운샘플링 적용)
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-dark-900/50 rounded-xl p-4" style={{ height: '600px' }}>
                    {chartOption && (
                        <ReactECharts
                            ref={chartRef}
                            option={chartOption}
                            style={{ height: '100%', width: '100%' }}
                            opts={{ renderer: 'canvas' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartRenderer;
