import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import ExcelDataAnalysisGuide from './pages/blog/excel-data-analysis-guide';
import CorrelationAnalysis from './pages/blog/CorrelationAnalysis';
import AIDataAnalysis from './pages/blog/AIDataAnalysis';
import CsvVsExcel from './pages/blog/CsvVsExcel';
import DataVisualizationBestPractices from './pages/blog/DataVisualizationBestPractices';
import SalesDataAnalysis from './pages/blog/SalesDataAnalysis';
import TutorialList from './pages/TutorialList';
import GettingStarted from './pages/tutorials/GettingStarted';
import AdvancedFeatures from './pages/tutorials/AdvancedFeatures';
import CorrelationTutorial from './pages/tutorials/CorrelationTutorial';
import DataTransformationGuide from './pages/tutorials/DataTransformationGuide';
import TipsAndTricks from './pages/tutorials/TipsAndTricks';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="workspace" element={<Workspace />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/excel-data-analysis-guide" element={<ExcelDataAnalysisGuide />} />
                    <Route path="blog/correlation-analysis" element={<CorrelationAnalysis />} />
                    <Route path="blog/ai-data-analysis" element={<AIDataAnalysis />} />
                    <Route path="blog/csv-vs-excel" element={<CsvVsExcel />} />
                    <Route path="blog/data-visualization-best-practices" element={<DataVisualizationBestPractices />} />
                    <Route path="blog/sales-data-analysis" element={<SalesDataAnalysis />} />
                    <Route path="tutorials" element={<TutorialList />} />
                    <Route path="tutorials/getting-started" element={<GettingStarted />} />
                    <Route path="tutorials/advanced-features" element={<AdvancedFeatures />} />
                    <Route path="tutorials/correlation-matrix" element={<CorrelationTutorial />} />
                    <Route path="tutorials/data-transformation" element={<DataTransformationGuide />} />
                    <Route path="tutorials/tips-and-tricks" element={<TipsAndTricks />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-of-service" element={<TermsOfService />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
