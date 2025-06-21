import { useNavigate } from 'react-router';
import { AcademicCapIcon, BriefcaseIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
    const navigate = useNavigate();

    // Smooth scroll to section
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="text-2xl font-extrabold text-blue-700">JobPlatform</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button onClick={() => scrollToSection('features')} className="text-blue-900 hover:text-blue-600 font-medium transition-colors">Features</button>
                        <button onClick={() => scrollToSection('students')} className="text-blue-900 hover:text-blue-600 font-medium transition-colors">For Students</button>
                        <button onClick={() => scrollToSection('companies')} className="text-blue-900 hover:text-blue-600 font-medium transition-colors">For Companies</button>
                        <button onClick={() => navigate('/login')} className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors">Login</button>
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-16 max-w-7xl mx-auto w-full">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-4">
                        Unlock Your Future with <span className="text-blue-600">JobPlatform</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-700 mb-8 max-w-xl">
                        The easiest way for students and companies to connect, grow, and succeed. Discover jobs, manage applications, and build your career—all in one place.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl shadow-lg text-lg transition-colors"
                    >
                        Get Started
                    </button>
                </div>
                {/* Hero Image */}
                <div className="flex-1 flex justify-center mt-12 md:mt-0">
                    <img
                        src="https://undraw.co/api/illustrations/undraw_career_progress_ivdb.svg"
                        alt="Job search illustration"
                        className="w-full max-w-md h-auto drop-shadow-xl"
                        loading="lazy"
                    />
                </div>
            </div>
            {/* Features Section */}
            <section id="features" className="py-16 bg-white w-full">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
                    <div id="students" className="flex flex-col items-center text-center">
                        <AcademicCapIcon className="h-12 w-12 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-blue-900 mb-2">For Students</h3>
                        <p className="text-blue-700">Browse jobs, save favorites, and apply easily. Build your profile and get noticed by top companies.</p>
                    </div>
                    <div id="companies" className="flex flex-col items-center text-center">
                        <BriefcaseIcon className="h-12 w-12 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-blue-900 mb-2">For Companies</h3>
                        <p className="text-blue-700">Post job offers, search student profiles, and manage applications with powerful tools.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <SparklesIcon className="h-12 w-12 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Success Stories</h3>
                        <p className="text-blue-700">See how JobPlatform has helped students and companies connect and grow together.</p>
                    </div>
                </div>
            </section>
            <footer className="text-blue-600 text-sm opacity-80 text-center py-6">&copy; {new Date().getFullYear()} JobPlatform. All rights reserved.</footer>
        </div>
    );
} 