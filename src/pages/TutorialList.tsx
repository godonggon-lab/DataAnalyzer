import { Link } from 'react-router-dom';

const tutorials = [
    {
        id: 'getting-started',
        title: 'Getting Started with DataAnalyzer',
        description: 'Learn the basics of uploading data, creating charts, and exploring your datasets.',
        difficulty: 'Beginner',
        duration: '10 min',
        category: 'Basics',
        icon: '🚀',
    },
    {
        id: 'advanced-features',
        title: 'Advanced Features Guide',
        description: 'Master advanced features like multi-axis charts, BoxPlots, and large dataset handling.',
        difficulty: 'Advanced',
        duration: '15 min',
        category: 'Advanced',
        icon: '⚡',
    },
    {
        id: 'tips-and-tricks',
        title: 'Tips and Tricks',
        description: 'Discover hidden features, keyboard shortcuts, and best practices for data visualization.',
        difficulty: 'Intermediate',
        duration: '12 min',
        category: 'Tips',
        icon: '💡',
    },
];

const TutorialList = () => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'text-green-400 bg-green-500/20';
            case 'Intermediate':
                return 'text-yellow-400 bg-yellow-500/20';
            case 'Advanced':
                return 'text-red-400 bg-red-500/20';
            default:
                return 'text-gray-400 bg-gray-500/20';
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Tutorials</h1>
                <p className="text-xl text-slate-600 dark:text-dark-300 max-w-2xl mx-auto">
                    Step-by-step guides to help you master DataAnalyzer and make the most of your data analysis
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-2">{tutorials.length}</div>
                    <div className="text-slate-500 dark:text-dark-400 text-sm">Tutorials Available</div>
                </div>
                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-2">37 min</div>
                    <div className="text-slate-500 dark:text-dark-400 text-sm">Total Learning Time</div>
                </div>
                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-2">100%</div>
                    <div className="text-slate-500 dark:text-dark-400 text-sm">Free Content</div>
                </div>
            </div>

            {/* Tutorial Cards */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial) => (
                        <Link
                            key={tutorial.id}
                            to={`/tutorials/${tutorial.id}`}
                            className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 hover:border-primary-500 transition-all group"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4">{tutorial.icon}</div>

                            {/* Category & Difficulty */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs px-2 py-1 rounded bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400">
                                    {tutorial.category}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(tutorial.difficulty)}`}>
                                    {tutorial.difficulty}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                                {tutorial.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-600 dark:text-dark-300 text-sm mb-4 line-clamp-2">
                                {tutorial.description}
                            </p>

                            {/* Duration */}
                            <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {tutorial.duration}
                            </div>

                            {/* Arrow */}
                            <div className="mt-4 flex items-center text-primary-400 text-sm group-hover:translate-x-2 transition-transform">
                                <span>Start Tutorial</span>
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Need More Help?</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    Can't find what you're looking for? Check out our FAQ or contact us directly.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/contact"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="/blog"
                        className="px-6 py-3 bg-slate-200 dark:bg-dark-700 hover:bg-slate-300 dark:hover:bg-dark-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                    >
                        Read Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorialList;
