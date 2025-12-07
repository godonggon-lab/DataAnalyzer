import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import About from './pages/About';
import Contact from './pages/Contact';

// Lazy load blog pages
const BlogList = lazy(() => import('./pages/BlogList'));
const ExcelDataAnalysisGuide = lazy(() => import('./pages/blog/excel-data-analysis-guide'));
const CorrelationAnalysis = lazy(() => import('./pages/blog/CorrelationAnalysis'));
const AIDataAnalysis = lazy(() => import('./pages/blog/AIDataAnalysis'));
const CsvVsExcel = lazy(() => import('./pages/blog/CsvVsExcel'));
const DataVisualizationBestPractices = lazy(() => import('./pages/blog/DataVisualizationBestPractices'));
const SalesDataAnalysis = lazy(() => import('./pages/blog/SalesDataAnalysis'));

// Lazy load tutorial pages
const TutorialList = lazy(() => import('./pages/TutorialList'));
const GettingStarted = lazy(() => import('./pages/tutorials/GettingStarted'));
const AdvancedFeatures = lazy(() => import('./pages/tutorials/AdvancedFeatures'));
const CorrelationTutorial = lazy(() => import('./pages/tutorials/CorrelationTutorial'));
const DataTransformationGuide = lazy(() => import('./pages/tutorials/DataTransformationGuide'));
const TipsAndTricks = lazy(() => import('./pages/tutorials/TipsAndTricks'));

// Lazy load legal pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-slate-600 dark:text-dark-300">Loading...</p>
        </div>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="workspace" element={<Workspace />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />

                    {/* Blog routes with Suspense */}
                    <Route path="blog" element={
                        <Suspense fallback={<PageLoader />}>
                            <BlogList />
                        </Suspense>
                    } />
                    <Route path="blog/excel-data-analysis-guide" element={
                        <Suspense fallback={<PageLoader />}>
                            <ExcelDataAnalysisGuide />
                        </Suspense>
                    } />
                    <Route path="blog/correlation-analysis" element={
                        <Suspense fallback={<PageLoader />}>
                            <CorrelationAnalysis />
                        </Suspense>
                    } />
                    <Route path="blog/ai-data-analysis" element={
                        <Suspense fallback={<PageLoader />}>
                            <AIDataAnalysis />
                        </Suspense>
                    } />
                    <Route path="blog/csv-vs-excel" element={
                        <Suspense fallback={<PageLoader />}>
                            <CsvVsExcel />
                        </Suspense>
                    } />
                    <Route path="blog/data-visualization-best-practices" element={
                        <Suspense fallback={<PageLoader />}>
                            <DataVisualizationBestPractices />
                        </Suspense>
                    } />
                    <Route path="blog/sales-data-analysis" element={
                        <Suspense fallback={<PageLoader />}>
                            <SalesDataAnalysis />
                        </Suspense>
                    } />

                    {/* Tutorial routes with Suspense */}
                    <Route path="tutorials" element={
                        <Suspense fallback={<PageLoader />}>
                            <TutorialList />
                        </Suspense>
                    } />
                    <Route path="tutorials/getting-started" element={
                        <Suspense fallback={<PageLoader />}>
                            <GettingStarted />
                        </Suspense>
                    } />
                    <Route path="tutorials/advanced-features" element={
                        <Suspense fallback={<PageLoader />}>
                            <AdvancedFeatures />
                        </Suspense>
                    } />
                    <Route path="tutorials/correlation-matrix" element={
                        <Suspense fallback={<PageLoader />}>
                            <CorrelationTutorial />
                        </Suspense>
                    } />
                    <Route path="tutorials/data-transformation" element={
                        <Suspense fallback={<PageLoader />}>
                            <DataTransformationGuide />
                        </Suspense>
                    } />
                    <Route path="tutorials/tips-and-tricks" element={
                        <Suspense fallback={<PageLoader />}>
                            <TipsAndTricks />
                        </Suspense>
                    } />

                    {/* Legal pages with Suspense */}
                    <Route path="privacy-policy" element={
                        <Suspense fallback={<PageLoader />}>
                            <PrivacyPolicy />
                        </Suspense>
                    } />
                    <Route path="terms-of-service" element={
                        <Suspense fallback={<PageLoader />}>
                            <TermsOfService />
                        </Suspense>
                    } />
                    <Route path="*" element={
                        <Suspense fallback={<PageLoader />}>
                            <NotFound />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
