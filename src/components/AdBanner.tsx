import { useEffect, useRef } from 'react';
import { trackAdView, trackAdClick } from '../utils/analytics';

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: string;
    className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
    dataAdSlot,
    dataAdFormat = 'auto',
    className = ''
}) => {
    const adRef = useRef<HTMLDivElement>(null);
    const adTracked = useRef(false);

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            
            // Track ad view (only once per mount)
            if (!adTracked.current) {
                trackAdView(dataAdSlot);
                adTracked.current = true;
            }
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, [dataAdSlot]);

    // Track ad click
    const handleAdClick = () => {
        trackAdClick(dataAdSlot);
    };

    return (
        <div 
            ref={adRef}
            className={`adsense-container ${className}`}
            onClick={handleAdClick}
        >
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1217863446029904"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdBanner;
