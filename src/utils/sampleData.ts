import Papa from 'papaparse';
import { ColumnInfo } from '../types';
import { inferColumnTypes } from './typeInference';

export interface SampleDataset {
    id: string;
    name: string;
    description: string;
    fileName: string;
    icon: string;
    suggestedCharts: string[];
}

export const SAMPLE_DATASETS: SampleDataset[] = [
    {
        id: 'sales',
        name: 'Sales Data',
        description: 'E-commerce sales data with products, regions, and customer demographics',
        fileName: 'sales-data.csv',
        icon: '📊',
        suggestedCharts: ['Bar Chart', 'Pie Chart', 'Line Chart']
    },
    {
        id: 'reviews',
        name: 'Customer Reviews',
        description: 'Product reviews with ratings and text feedback for sentiment analysis',
        fileName: 'customer-reviews.csv',
        icon: '⭐',
        suggestedCharts: ['Word Cloud', 'Histogram', 'Scatter Plot']
    },
    {
        id: 'weather',
        name: 'Weather Data',
        description: 'Temperature, humidity, and precipitation data across multiple cities',
        fileName: 'weather-data.csv',
        icon: '🌤️',
        suggestedCharts: ['Line Chart', 'Correlation Heatmap', 'Box Plot']
    }
];

export const loadSampleData = async (datasetId: string): Promise<{ data: any[][], columns: ColumnInfo[] }> => {
    const dataset = SAMPLE_DATASETS.find(d => d.id === datasetId);
    if (!dataset) {
        throw new Error('Sample dataset not found');
    }

    // In dev: /samples/file.csv
    // In prod: /DataAnalyzer/samples/file.csv (BASE_URL from vite.config)
    const basePath = import.meta.env.BASE_URL || '/';
    const filePath = `${basePath}samples/${dataset.fileName}`.replace('//', '/');

    console.log('Attempting to load sample data from:', filePath);

    const response = await fetch(filePath);
    if (!response.ok) {
        console.error('Failed to fetch:', response.status, response.statusText);
        throw new Error(`Failed to load sample data: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('CSV parse errors:', results.errors);
                    reject(new Error('Failed to parse CSV'));
                    return;
                }

                const headers = results.meta.fields || [];
                const rows = results.data as any[];

                // Convert to 2D array format
                const data: any[][] = rows.map(row =>
                    headers.map(header => row[header])
                );

                // Infer column types
                const columns = inferColumnTypes(headers, data);

                console.log('Successfully loaded sample data:', {
                    rows: data.length,
                    columns: columns.length
                });

                resolve({ data, columns });
            },
            error: (error: any) => {
                console.error('Papa parse error:', error);
                reject(error);
            }
        });
    });
};
