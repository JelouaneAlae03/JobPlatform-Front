import { useNavigate } from 'react-router';
import { useState } from 'react';
import image from '../../src/img.avif'
const websiteFeatures = [
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z" /></svg>
        ),
        title: 'Personalized Job Matches',
        desc: 'Get job recommendations tailored to your skills and interests.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        ),
        title: 'One-Click Apply',
        desc: 'Apply to jobs instantly with a single click.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5" /></svg>
        ),
        title: 'Save Jobs',
        desc: 'Bookmark jobs to review and apply later.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5" /></svg>
        ),
        title: 'Company Profiles',
        desc: 'Explore detailed company pages and learn about their culture.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5" /></svg>
        ),
        title: 'Application Tracking',
        desc: 'Track your job applications and get real-time updates.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><circle cx="12" cy="7" r="4" /></svg>
        ),
        title: 'Secure Messaging',
        desc: 'Communicate safely with companies and recruiters.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
        ),
        title: 'Advanced Search',
        desc: 'Use filters to find the perfect job or candidate.'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8v8H8z" /></svg>
        ),
        title: 'Resume Management',
        desc: 'Upload and manage your CV or resume easily.'
    },
];

// const features = [

// ];

export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-800 tracking-tight cursor-pointer" onClick={() => navigate('/')}>JobPlatform</span>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer">Home</a>
                        <a href="#features" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer">Features</a>
                        <a href="#pricing" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer">Pricing</a>
                        <a href="#contact" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer">Contact</a>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-colors text-base cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
                        )}
                    </button>
                </div>
                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg border-t border-blue-100">
                        <div className="flex flex-col items-center space-y-4 py-6">
                            <a href="#" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>Home</a>
                            <a href="#features" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>Features</a>
                            <a href="#pricing" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                            <a href="#contact" className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                            <button
                                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow-sm transition-colors text-base cursor-pointer"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </nav>
            {/* Hero Section - Redesigned */}
            <section className="flex-1 flex flex-col justify-center items-center px-4 pt-40 pb-32 relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-60 -z-10 blur-2xl" style={{ top: '-4rem', left: '-4rem' }}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-50 -z-10 blur-2xl" style={{ bottom: '-6rem', right: '-6rem' }}></div>
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Text Content */}
                    <div className="flex-1 text-center md:text-left relative">
                        <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-1 rounded-full mb-4 text-sm shadow">#1 Job Platform for Students & Companies</span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-sm relative z-10">
                            Find Your <span className="text-blue-600">Dream</span> Job Today
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-700 mb-8 max-w-xl relative z-10">
                            Discover thousands of opportunities, connect with top companies, and launch your career with JobPlatform.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-colors text-lg relative z-10 cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>
                    {/* Right: Job Image */}
                    <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
                        <img
                            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
                            alt="Professional vertical job search illustration"
                            className="w-full max-w-md h-auto rounded-xl shadow-lg object-cover"
                            style={{ filter: 'blur(0.5px)', opacity: 0.95 }}
                        />
                    </div>
                </div>
            </section>
            {/* Why You Need JobPlatform Section */}
            <section className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 pb-20 pt-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12">Why You Need JobPlatform</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow flex flex-col items-center">
                        <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z" /></svg>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Save Time & Effort</h3>
                        <p className="text-blue-700 text-base">No more endless searching. Instantly find jobs or candidates that match your needs.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow flex flex-col items-center">
                        <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0v-4" /></svg>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Connect & Grow</h3>
                        <p className="text-blue-700 text-base">Build your network, connect with top companies or talented students, and grow your career or business.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow flex flex-col items-center">
                        <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Trusted & Secure</h3>
                        <p className="text-blue-700 text-base">Your data and privacy are protected. Join a trusted platform used by thousands.</p>
                    </div>
                </div>
            </section>
            {/* Website Features Section */}
            <section id="features" className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 pb-28 pt-24">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12">Website Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
                    {websiteFeatures.map((f, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center min-h-[220px] justify-center"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100">
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-blue-800 mb-3">{f.title}</h3>
                            <p className="text-blue-700 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Pricing Section */}
            <section id="pricing" className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 pt-12 pb-24">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12">Our Web Hosting Plan</h2>
                <div className="w-full flex justify-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl shadow-xl p-12 flex flex-col items-center text-center max-w-md w-full hover:shadow-2xl transition-shadow">
                        <span className="inline-block bg-blue-200 text-blue-800 font-semibold px-5 py-1 rounded-full mb-6 text-base tracking-wide">Free Plan</span>
                        <div className="flex items-end mb-2">
                            <span className="text-5xl font-extrabold text-blue-900">$0</span>
                            <span className="text-blue-700 ml-2 mb-1 text-lg font-medium">/ forever</span>
                        </div>
                        <div className="text-blue-700 mb-8 text-base">No hidden fees. No credit card required.</div>
                        <ul className="text-blue-800 text-left mb-10 space-y-3 w-full max-w-xs mx-auto divide-y divide-blue-100">
                            <li className="flex items-center pt-3 first:pt-0"><svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Unlimited job applications</li>
                            <li className="flex items-center pt-3"><svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Unlimited job postings</li>
                            <li className="flex items-center pt-3"><svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>All platform features included</li>
                            <li className="flex items-center pt-3"><svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Priority support</li>
                        </ul>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition-colors text-lg mt-2 cursor-pointer">Get Started Free</button>
                    </div>
                </div>
            </section>
            {/* Get in Touch Section */}
            <section id="contact" className="w-full max-w-2xl mx-auto flex flex-col items-center px-4 pt-12 pb-20">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-8">Get in Touch</h2>
                <p className="text-blue-700 mb-8 text-center max-w-md">Have questions, feedback, or want to partner with us? Fill out the form below and our team will get back to you soon!</p>
                <form className="w-full flex flex-col gap-8">
                    <input type="text" placeholder="Your Name" className="border-0 border-b-2 border-blue-200 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-500 transition-colors text-lg" />
                    <input type="email" placeholder="Your Email" className="border-0 border-b-2 border-blue-200 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-500 transition-colors text-lg" />
                    <textarea placeholder="Your Message" rows={4} className="border-0 border-b-2 border-blue-200 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-500 transition-colors text-lg resize-none" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors text-lg mt-2 cursor-pointer">Send Message</button>
                </form>
            </section>
            {/* Footer */}
            <footer className="w-full bg-white border-t border-blue-100 py-8 mt-8">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-800">JobPlatform</span>
                        <span className="text-blue-400 text-xl">•</span>
                        <span className="text-sm text-blue-600">&copy; {new Date().getFullYear()} All rights reserved.</span>
                    </div>
                    <nav className="flex space-x-6 text-blue-700 text-sm font-medium">
                        <a href="#" className="hover:text-blue-900 transition-colors">Home</a>
                        <a href="#features" className="hover:text-blue-900 transition-colors">Features</a>
                        <a href="#pricing" className="hover:text-blue-900 transition-colors">Pricing</a>
                        <a href="#contact" className="hover:text-blue-900 transition-colors">Contact</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
} 