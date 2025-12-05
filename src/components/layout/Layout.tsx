import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-white transition-colors duration-300">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
