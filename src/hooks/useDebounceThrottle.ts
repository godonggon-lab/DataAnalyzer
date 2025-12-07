import { useEffect, useRef, useCallback } from 'react';

/**
 * Debounce hook - 마지막 호출 후 delay ms 동안 대기
 * 사용 예: 검색 입력, 필터 입력
 */
export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
}

/**
 * Throttle hook - delay ms마다 최대 1번만 실행
 * 사용 예: 스크롤 이벤트, 리사이즈 이벤트
 */
export function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const lastRunRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            const timeSinceLastRun = now - lastRunRef.current;

            if (timeSinceLastRun >= delay) {
                callback(...args);
                lastRunRef.current = now;
            } else {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    callback(...args);
                    lastRunRef.current = Date.now();
                }, delay - timeSinceLastRun);
            }
        },
        [callback, delay]
    );
}
