import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
    type?: 'WebApplication' | 'Article' | 'BreadcrumbList' | 'FAQPage';
    data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ 
    type = 'WebApplication',
    data = {}
}) => {
    const getStructuredData = () => {
        switch (type) {
            case 'WebApplication':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    'name': 'DataAnalyzer',
                    'url': 'https://freedataanalyzer.com',
                    'description': 'Free online tool for analyzing and visualizing CSV and Excel data files',
                    'applicationCategory': 'BusinessApplication',
                    'operatingSystem': 'Any',
                    'offers': {
                        '@type': 'Offer',
                        'price': '0',
                        'priceCurrency': 'USD'
                    },
                    'aggregateRating': {
                        '@type': 'AggregateRating',
                        'ratingValue': '4.8',
                        'ratingCount': '150'
                    },
                    'featureList': [
                        'CSV file analysis',
                        'Excel file visualization',
                        'Interactive charts',
                        'Data transformation',
                        'Privacy-focused (no data upload)',
                        'Free to use'
                    ],
                    ...data
                };

            case 'Article':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    'headline': data.headline || 'Data Analysis Guide',
                    'description': data.description || '',
                    'author': {
                        '@type': 'Organization',
                        'name': 'DataAnalyzer'
                    },
                    'publisher': {
                        '@type': 'Organization',
                        'name': 'DataAnalyzer',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': 'https://freedataanalyzer.com/logo.png'
                        }
                    },
                    'datePublished': data.datePublished || new Date().toISOString(),
                    'dateModified': data.dateModified || new Date().toISOString(),
                    'mainEntityOfPage': {
                        '@type': 'WebPage',
                        '@id': data.url || 'https://freedataanalyzer.com'
                    },
                    'image': data.image || 'https://freedataanalyzer.com/og-image.png',
                    ...data
                };

            case 'BreadcrumbList':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    'itemListElement': data.items || []
                };

            case 'FAQPage':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    'mainEntity': data.questions || []
                };

            default:
                return data;
        }
    };

    const structuredData = getStructuredData();

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default StructuredData;

export const createBreadcrumb = (items: Array<{ name: string; url: string }>) => {
    return items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
    }));
};

export const createFAQItem = (question: string, answer: string) => ({
    '@type': 'Question',
    'name': question,
    'acceptedAnswer': {
        '@type': 'Answer',
        'text': answer
    }
});
