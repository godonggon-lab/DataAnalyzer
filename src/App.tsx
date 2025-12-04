import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import ExcelDataAnalysisGuide from './pages/blog/excel-data-analysis-guide';
import TutorialList from './pages/TutorialList';
import GettingStarted from './pages/tutorials/GettingStarted';
import AdvancedFeatures from './pages/tutorials/AdvancedFeatures';
import TipsAndTricks from './pages/tutorials/TipsAndTricks';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter basename="/DataAnalyzer">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/excel-data-analysis-guide" element={<ExcelDataAnalysisGuide />} />
                    <Route path="tutorials" element={<TutorialList />} />
                    <Route path="tutorials/getting-started" element={<GettingStarted />} />
                    <Route path="tutorials/advanced-features" element={<AdvancedFeatures />} />
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

