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

    const [zoomRange, setZoomRange] = React.useState<{ start: number; end: number } | null>(null);

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

        // X축 컬럼 타입 확인
        const xColumn = columns.find(c => c.name === selectedXColumn);
        const isXAxisTime = xColumn?.type === 'datetime';

        // 전체 데이터를 순회하며 포인트 추출
        for (const row of rawData) {
            let xValue: number;

            if (isXAxisTime) {
                const val = row[xIndex];
                xValue = new Date(val).getTime();
            } else {
                xValue = toNumber(row[xIndex]);
            }

            const yValue = toNumber(row[yIndex]);

            // 유효한 숫자인 경우만 포함 (날짜는 timestamp로 변환됨)
            if (!isNaN(xValue) && !isNaN(yValue) && isFinite(xValue) && isFinite(yValue)) {
                dataPoints.push({ x: xValue, y: yValue });
            }
        }

        // 줌 범위에 따른 데이터 필터링
        let targetData = dataPoints;
        if (zoomRange) {
            const startIndex = Math.floor(dataPoints.length * (zoomRange.start / 100));
            const endIndex = Math.ceil(dataPoints.length * (zoomRange.end / 100));
            targetData = dataPoints.slice(startIndex, endIndex);
        }

        // 다운샘플링 적용 (줌 상태일 때도 3000개 유지하여 디테일 확보)
        const sampledData = downsampleData(targetData, 3000);

        return {
            original: dataPoints.length,
            sampled: sampledData.length,
            data: sampledData,
            isZoomed: !!zoomRange,
            isXAxisTime,
        };
    }, [rawData, columns, selectedXColumn, selectedYColumn, zoomRange]);

    // ECharts 이벤트 핸들러
    const onEvents = useMemo(() => ({
        'dataZoom': (params: any) => {
            // dataZoom 이벤트에서 start/end 퍼센트 가져오기
            const start = params.start ?? params.batch?.[0]?.start ?? 0;
            const end = params.end ?? params.batch?.[0]?.end ?? 100;
            setZoomRange({ start, end });
        }
    }), []);

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
                bottom: '15%', // 라벨 회전을 위해 하단 여백 확보
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
                min: 'dataMin',
                max: 'dataMax',
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty', // 데이터 필터링 모드 변경 (중요: filterMode를 empty나 none으로 해야 원본 데이터 보존됨)
                },
                {
                    type: 'slider', // 하단 슬라이더 추가
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
                    borderColor: '#475569'
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'empty',
                },
            ],
            animation: false, // 대용량 데이터 렌더링 시 애니메이션 끄기 권장
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
                    large: true, // 대용량 최적화
                    largeThreshold: 2000,
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
                    symbol: 'none', // 라인 차트에서 심볼 제거 (성능)
                    sampling: 'lttb', // ECharts 내부 샘플링도 활용
                };
                break;

            case ChartType.BAR:
                series = {
                    type: 'bar',
                    data: seriesData,
                    itemStyle: {
                        color: '#38bdf8',
                        borderRadius: [4, 4, 0, 0],
                    },
                    large: true,
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
                            onEvents={onEvents}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartRenderer;
