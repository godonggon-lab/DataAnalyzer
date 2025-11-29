import React, { useMemo, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useDataStore } from '../store/dataStore';
import { ChartType, ChartDataPoint } from '../types';
import { downsampleData } from '../utils/dataSampling';
import { toNumber } from '../utils/typeInference';

// 시리즈 색상 팔레트
const seriesColors = [
    '#38bdf8', // Sky Blue
    '#34d399', // Green
    '#fbbf24', // Yellow
    '#f87171', // Red
    '#a78bfa', // Purple
];

const ChartRenderer: React.FC = () => {
    const chartRef = useRef<ReactECharts>(null);
    const {
        rawData,
        columns,
        selectedXColumn,
        selectedYColumns,
        chartType,
    } = useDataStore();

    // 차트 데이터 준비
    const chartData = useMemo(() => {
        if (!selectedXColumn || selectedYColumns.length === 0 || rawData.length === 0) {
            return null;
        }

        const xIndex = columns.findIndex(c => c.name === selectedXColumn);
        if (xIndex === -1) {
            return null;
        }

        // X축 컬럼 타입 확인
        const xColumn = columns.find(c => c.name === selectedXColumn);
        const isXAxisTime = xColumn?.type === 'datetime';

        // 각 Y컬럼마다 시리즈 생성
        const seriesDataList = selectedYColumns.map((yColumnName, seriesIndex) => {
            const yIndex = columns.findIndex(c => c.name === yColumnName);
            if (yIndex === -1) return null;

            const dataPoints: ChartDataPoint[] = [];

            for (const row of rawData) {
                let xValue: number;
                if (isXAxisTime) {
                    const val = row[xIndex];
                    xValue = new Date(val).getTime();
                } else {
                    xValue = toNumber(row[xIndex]);
                }
                const yValue = toNumber(row[yIndex]);

                if (!isNaN(xValue) && !isNaN(yValue) && isFinite(xValue) && isFinite(yValue)) {
                    dataPoints.push({ x: xValue, y: yValue });
                }
            }

            // 전체 데이터에 대해 다운샘플링 적용 (50000개로 설정하여 디테일 유지하면서 성능 확보)
            // ECharts가 줌/팬을 자체적으로 처리하도록 함
            const sampledData = downsampleData(dataPoints, 300000);

            return {
                name: yColumnName,
                data: sampledData,
                originalCount: dataPoints.length,
                sampledCount: sampledData.length,
                color: seriesColors[seriesIndex % seriesColors.length],
            };
        }).filter(series => series !== null);

        const totalOriginal = seriesDataList.reduce((sum, s) => sum + (s?.originalCount || 0), 0);
        const totalSampled = seriesDataList.reduce((sum, s) => sum + (s?.sampledCount || 0), 0);

        return {
            series: seriesDataList,
            original: totalOriginal,
            sampled: totalSampled,
            isXAxisTime,
        };
    }, [rawData, columns, selectedXColumn, selectedYColumns]);

    // ECharts 이벤트 핸들러 (필요 시 추가)
    const onEvents = useMemo(() => ({}), []);

    // ECharts 옵션 생성
    const chartOption = useMemo(() => {
        if (!chartData) {
            return null;
        }

        const baseOption = {
            // 대용량 데이터 렌더링 최적화
            progressive: 15000,
            progressiveThreshold: 3000,
            backgroundColor: 'transparent',
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: selectedYColumns.length > 1 ? '15%' : '10%', // 범례 공간 확보
                containLabel: true,
            },
            legend: selectedYColumns.length > 1 ? {
                top: '5%',
                textStyle: {
                    color: '#cbd5e1',
                },
                icon: 'circle',
            } : undefined,
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
                // 날짜 포맷팅
                formatter: chartData.isXAxisTime ? (params: any) => {
                    const date = new Date(params[0].value[0]);
                    const dateStr = date.toLocaleString();
                    let result = `${dateStr}<br/>`;
                    params.forEach((param: any) => {
                        result += `${param.marker}${param.seriesName}: ${param.value[1]}<br/>`;
                    });
                    return result;
                } : undefined,
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
                type: chartData.isXAxisTime ? 'time' : 'value',
                name: selectedXColumn,
                nameLocation: 'middle',
                nameGap: 40,
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
                    rotate: 45, // 라벨 회전
                    hideOverlap: true, // 겹침 방지
                    formatter: chartData.isXAxisTime ? undefined : (value: number) => {
                        // 숫자가 너무 길면 줄임
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                        return value;
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#334155',
                        type: 'dashed',
                    },
                },
                min: 'dataMin', // 축 범위 자동 조정
                max: 'dataMax',
            },
            yAxis: {
                type: 'value',
                name: selectedYColumns.length > 1 ? 'Value' : selectedYColumns[0],
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
                min: 'dataMin',
                max: 'dataMax',
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                },
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    height: 20,
                    bottom: 10,
                    handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    },
                    textStyle: {
                        color: '#cbd5e1'
                    },
                    borderColor: '#475569',
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'empty',
                },
            ],
            animation: false, // 대용량 데이터 렌더링 시 애니메이션 끄기 권장
        };

        // 각 Y 컬럼마다 시리즈 생성
        const seriesList = chartData.series.map((seriesInfo) => {
            const seriesData = seriesInfo.data.map((point: ChartDataPoint) => [point.x, point.y]);

            const markPointConfig = {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ],
                symbol: 'pin',
                symbolSize: 40,
                label: {
                    show: true,
                    formatter: (params: any) => {
                        return `${seriesInfo.name} ${params.name} : ${params.value}`;
                    },
                    color: '#fff',
                    fontSize: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: [4, 8],
                    borderRadius: 4,
                },
                itemStyle: {
                    color: seriesInfo.color
                }
            };

            let seriesConfig: any;
            switch (chartType) {
                case ChartType.SCATTER:
                    seriesConfig = {
                        name: seriesInfo.name,
                        type: 'scatter',
                        data: seriesData,
                        symbolSize: 6,
                        itemStyle: {
                            color: seriesInfo.color,
                            opacity: 0.7,
                        },
                        large: true,
                        largeThreshold: 2000,
                        markPoint: markPointConfig,
                    };
                    break;

                case ChartType.LINE:
                    seriesConfig = {
                        name: seriesInfo.name,
                        type: 'line',
                        data: seriesData,
                        smooth: true,
                        lineStyle: {
                            color: seriesInfo.color,
                            width: 2,
                        },
                        itemStyle: {
                            color: seriesInfo.color,
                        },
                        symbol: 'none',
                        sampling: 'lttb',
                        markPoint: markPointConfig,
                    };
                    break;

                case ChartType.BAR:
                    seriesConfig = {
                        name: seriesInfo.name,
                        type: 'bar',
                        data: seriesData,
                        itemStyle: {
                            color: seriesInfo.color,
                            borderRadius: [4, 4, 0, 0],
                        },
                        large: true,
                        markPoint: markPointConfig,
                    };
                    break;

                default:
                    seriesConfig = {
                        name: seriesInfo.name,
                        type: 'scatter',
                        data: seriesData,
                        markPoint: markPointConfig,
                    };
            }

            return seriesConfig;
        });

        return {
            ...baseOption,
            series: seriesList,
        };
    }, [chartData, chartType, selectedXColumn, selectedYColumns]);

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

    if (!selectedXColumn || selectedYColumns.length === 0) {
        return (
            <div className="w-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-12 border border-dark-700 text-center animate-slide-up">
                <svg className="mx-auto h-16 w-16 text-dark-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-semibold text-dark-400 mb-2">
                    Please select X and Y axes
                </h3>
                <p className="text-dark-500">
                    Select columns above to display the chart
                </p>
            </div>
        );
    }

    if (!chartData || chartData.series.length === 0) {
        return (
            <div className="w-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-12 border border-dark-700 text-center animate-slide-up">
                <svg className="mx-auto h-16 w-16 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    No valid data
                </h3>
                <p className="text-dark-400">
                    Selected columns contain no numeric data
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
                        Data Visualization
                    </h2>

                    <div className="text-sm text-dark-400">
                        <span className="font-medium text-primary-400">{chartData.sampled.toLocaleString()}</span>
                        {' / '}
                        <span>{chartData.original.toLocaleString()}</span> points
                        {chartData.sampled < chartData.original && (
                            <span className="ml-2 text-xs text-yellow-400">
                                (Downsampled)
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
                            onEvents={onEvents}
                            notMerge={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartRenderer;
