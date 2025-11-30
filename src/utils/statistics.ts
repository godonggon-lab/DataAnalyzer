/**
 * 히스토그램 데이터 계산
 * @param data 숫자 데이터 배열
 * @param binCount 원하는 구간 수 (없으면 자동 계산)
 * @returns bins(X축 라벨), counts(Y축 값)
 */
export const calculateHistogram = (data: number[], binCount?: number) => {
    if (data.length === 0) return { bins: [], counts: [] };

    // 대용량 배열을 위해 spread 대신 반복문 사용
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < min) min = data[i];
        if (data[i] > max) max = data[i];
    }

    // 데이터가 모두 같거나 하나뿐인 경우
    if (min === max) {
        return {
            bins: [min.toString()],
            counts: [data.length]
        };
    }

    // 구간 수 자동 계산 (Sturges' formula)
    const k = binCount || Math.ceil(Math.log2(data.length) + 1);
    const binWidth = (max - min) / k;

    const bins: string[] = [];
    const counts: number[] = new Array(k).fill(0);

    // 구간 라벨 생성
    for (let i = 0; i < k; i++) {
        const start = min + i * binWidth;
        const end = min + (i + 1) * binWidth;
        // 소수점 2자리까지 표시
        bins.push(`${start.toFixed(2)} ~ ${end.toFixed(2)}`);
    }

    // 데이터 카운팅
    data.forEach(value => {
        let binIndex = Math.floor((value - min) / binWidth);
        // 최대값은 마지막 구간에 포함
        if (binIndex >= k) binIndex = k - 1;
        counts[binIndex]++;
    });

    return { bins, counts };
};

/**
 * 박스플롯 통계량 계산 (Min, Q1, Median, Q3, Max)
 * @param data 숫자 데이터 배열
 * @returns [min, Q1, median, Q3, max]
 */
export const calculateBoxPlotStats = (data: number[]): number[] => {
    if (data.length === 0) return [0, 0, 0, 0, 0];

    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;

    const getQuantile = (q: number) => {
        const pos = (n - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    const min = sorted[0];
    const max = sorted[n - 1];
    const q1 = getQuantile(0.25);
    const median = getQuantile(0.5);
    const q3 = getQuantile(0.75);

    return [min, q1, median, q3, max];
};

/**
 * 그룹별 박스플롯 데이터 준비
 * @param xData 그룹 데이터 (예: 범주형)
 * @param yData 값 데이터 (숫자형)
 * @param maxCategories 최대 카테고리 수 (기본값: 100)
 * @returns axisData(그룹명), boxData(통계량 배열), grouped(그룹핑 여부)
 */
export const groupDataForBoxPlot = (xData: any[], yData: number[], maxCategories: number = 100) => {
    const groups: { [key: string]: number[] } = {};

    // 데이터 그룹화
    xData.forEach((group, i) => {
        const key = String(group);
        if (!groups[key]) groups[key] = [];
        groups[key].push(yData[i]);
    });

    let axisData = Object.keys(groups);
    const originalCount = axisData.length;

    // 카테고리가 maxCategories를 초과하면 그룹핑
    if (axisData.length > maxCategories) {
        const groupSize = Math.ceil(axisData.length / maxCategories);
        const newGroups: { [key: string]: number[] } = {};

        axisData.forEach((key, index) => {
            const groupIndex = Math.floor(index / groupSize);
            const groupKey = `Group ${groupIndex + 1} (${groupIndex * groupSize + 1}-${Math.min((groupIndex + 1) * groupSize, originalCount)})`;
            if (!newGroups[groupKey]) newGroups[groupKey] = [];
            newGroups[groupKey].push(...groups[key]);
        });

        axisData = Object.keys(newGroups);
        const boxData = axisData.map(key => calculateBoxPlotStats(newGroups[key]));

        return {
            axisData,
            boxData,
            grouped: true,
            originalCount
        };
    }

    const boxData = axisData.map(key => calculateBoxPlotStats(groups[key]));
    return {
        axisData,
        boxData,
        grouped: false,
        originalCount
    };
};
