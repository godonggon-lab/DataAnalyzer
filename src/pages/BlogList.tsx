import { Link } from 'react-router-dom';

interface BlogPost {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 'excel-data-analysis-guide',
        title: 'Excel 데이터 분석 완벽 가이드',
        description: 'Excel을 활용한 데이터 분석의 기초부터 고급 기법까지 완벽하게 마스터하세요.',
        category: '데이터 분석 기초',
        date: '2025-12-01',
        readTime: '10 min',
    },
    {
        id: 'csv-vs-excel',
        title: 'CSV vs Excel: 어떤 형식을 선택해야 할까?',
        description: 'CSV와 Excel 파일 형식의 차이점과 각각의 장단점을 비교 분석합니다.',
        category: '데이터 분석 기초',
        date: '2025-11-28',
        readTime: '8 min',
    },
    {
        id: 'data-visualization-best-practices',
        title: '데이터 시각화 모범 사례 10가지',
        description: '효과적인 데이터 시각화를 위한 핵심 원칙과 실전 팁을 소개합니다.',
        category: '데이터 시각화',
        date: '2025-11-25',
        readTime: '12 min',
    },
    {
        id: 'sales-data-analysis',
        title: '판매 데이터 분석 실전 예제',
        description: '실제 판매 데이터를 활용한 분석 프로세스와 인사이트 도출 방법을 배웁니다.',
        category: '실전 활용',
        date: '2025-11-22',
        readTime: '15 min',
    },
];

const BlogList = () => {
    const categories = ['전체', '데이터 분석 기초', '데이터 시각화', '실전 활용'];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
                <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                    데이터 분석과 시각화에 대한 인사이트, 팁, 그리고 실전 가이드
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-400 mb-2">{blogPosts.length}</div>
                    <div className="text-dark-400 text-sm">Published Articles</div>
                </div>
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-400 mb-2">{categories.length - 1}</div>
                    <div className="text-dark-400 text-sm">Categories</div>
                </div>
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-dark-700 text-center">
                    <div className="text-3xl font-bold text-primary-400 mb-2">Weekly</div>
                    <div className="text-dark-400 text-sm">New Content</div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-lg transition-colors ${category === '전체'
                                ? 'bg-primary-500 text-white'
                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700 hover:border-primary-500 transition-all group"
                    >
                        {/* Category Badge */}
                        <div className="mb-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-primary-500/20 text-primary-400">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                            {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-dark-300 mb-4 line-clamp-2">
                            {post.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-dark-400 text-sm">
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(post.date).toLocaleDateString('ko-KR')}
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.readTime}
                                </span>
                            </div>
                            <div className="flex items-center text-primary-400 group-hover:translate-x-2 transition-transform">
                                <span className="mr-1">Read More</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                <p className="text-dark-300 mb-6">
                    새로운 블로그 포스트와 데이터 분석 팁을 받아보세요
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/tutorials"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        Tutorials 보기
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
