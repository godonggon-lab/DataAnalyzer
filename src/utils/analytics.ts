// Google Analytics 4 유틸리티

// GA4 Measurement ID (환경에 맞게 변경하세요)
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 실제 GA4 측정 ID로 변경 필요

// gtag 타입 정의
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

/**
 * Google Analytics 초기화 여부 확인
 */
export const isGAInitialized = (): boolean => {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * 페이지 뷰 추적
 * @param url - 페이지 URL
 * @param title - 페이지 제목
 */
export const trackPageView = (url: string, title?: string): void => {
    if (!isGAInitialized()) {
        console.warn('Google Analytics is not initialized');
        return;
    }

    try {
        window.gtag!('config', GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: title,
        });
        console.log('GA PageView tracked:', url);
    } catch (error) {
        console.error('Error tracking page view:', error);
    }
};

/**
 * 커스텀 이벤트 추적
 * @param eventName - 이벤트 이름
 * @param parameters - 이벤트 매개변수
 */
export const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
): void => {
    if (!isGAInitialized()) {
        console.warn('Google Analytics is not initialized');
        return;
    }

    try {
        window.gtag!('event', eventName, parameters);
        console.log('GA Event tracked:', eventName, parameters);
    } catch (error) {
        console.error('Error tracking event:', error);
    }
};

/**
 * 파일 업로드 이벤트
 */
export const trackFileUpload = (fileType: string, fileSize: number): void => {
    trackEvent('file_upload', {
        file_type: fileType,
        file_size: fileSize,
        event_category: 'engagement',
        event_label: `${fileType} file uploaded`,
    });
};

/**
 * 차트 생성 이벤트
 */
export const trackChartCreation = (chartType: string): void => {
    trackEvent('chart_created', {
        chart_type: chartType,
        event_category: 'engagement',
        event_label: `${chartType} chart created`,
    });
};

/**
 * 데이터 분석 이벤트
 */
export const trackDataAnalysis = (analysisType: string): void => {
    trackEvent('data_analysis', {
        analysis_type: analysisType,
        event_category: 'engagement',
        event_label: `${analysisType} analysis performed`,
    });
};

/**
 * 검색 이벤트
 */
export const trackSearch = (searchTerm: string): void => {
    trackEvent('search', {
        search_term: searchTerm,
        event_category: 'engagement',
    });
};

/**
 * 아웃바운드 링크 클릭 추적
 */
export const trackOutboundLink = (url: string, label?: string): void => {
    trackEvent('outbound_link', {
        link_url: url,
        link_text: label,
        event_category: 'navigation',
    });
};

/**
 * 사용자 타이밍 추적 (성능 측정)
 */
export const trackTiming = (
    name: string,
    value: number,
    category?: string
): void => {
    trackEvent('timing_complete', {
        name,
        value,
        event_category: category || 'performance',
    });
};

/**
 * 에러 추적
 */
export const trackError = (errorMessage: string, errorType?: string): void => {
    trackEvent('exception', {
        description: errorMessage,
        error_type: errorType || 'unknown',
        fatal: false,
    });
};

/**
 * 광고 조회 이벤트
 */
export const trackAdView = (adSlot: string): void => {
    trackEvent('ad_view', {
        ad_slot: adSlot,
        event_category: 'ads',
        event_label: `Ad viewed: ${adSlot}`,
    });
};

/**
 * 광고 클릭 이벤트
 */
export const trackAdClick = (adSlot: string): void => {
    trackEvent('ad_click', {
        ad_slot: adSlot,
        event_category: 'ads',
        event_label: `Ad clicked: ${adSlot}`,
        value: 1,
    });
};

/**
 * 버튼 클릭 추적
 */
export const trackButtonClick = (buttonName: string, location?: string): void => {
    trackEvent('button_click', {
        button_name: buttonName,
        button_location: location,
        event_category: 'engagement',
    });
};

/**
 * 스크롤 깊이 추적
 */
export const trackScrollDepth = (percentage: number): void => {
    trackEvent('scroll_depth', {
        scroll_percentage: percentage,
        event_category: 'engagement',
    });
};

/**
 * 사용자 참여 시간 추적
 */
export const trackEngagementTime = (seconds: number): void => {
    trackEvent('user_engagement', {
        engagement_time_msec: seconds * 1000,
        event_category: 'engagement',
    });
};
