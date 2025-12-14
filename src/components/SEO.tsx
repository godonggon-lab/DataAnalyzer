import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    ogType?: string;
    ogImage?: string;
    ogUrl?: string;
    canonicalUrl?: string;
    noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
    title = 'DataAnalyzer - Large-scale Data Visualization Tool',
    description = 'Powerful tool for analyzing and visualizing large CSV/Excel files in your browser. Free, secure, and no data upload required.',
    keywords = 'CSV, Excel, Data Visualization, Chart, Analysis, Data Analytics, Big Data, Free Tool',
    author = 'DataAnalyzer',
    ogType = 'website',
    ogImage = 'https://freedataanalyzer.com/og-image.png',
    ogUrl,
    canonicalUrl,
    noindex = false,
}) => {
    const siteTitle = 'DataAnalyzer';
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
    const currentUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : 'https://freedataanalyzer.com');

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            
            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            
            {/* Robots */}
            {noindex && <meta name="robots" content="noindex,nofollow" />}
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteTitle} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            
            {/* Additional SEO */}
            <meta name="language" content="en, ko" />
            <meta httpEquiv="content-language" content="en, ko" />
        </Helmet>
    );
};

export default SEO;
