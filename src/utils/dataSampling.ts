import { ChartDataPoint } from '../types';

/**
 * 대용량 데이터 다운샘플링
 * 사용자의 요청에 따라 Min/Max 값을 보존하기 위해 Min-Max Downsampling 사용
 */
export function downsampleData(
    data: ChartDataPoint[],
    threshold: number = 10000
): ChartDataPoint[] {
    if (data.length <= threshold) {
        return data;
    }

    // LTTB 대신 Min-Max 다운샘플링 사용 (중요 정보 보존)
    return minMaxDownsample(data, threshold);
}

/**
 * Min-Max 다운샘플링
 * 데이터를 버킷으로 나누고 각 버킷에서 최소값과 최대값을 추출하여 보존
 * 스파이크나 중요 변곡점을 놓치지 않음
 */
function minMaxDownsample(
    data: ChartDataPoint[],
    threshold: number
): ChartDataPoint[] {
    const dataLength = data.length;
    if (threshold >= dataLength || threshold === 0) {
        return data;
    }

    const sampled: ChartDataPoint[] = [];

    // 첫 포인트 포함
    sampled.push(data[0]);

    // 버킷 개수 (첫/끝 포인트 제외하고 계산)
    // 각 버킷에서 min, max 2개를 뽑으므로 threshold의 절반 정도로 버킷을 만듦
    const bucketCount = Math.floor((threshold - 2) / 2);
    const bucketSize = (dataLength - 2) / bucketCount;

    for (let i = 0; i < bucketCount; i++) {
        const startIndex = Math.floor(i * bucketSize) + 1;
        const endIndex = Math.min(Math.floor((i + 1) * bucketSize) + 1, dataLength - 1);

        if (startIndex >= endIndex) continue;

        let minPoint = data[startIndex];
        let maxPoint = data[startIndex];
        let minY = typeof minPoint.y === 'number' ? minPoint.y : 0;
        let maxY = typeof maxPoint.y === 'number' ? maxPoint.y : 0;

        for (let j = startIndex + 1; j < endIndex; j++) {
            const point = data[j];
            const y = typeof point.y === 'number' ? point.y : 0;

            if (y < minY) {
                minY = y;
                minPoint = point;
            }
            if (y > maxY) {
                maxY = y;
                maxPoint = point;
            }
        }

        // x좌표 순서대로 추가 (min이 먼저인지 max가 먼저인지)
        if (minPoint.x < maxPoint.x) {
            sampled.push(minPoint);
            if (minPoint !== maxPoint) sampled.push(maxPoint);
        } else {
            sampled.push(maxPoint);
            if (minPoint !== maxPoint) sampled.push(minPoint);
        }
    }

    // 마지막 포인트 포함
    if (sampled[sampled.length - 1] !== data[dataLength - 1]) {
        sampled.push(data[dataLength - 1]);
    }

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
