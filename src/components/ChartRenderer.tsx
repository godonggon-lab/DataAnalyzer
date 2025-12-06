import React, { useMemo, useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';
import { useDataStore } from '../store/dataStore';
import { useThemeStore } from '../store/themeStore';
import { ChartType, ChartDataPoint } from '../types';
import { downsampleData } from '../utils/dataSampling';
import { toNumber } from '../utils/typeInference';
import { calculateHistogram, groupDataForBoxPlot, calculateBoxPlotStats, calculateCorrelationMatrix, aggregateDataForPie, calculateWordFrequency } from '../utils/statistics';

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
    const { theme } = useThemeStore();

    // Theme-based colors
    const themeColors = useMemo(() => ({
        text: theme === 'dark' ? '#cbd5e1' : '#475569',
        subText: theme === 'dark' ? '#94a3b8' : '#64748b',
        border: theme === 'dark' ? '#475569' : '#cbd5e1',
        splitLine: theme === 'dark' ? '#334155' : '#e2e8f0',
        tooltipBg: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        tooltipText: theme === 'dark' ? '#e2e8f0' : '#1e293b',
        tooltipBorder: theme === 'dark' ? '#475569' : '#e2e8f0',
    }), [theme]);

    const {
        processedData,
        processedColumns,
        selectedXColumn,
        selectedYColumns,
        chartType,
        filterRange,
        binCount,
        boxPlotMaxCategories,
        yAxisAssignment,
        selectedCorrelationColumns,
    } = useDataStore();

    const [chartData, setChartData] = useState<any>(null);

    // 차트 데이터 계산 및 로딩 상태 관리
    useEffect(() => {
        setIsChartLoading(true);

        // UI가 렌더링될 시간을 주기 위해 setTimeout 사용
        const timer = setTimeout(() => {
            if ((chartType !== ChartType.HEATMAP && chartType !== ChartType.WORDCLOUD && chartType !== ChartType.PIE && (selectedYColumns.length === 0 || processedData.length === 0)) ||
                (chartType === ChartType.HEATMAP && (selectedCorrelationColumns.length < 2 || processedData.length === 0)) ||
                (chartType === ChartType.WORDCLOUD && (!selectedXColumn || processedData.length === 0)) ||
                (chartType === ChartType.PIE && (!selectedXColumn || processedData.length === 0))) {
                setChartData(null);
                setIsChartLoading(false);
                return;
            }

            let result = null;

            // 히스토그램 처리
            if (chartType === ChartType.HISTOGRAM) {
                const yIndex = processedColumns.findIndex(c => c.name === selectedYColumns[0]);
                if (yIndex !== -1) {
                    const values = processedData
                        .map(row => toNumber(row[yIndex]))
                        .filter(v => {
                            if (isNaN(v) || !isFinite(v)) return false;
                            if (filterRange) {
                                return v >= filterRange.min && v <= filterRange.max;
                            }
                            return true;
                        });
                    const { bins, counts } = calculateHistogram(values, binCount);

                    result = {
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
            }
            // 박스플롯 처리
            else if (chartType === ChartType.BOXPLOT) {
                // X축이 선택된 경우 (그룹별 박스플롯 - Multi Series)
                if (selectedXColumn) {
                    const xIndex = processedColumns.findIndex(c => c.name === selectedXColumn);
                    if (xIndex !== -1) {
                        const xValues = processedData.map(row => row[xIndex]);
                        // 첫 번째 Y컬럼으로 X축 카테고리(axisData)를 먼저 구함 (모든 시리즈가 공유)
                        // 주의: 모든 Y컬럼에 대해 동일한 X값들이 있다고 가정
                        const yIndex0 = processedColumns.findIndex(c => c.name === selectedYColumns[0]);
                        const yValues0 = processedData.map(row => toNumber(row[yIndex0]));
                        const { axisData } = groupDataForBoxPlot(xValues, yValues0, boxPlotMaxCategories);

                        const seriesList = selectedYColumns.map((yColName, i) => {
                            const yIdx = processedColumns.findIndex(c => c.name === yColName);
                            if (yIdx === -1) return null;
                            const yVals = processedData.map(row => toNumber(row[yIdx]));
                            const { boxData } = groupDataForBoxPlot(xValues, yVals, boxPlotMaxCategories);
                            return {
                                name: yColName,
                                data: boxData,
                                color: seriesColors[i % seriesColors.length]
                            };
                        }).filter(s => s !== null);

                        result = {
                            type: 'boxplot',
                            xAxisData: axisData,
                            series: seriesList,
                            original: processedData.length,
                            sampled: processedData.length,
                            isXAxisTime: false
                        };
                    }
                }
                // X축이 없는 경우 (단일 박스플롯 - Single Series with Multiple Categories)
                else {
                    const boxDataList: number[][] = [];
                    const axisData: string[] = [];

                    selectedYColumns.forEach(yColName => {
                        const yIndex = processedColumns.findIndex(c => c.name === yColName);
                        if (yIndex !== -1) {
                            const yValues = processedData.map(row => toNumber(row[yIndex]));
                            const stats = calculateBoxPlotStats(yValues.filter(v => !isNaN(v) && isFinite(v)));
                            boxDataList.push(stats);
                            axisData.push(yColName);
                        }
                    });

                    result = {
                        type: 'boxplot',
                        xAxisData: axisData,
                        series: [{
                            name: 'Distribution',
                            data: boxDataList,
                            color: seriesColors[0] // 개별 색상은 option에서 처리
                        }],
                        original: processedData.length,
                        sampled: processedData.length,
                        isXAxisTime: false
                    };
                }
            }
            // 상관관계 히트맵 처리
            else if (chartType === ChartType.HEATMAP) {
                if (selectedCorrelationColumns.length >= 2) {
                    const matrixData = calculateCorrelationMatrix(processedData, selectedCorrelationColumns, processedColumns);

                    result = {
                        type: 'heatmap',
                        xAxisData: selectedCorrelationColumns,
                        yAxisData: selectedCorrelationColumns,
                        series: [{
                            name: 'Correlation',
                            data: matrixData.map(item => [item.x, item.y, item.value]),
                            label: { show: true }
                        }],
                        original: processedData.length,
                        sampled: processedData.length,
                        isXAxisTime: false
                    };
                }
            }

            // 파이 차트 처리
            else if (chartType === ChartType.PIE) {
                if (selectedXColumn) {
                    const xIndex = processedColumns.findIndex(c => c.name === selectedXColumn);
                    if (xIndex !== -1) {
                        const xValues = processedData.map(row => row[xIndex]);

                        let yValues: number[] | undefined = undefined;
                        if (selectedYColumns.length > 0) {
                            const yIndex = processedColumns.findIndex(c => c.name === selectedYColumns[0]);
                            if (yIndex !== -1) {
                                yValues = processedData.map(row => toNumber(row[yIndex]));
                            }
                        }

                        const pieData = aggregateDataForPie(xValues, yValues);

                        result = {
                            type: 'pie',
                            series: [{
                                name: selectedXColumn,
                                data: pieData
                            }],
                            original: processedData.length,
                            sampled: pieData.length,
                            isXAxisTime: false
                        };
                    }
                }
            }
            // 워드 클라우드 처리
            else if (chartType === ChartType.WORDCLOUD) {
                if (selectedXColumn) {
                    const xIndex = processedColumns.findIndex(c => c.name === selectedXColumn);
                    if (xIndex !== -1) {
                        const textData = processedData.map(row => row[xIndex]);
                        const wordData = calculateWordFrequency(textData);

                        result = {
                            type: 'wordCloud',
                            series: [{
                                name: selectedXColumn,
                                data: wordData
                            }],
                            original: processedData.length,
                            sampled: wordData.length,
                            isXAxisTime: false
                        };
                    }
                }
            }
            // 기존 차트 (Scatter, Line, Bar)
            else if (selectedXColumn) {
                const xIndex = processedColumns.findIndex(c => c.name === selectedXColumn);
                if (xIndex !== -1) {
                    const xColumn = processedColumns.find(c => c.name === selectedXColumn);
                    const isXAxisTime = xColumn?.type === 'datetime';

                    // 각 Y컬럼마다 시리즈 생성
                    const seriesDataList = selectedYColumns.map((yColumnName, seriesIndex) => {
                        const yIndex = processedColumns.findIndex(c => c.name === yColumnName);
                        if (yIndex === -1) return null;

                        const dataPoints: ChartDataPoint[] = [];

                        for (const row of processedData) {
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

                    result = {
                        type: 'basic',
                        series: seriesDataList,
                        original: totalOriginal,
                        sampled: totalSampled,
                        isXAxisTime,
                    };
                }
            }

            setChartData(result);
            setIsChartLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [processedData, processedColumns, selectedXColumn, selectedYColumns, selectedCorrelationColumns, chartType, filterRange, binCount, boxPlotMaxCategories, yAxisAssignment, theme]);

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
                left: '80px',  // Y축 레이블이 잘 보이도록 고정 너비 사용
                right: selectedYColumns.length > 1 ? '80px' : '40px',  // 오른쪽 Y축 공간
                bottom: chartData.isXAxisTime ? '20%' : '15%', // DateTime 라벨을 위한 추가 공간
                top: selectedYColumns.length > 1 ? '15%' : '10%', // 범례 공간 확보
                containLabel: false,  // 고정 너비를 사용하므로 false로 변경
            },
            legend: selectedYColumns.length > 1 ? {
                top: '5%',
                textStyle: {
                    color: themeColors.text,
                },
                icon: 'circle',
            } : undefined,
            tooltip: {
                trigger: 'axis',
                backgroundColor: themeColors.tooltipBg,
                borderColor: themeColors.tooltipBorder,
                borderWidth: 1,
                textStyle: {
                    color: themeColors.tooltipText,
                },
                axisPointer: {
                    type: chartType === ChartType.BAR ? 'shadow' : 'cross',
                    crossStyle: {
                        color: themeColors.subText,
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
                        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                        name: 'chart',
                    },
                },
                iconStyle: {
                    borderColor: themeColors.subText,
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
                    color: themeColors.text,
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                axisLine: {
                    lineStyle: {
                        color: themeColors.border,
                        width: 2,  // 축 선을 더 굵게
                    },
                },
                axisLabel: {
                    color: themeColors.text,  // 더 진한 색상
                    fontWeight: 600,  // 레이블을 굵게
                    fontSize: 12,
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
                        color: themeColors.splitLine,
                        type: 'dashed',
                    },
                },
                min: 'dataMin', // 축 범위 자동 조정
                max: 'dataMax',
            },
            // Multi Y-Axis Configuration
            yAxis: [
                {
                    type: 'value',
                    name: 'Left Axis',
                    position: 'left',
                    nameTextStyle: { color: themeColors.text, fontWeight: 'bold' },
                    axisLine: { show: true, lineStyle: { color: '#5470c6', width: 2 } },
                    axisLabel: {
                        color: themeColors.text,  // 더 진한 색상
                        fontWeight: 600,  // 레이블을 굵게
                        fontSize: 12
                    },
                    splitLine: { lineStyle: { color: themeColors.splitLine, type: 'dashed' } }
                },
                {
                    type: 'value',
                    name: 'Right Axis',
                    position: 'right',
                    nameTextStyle: { color: themeColors.text, fontWeight: 'bold' },
                    axisLine: { show: true, lineStyle: { color: '#91cc75', width: 2 } },
                    axisLabel: {
                        color: themeColors.text,  // 더 진한 색상
                        fontWeight: 600,  // 레이블을 굵게
                        fontSize: 12
                    },
                    splitLine: { show: false }
                }
            ],
            dataZoom: [
                { type: 'inside', xAxisIndex: 0, filterMode: 'empty' },
                { type: 'slider', xAxisIndex: 0, filterMode: 'empty', height: 20, bottom: 10, borderColor: themeColors.border },
                { type: 'inside', yAxisIndex: [0, 1], filterMode: 'empty' }, // Zoom both axes
                { type: 'slider', yAxisIndex: 0, filterMode: 'empty', left: 10, width: 20, borderColor: themeColors.border }, // Left axis slider
                { type: 'slider', yAxisIndex: 1, filterMode: 'empty', right: 10, width: 20, borderColor: themeColors.border } // Right axis slider
            ],
            animation: false,
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
            const boxPlotSeries = chartData.series.map((s: any) => ({
                name: s.name,
                type: 'boxplot',
                data: s.data,
                itemStyle: {
                    color: selectedXColumn
                        ? s.color
                        : (params: any) => {
                            const colors = [
                                '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
                                '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6'
                            ];
                            return colors[params.dataIndex % colors.length];
                        },
                    borderColor: '#fff'
                }
            }));

            return {
                ...baseOption,
                tooltip: {
                    trigger: 'item',
                    formatter: (param: any) => {
                        return [
                            `${param.seriesName} - ${param.name}`,
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
                    name: selectedYColumns.length === 1 ? selectedYColumns[0] : 'Value'
                },
                series: boxPlotSeries
            };
        }

        // 히트맵 옵션
        if (chartData.type === 'heatmap') {
            return {
                ...baseOption,
                tooltip: {
                    position: 'top',
                    formatter: (params: any) => {
                        return `${params.value[0]} vs ${params.value[1]}<br/>Correlation: <strong>${params.value[2]}</strong>`;
                    }
                },
                grid: {
                    top: '10%',
                    bottom: '15%',
                    left: '10%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: chartData.xAxisData,
                    splitArea: { show: true },
                    axisLabel: { rotate: 45 }
                },
                yAxis: {
                    type: 'category',
                    data: chartData.yAxisData,
                    splitArea: { show: true }
                },
                visualMap: {
                    min: -1,
                    max: 1,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0%',
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    textStyle: {
                        color: themeColors.text
                    }
                },
                series: [{
                    name: 'Correlation',
                    type: 'heatmap',
                    data: chartData.series[0].data,
                    label: {
                        show: true,
                        color: theme === 'dark' ? '#fff' : '#000'
                    },
                    itemStyle: {
                        borderColor: themeColors.border,
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
        }

        // 파이 차트 옵션
        if (chartData.type === 'pie') {
            return {
                ...baseOption,
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    textStyle: {
                        color: themeColors.text,
                    },
                    pageTextStyle: {
                        color: themeColors.text
                    }
                },
                series: [
                    {
                        name: chartData.series[0].name,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: theme === 'dark' ? '#0f172a' : '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: themeColors.text
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: chartData.series[0].data
                    }
                ]
            };
        }

        // 워드 클라우드 옵션
        if (chartData.type === 'wordCloud') {
            return {
                ...baseOption,
                tooltip: {
                    show: true,
                    formatter: '{b}: {c}'
                },
                series: [{
                    type: 'wordCloud',
                    shape: 'circle',
                    left: 'center',
                    top: 'center',
                    width: '90%',
                    height: '90%',
                    right: null,
                    bottom: null,
                    sizeRange: [12, 60],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    layoutAnimation: true,
                    textStyle: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: chartData.series[0].data
                }]
            };
        }

        // 기존 차트 옵션 (Scatter, Line, Bar)
        // 각 Y 컬럼마다 시리즈 생성
        const seriesList = chartData.series.map((seriesInfo: any) => {
            const seriesData = seriesInfo.data.map((point: ChartDataPoint) => [point.x, point.y]);
            const axisIndex = yAxisAssignment[seriesInfo.name] ?? 0; // 0: Left, 1: Right

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

            let seriesConfig: any = {
                name: seriesInfo.name,
                data: seriesData,
                yAxisIndex: axisIndex, // Assign to correct Y-axis
                markPoint: markPointConfig,
            };

            switch (chartType) {
                case ChartType.SCATTER:
                    seriesConfig = {
                        ...seriesConfig,
                        type: 'scatter',
                        symbolSize: 6,
                        itemStyle: {
                            color: seriesInfo.color,
                            opacity: 0.7,
                        },
                        large: true,
                        largeThreshold: 2000,
                    };
                    break;

                case ChartType.LINE:
                    seriesConfig = {
                        ...seriesConfig,
                        type: 'line',
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
                    };
                    break;

                case ChartType.BAR:
                    seriesConfig = {
                        ...seriesConfig,
                        type: 'bar',
                        itemStyle: {
                            color: seriesInfo.color,
                            borderRadius: [4, 4, 0, 0],
                        },
                        large: true,
                    };
                    break;

                default:
                    seriesConfig = {
                        ...seriesConfig,
                        type: 'scatter',
                    };
            }

            return seriesConfig;
        });

        return {
            ...baseOption,
            series: seriesList,
        };
    }, [chartData, chartType, selectedXColumn, selectedYColumns, yAxisAssignment, themeColors, theme]);

    const containerRef = useRef<HTMLDivElement>(null);

    // 윈도우 리사이즈 및 컨테이너 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                try {
                    const instance = chartRef.current.getEchartsInstance();
                    if (instance && !instance.isDisposed()) {
                        instance.resize();
                    }
                } catch (error) {
                    console.warn('Chart resize failed:', error);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        // ResizeObserver로 컨테이너 크기 변경 감지
        const observer = new ResizeObserver(() => {
            handleResize();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    // X축 선택이 없어도 되는 차트 타입(히스토그램, 박스플롯, 히트맵)은 예외 처리
    const isSingleVariableChart = chartType === ChartType.HISTOGRAM || chartType === ChartType.BOXPLOT || chartType === ChartType.HEATMAP || chartType === ChartType.PIE || chartType === ChartType.WORDCLOUD;

    if ((!selectedXColumn && !isSingleVariableChart) ||
        (chartType !== ChartType.HEATMAP && chartType !== ChartType.WORDCLOUD && chartType !== ChartType.PIE && selectedYColumns.length === 0) ||
        (chartType === ChartType.HEATMAP && selectedCorrelationColumns.length < 2) ||
        ((chartType === ChartType.WORDCLOUD || chartType === ChartType.PIE) && !selectedXColumn)) {
        return (
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center animate-slide-up">
                <div>
                    <svg className="mx-auto h-16 w-16 text-slate-400 dark:text-dark-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-slate-500 dark:text-dark-400 mb-2">
                        Please select X and Y axes
                    </h3>
                    <p className="text-slate-400 dark:text-dark-500">
                        Select columns above to display the chart
                    </p>
                </div>
            </div>
        );
    }

    if (!chartData || chartData.series.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center animate-slide-up">
                <div>
                    <svg className="mx-auto h-16 w-16 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-yellow-500 dark:text-yellow-400 mb-2">
                        No valid data
                    </h3>
                    <p className="text-slate-500 dark:text-dark-400">
                        Selected columns contain no numeric data
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex flex-col p-6 animate-slide-up">
            <div className="flex justify-end mb-2 px-2">
                <div className="text-sm text-slate-500 dark:text-dark-400">
                    <span className="font-medium text-primary-500 dark:text-primary-400">{chartData.sampled.toLocaleString()}</span>
                    {' / '}
                    <span>{chartData.original.toLocaleString()}</span> points
                    {chartData.sampled < chartData.original && (
                        <span className="ml-2 text-xs text-yellow-500 dark:text-yellow-400">
                            (Downsampled)
                        </span>
                    )}
                </div>
            </div>

            <div ref={containerRef} className="bg-white/50 dark:bg-dark-900/50 rounded-xl relative flex-1 min-h-0">
                {isChartLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-dark-900/70 backdrop-blur-sm rounded-xl z-10">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                            <p className="text-sm text-slate-500 dark:text-dark-300">Rendering chart...</p>
                        </div>
                    </div>
                )}
                {chartOption && (
                    <ReactECharts
                        key={`${chartType}-${selectedYColumns.join(',')}`}
                        ref={chartRef}
                        option={chartOption}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                        notMerge={true}
                    />
                )}
            </div>

            {chartType === ChartType.HEATMAP && (
                <div className="mt-4 p-4 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm animate-slide-up">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Interpreting Correlation Coefficients (r)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 mt-0.5 mr-3 flex-shrink-0 shadow-sm"></div>
                            <div>
                                <strong className="block text-red-700 dark:text-red-300 mb-1">Positive (+1.0)</strong>
                                <span className="text-slate-600 dark:text-dark-300">Strong relationship moving in the <strong>same direction</strong>.</span>
                            </div>
                        </div>
                        <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mt-0.5 mr-3 flex-shrink-0 shadow-sm"></div>
                            <div>
                                <strong className="block text-blue-700 dark:text-blue-300 mb-1">Negative (-1.0)</strong>
                                <span className="text-slate-600 dark:text-dark-300">Strong relationship moving in <strong>opposite directions</strong>.</span>
                            </div>
                        </div>
                        <div className="flex items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 mt-0.5 mr-3 flex-shrink-0 shadow-sm"></div>
                            <div>
                                <strong className="block text-slate-700 dark:text-slate-300 mb-1">No Correlation (0)</strong>
                                <span className="text-slate-600 dark:text-dark-300">Variables are likely <strong>independent</strong> of each other.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartRenderer;
