import { ChartDataPoint } from '../types';

/**
 * 대용량 데이터 다운샘플링
 * LTTB (Largest-Triangle-Three-Buckets) 알고리즘 사용
 */
export function downsampleData(
    data: ChartDataPoint[],
    threshold: number = 10000
): ChartDataPoint[] {
    if (data.length <= threshold) {
        return data;
    }

    return lttbDownsample(data, threshold);
}

/**
 * LTTB (Largest-Triangle-Three-Buckets) 다운샘플링 알고리즘
 * 시각적으로 중요한 포인트를 보존하면서 데이터 포인트 수를 줄임
 */
function lttbDownsample(
    data: ChartDataPoint[],
    threshold: number
): ChartDataPoint[] {
    const dataLength = data.length;

    if (threshold >= dataLength || threshold === 0) {
        return data;
    }

    const sampled: ChartDataPoint[] = [];

    // 항상 첫 번째 포인트 포함
    sampled.push(data[0]);

    // 버킷 크기 계산
    const bucketSize = (dataLength - 2) / (threshold - 2);

    let a = 0; // 이전에 선택된 포인트의 인덱스

    for (let i = 0; i < threshold - 2; i++) {
        // 현재 버킷 범위 계산
        let avgX = 0;
        let avgY = 0;

        const avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
        const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, dataLength);
        const avgRangeLength = avgRangeEnd - avgRangeStart;

        // 다음 버킷의 평균 포인트 계산
        for (let idx = avgRangeStart; idx < avgRangeEnd; idx++) {
            const point = data[idx];
            if (!point) continue; // 데이터가 없는 경우 건너뜀

            avgX += typeof point.x === 'number' ? point.x : idx;
            avgY += typeof point.y === 'number' ? point.y : 0;
        }

        if (avgRangeLength > 0) {
            avgX /= avgRangeLength;
            avgY /= avgRangeLength;
        }

        // 현재 버킷 범위
        const rangeOffs = Math.floor(i * bucketSize) + 1;
        const rangeTo = Math.min(Math.floor((i + 1) * bucketSize) + 1, dataLength);

        // 이전 포인트 좌표
        const pointAX = typeof data[a].x === 'number' ? data[a].x : a;
        const pointAY = typeof data[a].y === 'number' ? data[a].y : 0;

        let maxArea = -1;
        let maxAreaPoint = data[rangeOffs] || data[a]; // fallback to previous point if undefined
        let nextA = rangeOffs;

        // 현재 버킷에서 가장 큰 삼각형을 만드는 포인트 찾기
        for (let j = rangeOffs; j < rangeTo; j++) {
            const point = data[j];
            if (!point) continue;

            const pointX = typeof point.x === 'number' ? point.x : j;
            const pointY = typeof point.y === 'number' ? point.y : 0;

            // 삼각형 넓이 계산
            const area = Math.abs(
                (pointAX - avgX) * (pointY - pointAY) -
                (pointAX - pointX) * (avgY - pointAY)
            ) * 0.5;

            if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = point;
                nextA = j;
            }
        }

        sampled.push(maxAreaPoint);
        a = nextA;
    }

    // 항상 마지막 포인트 포함
    sampled.push(data[dataLength - 1]);

    return sampled;
}

/**
 * 균등 샘플링 (간단한 방법)
 */
export function uniformDownsample(
    data: ChartDataPoint[],
    threshold: number = 10000
): ChartDataPoint[] {
    if (data.length <= threshold) {
        return data;
    }

    const step = Math.ceil(data.length / threshold);
    const sampled: ChartDataPoint[] = [];

    for (let i = 0; i < data.length; i += step) {
        sampled.push(data[i]);
    }

    // 마지막 포인트 포함
    if (sampled[sampled.length - 1] !== data[data.length - 1]) {
        sampled.push(data[data.length - 1]);
    }

    return sampled;
}
