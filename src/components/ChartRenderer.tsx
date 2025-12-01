import React, { useMemo, useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useDataStore } from '../store/dataStore';
import { ChartType, ChartDataPoint } from '../types';
import { downsampleData } from '../utils/dataSampling';
import { toNumber } from '../utils/typeInference';
import { calculateHistogram, groupDataForBoxPlot, calculateBoxPlotStats } from '../utils/statistics';

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
    const [isChartLoading, setIsChartLoading] = useState(false);

    const {
        rawData,
        columns,
        selectedXColumn,
        selectedYColumns,
        chartType,
        filterRange,
        binCount,
        boxPlotMaxCategories,
    } = useDataStore();

    // 차트 데이터 준비
    const chartData = useMemo(() => {
        if (selectedYColumns.length === 0 || rawData.length === 0) {
            return null;
        }

        // 히스토그램 처리
        if (chartType === ChartType.HISTOGRAM) {
            const yIndex = columns.findIndex(c => c.name === selectedYColumns[0]);
            if (yIndex === -1) return null;

            const values = rawData
                .map(row => toNumber(row[yIndex]))
                .filter(v => {
                    if (isNaN(v) || !isFinite(v)) return false;
                    if (filterRange) {
                        return v >= filterRange.min && v <= filterRange.max;
                    }
                    return true;
                });
            const { bins, counts } = calculateHistogram(values, binCount);

            return {
                type: 'histogram',
                xAxisData: bins,
                series: [{
                    name: selectedYColumns[0],
                    data: counts,
                    color: seriesColors[0]
                }],
                original: values.length,
                sampled: values.length, // 히스토그램은 샘플링 없음
                isXAxisTime: false
            };
        }

        // 박스플롯 처리
        if (chartType === ChartType.BOXPLOT) {
            const yIndex = columns.findIndex(c => c.name === selectedYColumns[0]);
            if (yIndex === -1) return null;

            const yValues = rawData.map(row => toNumber(row[yIndex]));

            let axisData: string[] = [];
            let boxData: number[][] = [];

            // X축이 선택된 경우 (그룹별 박스플롯)
            if (selectedXColumn) {
                const xIndex = columns.findIndex(c => c.name === selectedXColumn);
                if (xIndex !== -1) {
                    const xValues = rawData.map(row => row[xIndex]);
                    const result = groupDataForBoxPlot(xValues, yValues, boxPlotMaxCategories);
                    axisData = result.axisData;
                    boxData = result.boxData;
                }
            }
            // X축이 없는 경우 (단일 박스플롯)
            else {
                axisData = [selectedYColumns[0]];
                boxData = [calculateBoxPlotStats(yValues.filter(v => !isNaN(v) && isFinite(v)))];
            }

            return {
                type: 'boxplot',
                xAxisData: axisData,
                series: [{
                    name: selectedYColumns[0],
                    data: boxData,
                    color: seriesColors[0]
                }],
                original: rawData.length,
                sampled: rawData.length,
                isXAxisTime: false
            };
        }

        // 기존 차트 (Scatter, Line, Bar)
        if (!selectedXColumn) return null;

        const xIndex = columns.findIndex(c => c.name === selectedXColumn);
        if (xIndex === -1) return null;

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
                    // 필터링 적용 (X축 기준)
                    if (filterRange) {
                        if (xValue < filterRange.min || xValue > filterRange.max) {
                            continue;
                        }
                    }
                    dataPoints.push({ x: xValue, y: yValue });
                }
            }

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
            type: 'basic',
            series: seriesDataList,
            original: totalOriginal,
            sampled: totalSampled,
            isXAxisTime,
        }
    }, [rawData, columns, selectedXColumn, selectedYColumns, chartType, filterRange, binCount, boxPlotMaxCategories]);

    // 차트 데이터 로딩 상태 추적
    useEffect(() => {
        setIsChartLoading(true);
        const timer = setTimeout(() => {
            setIsChartLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, [chartData]);

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
                bottom: chartData.isXAxisTime ? '20%' : '15%', // DateTime 라벨을 위한 추가 공간
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
                    hideOverlap: true, // 겹침 방지
                    formatter: chartData.isXAxisTime ? (value: number) => {
                        // DateTime 포맷 간소화
                        const date = new Date(value);
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const hour = date.getHours().toString().padStart(2, '0');
                        const minute = date.getMinutes().toString().padStart(2, '0');

                        // 시간이 00:00이면 날짜만, 아니면 날짜+시간
                        if (hour === '00' && minute === '00') {
                            return `${month}-${day}`;
                        }
                        return `${month}-${day} ${hour}:${minute}`;
                    } : (value: number) => {
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

        // 히스토그램 옵션
        if (chartData.type === 'histogram') {
            return {
                ...baseOption,
                tooltip: {
                    trigger: 'axis',
                    formatter: (params: any) => {
                        const p = params[0];
                        return `Range: ${p.name}<br/>Count: ${p.value}`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: chartData.xAxisData,
                    name: 'Range',
                    axisLabel: { rotate: 45 }
                },
                yAxis: {
                    type: 'value',
                    name: 'Count'
                },
                series: [{
                    name: chartData.series[0].name,
                    type: 'bar',
                    data: chartData.series[0].data,
                    itemStyle: {
                        // 각 bin마다 다른 색상 적용
                        color: (params: any) => {
                            const colors = [
                                '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                                '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'
                            ];
                            return colors[params.dataIndex % colors.length];
                        }
                    },
                    barCategoryGap: 0, // 히스토그램처럼 보이게 간격 제거
                    large: true
                }]
            };
        }

        // 박스플롯 옵션
        if (chartData.type === 'boxplot') {
            return {
                ...baseOption,
                tooltip: {
                    trigger: 'item',
                    formatter: (param: any) => {
                        return [
                            `${param.name}: `,
                            `Max: ${param.data[5]}`,
                            `Q3: ${param.data[4]}`,
                            `Median: ${param.data[3]}`,
                            `Q1: ${param.data[2]}`,
                            `Min: ${param.data[1]}`
                        ].join('<br/>');
                    }
                },
                xAxis: {
                    type: 'category',
                    data: chartData.xAxisData,
                    name: selectedXColumn || 'Variable',
                    axisLabel: { rotate: 45 }
                },
                yAxis: {
                    type: 'value',
                    name: selectedYColumns[0]
                },
                series: [{
                    name: chartData.series[0].name,
                    type: 'boxplot',
                    data: chartData.series[0].data,
                    itemStyle: {
                        // 각 카테고리마다 다른 색상 적용
                        color: (params: any) => {
                            const colors = [
                                '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                                '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'
                            ];
                            return colors[params.dataIndex % colors.length];
                        },
                        borderColor: '#fff'
                    }
                }]
            };
        }

        // 기존 차트 옵션 (Scatter, Line, Bar)
        // 각 Y 컬럼마다 시리즈 생성
        const seriesList = chartData.series.map((seriesInfo: any) => {
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

    // X축 선택이 없어도 되는 차트 타입(히스토그램, 박스플롯)은 예외 처리
    const isSingleVariableChart = chartType === ChartType.HISTOGRAM || chartType === ChartType.BOXPLOT;

    if ((!selectedXColumn && !isSingleVariableChart) || selectedYColumns.length === 0) {
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

                <div className="bg-dark-900/50 rounded-xl p-4 relative" style={{ height: '600px' }}>
                    {isChartLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-dark-900/70 backdrop-blur-sm rounded-xl z-10">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                                <p className="text-sm text-dark-300">Rendering chart...</p>
                            </div>
                        </div>
                    )}
                    {chartOption && (
                        <ReactECharts
                            key={selectedYColumns.join(',')}
                            ref={chartRef}
                            option={chartOption}
                            style={{ height: '100%', width: '100%' }}
                            opts={{ renderer: 'canvas' }}
                            notMerge={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartRenderer;
