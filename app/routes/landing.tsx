import { useNavigate } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import image from '../../src/img.avif'

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

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
        title: 'Company Profile',
        desc: 'Explore detailed company pages and learn about our culture.'
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
    
    // Refs for navbar elements
    const navbarRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLSpanElement>(null);
    const navLinksRef = useRef<HTMLDivElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);
    
    // Initialize GSAP animations
    useEffect(() => {
        // Initial animation for navbar elements
        gsap.set([logoRef.current, navLinksRef.current, loginBtnRef.current], { 
            opacity: 0, 
            y: -20 
        });
        
        // Stagger animation for navbar elements - faster
        gsap.to([logoRef.current, navLinksRef.current, loginBtnRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.4, // Reduced from 0.8
            stagger: 0.1, // Reduced from 0.2
            ease: "back.out(1.7)"
        });
        
        // Add hover animations to nav links - faster
        const navLinks = navLinksRef.current?.querySelectorAll('a');
        if (navLinks) {
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.05,
                        y: -2,
                        duration: 0.15, // Reduced from 0.3
                        ease: "back.out(1.7)"
                    });
                });
                
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        y: 0,
                        duration: 0.15, // Reduced from 0.3
                        ease: "power2.out"
                    });
                });
            });
        }
        
        // Add hover animation to logo - faster
        if (logoRef.current) {
            logoRef.current.addEventListener('mouseenter', () => {
                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 0.15, // Reduced from 0.3
                    ease: "back.out(1.7)"
                });
            });
            
            logoRef.current.addEventListener('mouseleave', () => {
                gsap.to(logoRef.current, {
                    scale: 1,
                    duration: 0.15, // Reduced from 0.3
                    ease: "power2.out"
                });
            });
            
            // Add click animation to logo - faster
            logoRef.current.addEventListener('click', () => {
                gsap.to(logoRef.current, {
                    scale: 0.9,
                    duration: 0.08, // Reduced from 0.1
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            });
        }
        
        // Add hover animation to login button - faster
        if (loginBtnRef.current) {
            loginBtnRef.current.addEventListener('mouseenter', () => {
                gsap.to(loginBtnRef.current, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.15, // Reduced from 0.3
                    ease: "back.out(1.7)"
                });
            });
            
            loginBtnRef.current.addEventListener('mouseleave', () => {
                gsap.to(loginBtnRef.current, {
                    scale: 1,
                    y: 0,
                    duration: 0.15, // Reduced from 0.3
                    ease: "power2.out"
                });
            });
            
            // Add click animation to login button - faster
            loginBtnRef.current.addEventListener('click', () => {
                gsap.to(loginBtnRef.current, {
                    scale: 0.9,
                    duration: 0.08, // Reduced from 0.1
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            });
        }
        
        // Cleanup function
        return () => {
            if (navLinks) {
                navLinks.forEach(link => {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                });
            }
            if (logoRef.current) {
                logoRef.current.removeEventListener('mouseenter', () => {});
                logoRef.current.removeEventListener('mouseleave', () => {});
                logoRef.current.removeEventListener('click', () => {});
            }
            if (loginBtnRef.current) {
                loginBtnRef.current.removeEventListener('mouseenter', () => {});
                loginBtnRef.current.removeEventListener('mouseleave', () => {});
                loginBtnRef.current.removeEventListener('click', () => {});
            }
        };
    }, []);
    
    // Animate mobile menu - faster
    useEffect(() => {
        const mobileMenu = document.querySelector('.mobile-menu-dropdown');
        if (mobileMenu) {
            if (mobileMenuOpen) {
                gsap.fromTo(mobileMenu, 
                    { 
                        opacity: 0, 
                        y: -20,
                        scale: 0.95
                    },
                    { 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                        duration: 0.25, // Reduced from 0.4
                        ease: "back.out(1.7)"
                    }
                );
            } else {
                gsap.to(mobileMenu, {
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    duration: 0.2, // Reduced from 0.3
                    ease: "power2.in"
                });
            }
        }
    }, [mobileMenuOpen]);
    
    // Function to handle smooth scroll with animation - faster
    const handleSmoothScroll = (targetId: string) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            gsap.to(window, {
                duration: 0.8, // Reduced from 1.5
                scrollTo: { y: targetElement, offsetY: 80 },
                ease: "power2.inOut"
            });
        }
    };
    
    // Function to handle navbar link click with animation - faster ripple
    const handleNavLinkClick = (targetId: string) => {
        // Add click animation with ripple effect
        const clickedLink = document.querySelector(`[href="#${targetId}"]`) as HTMLElement;
        if (clickedLink) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(59, 130, 246, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.4s linear'; // Reduced from 0.6s
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            // Add ripple styles to document
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            clickedLink.style.position = 'relative';
            clickedLink.appendChild(ripple);
            
            // Remove ripple after animation - faster
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 400); // Reduced from 600
            
            // Scale animation - faster
            gsap.to(clickedLink, {
                scale: 0.95,
                duration: 0.08, // Reduced from 0.1
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        }
        
        // Smooth scroll to target
        handleSmoothScroll(targetId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Navbar */}
            <nav ref={navbarRef} className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                    <span 
                        ref={logoRef}
                        className="text-2xl font-bold text-blue-800 tracking-tight cursor-pointer" 
                        onClick={() => navigate('/')}
                    >
                        EzooHire
                    </span>
                    {/* Desktop Nav */}
                    <div ref={navLinksRef} className="hidden md:flex items-center space-x-8">
                        <a 
                            href="#" 
                            className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); handleNavLinkClick('hero'); }}
                        >
                            Home
                        </a>
                        <a 
                            href="#how-it-works" 
                            className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); handleNavLinkClick('how-it-works'); }}
                        >
                            How it works
                        </a>
                        <a 
                            href="#features" 
                            className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); handleNavLinkClick('features'); }}
                        >
                            Features
                        </a>
                        <a 
                            href="#contact" 
                            className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); handleNavLinkClick('contact'); }}
                        >
                            Contact
                        </a>
                        <button
                            ref={loginBtnRef}
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
                    <div className="mobile-menu-dropdown md:hidden bg-white shadow-lg border-t border-blue-100">
                        <div className="flex flex-col items-center space-y-4 py-6">
                            <a 
                                href="#" 
                                className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" 
                                onClick={() => { setMobileMenuOpen(false); handleNavLinkClick('hero'); }}
                            >
                                Home
                            </a>
                            <a 
                                href="#features" 
                                className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" 
                                onClick={() => { setMobileMenuOpen(false); handleNavLinkClick('features'); }}
                            >
                                Features
                            </a>
                            <a 
                                href="#contact" 
                                className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer" 
                                onClick={() => { setMobileMenuOpen(false); handleNavLinkClick('contact'); }}
                            >
                                Contact
                            </a>
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
            <section id="hero" className="flex-1 flex flex-col justify-center items-center px-4 pt-40 pb-32 relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-60 -z-10 blur-2xl" style={{ top: '-4rem', left: '-4rem' }}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-50 -z-10 blur-2xl" style={{ bottom: '-6rem', right: '-6rem' }}></div>
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Text Content */}
                    <div className="flex-1 text-center md:text-left relative">
                        <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-1 rounded-full mb-4 text-sm shadow"># Job Platform for Students & Expert</span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-sm relative z-10">
                            Find Your <span className="text-blue-600">Dream</span> Job Today
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-700 mb-8 max-w-xl relative z-10">
                            Discover thousands of opportunities, connect with us, and launch your career with EzooHire.
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
            {/* Why You Need EzooHire Section */}
            <section className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 pb-20 pt-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12">Why You Need EzooHire</h2>
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
            {/* How It Works Section */}
            <section id="how-it-works" className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 pb-28 pt-15 mt-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 ">How It Works</h2>
                <div className="relative w-full mt-10">
                    {/* Horizontal connector (desktop) */}
                    <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 rounded-full" />
                    {/* Vertical connector (mobile) */}
                    <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 rounded-full" />

                    <ol className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 w-full">
                        <li className="relative flex md:flex-col items-start md:items-center">
                            <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping" />
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">1</div>
                            </div>
                            <div className="ml-4 md:ml-0 md:mt-8 text-left md:text-center">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Create an Account</h3>
                                <p className="text-blue-700 text-base">Sign up as a student or a company in seconds.</p>
                            </div>
                        </li>

                        <li className="relative flex md:flex-col items-start md:items-center">
                            <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping" />
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">2</div>
                            </div>
                            <div className="ml-4 md:ml-0 md:mt-8 text-left md:text-center">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Build Your Profile</h3>
                                <p className="text-blue-700 text-base">Add your details, skills, and preferences (or company info).</p>
                            </div>
                        </li>

                        <li className="relative flex md:flex-col items-start md:items-center">
                            <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping" />
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">3</div>
                            </div>
                            <div className="ml-4 md:ml-0 md:mt-8 text-left md:text-center">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Discover & Post</h3>
                                <p className="text-blue-700 text-base">Students browse and apply to jobs. Companie[] post offers.</p>
                            </div>
                        </li>

                        <li className="relative flex md:flex-col items-start md:items-center">
                            <div className="relative">
                                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping" />
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">4</div>
                            </div>
                            <div className="ml-4 md:ml-0 md:mt-8 text-left md:text-center">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Track & Connect</h3>
                                <p className="text-blue-700 text-base">Track applications, manage candidates, and stay updated.</p>
                            </div>
                        </li>
                    </ol>
                </div>

            </section>
            {/* Website Features Section */}
            <section id="features" className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 pb-28 pt-24  mt-5">
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
            {/* <section id="pricing" className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 pt-12 pb-24">
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
            </section> */}
            {/* Get in Touch Section */}
            <section id="contact" className="w-full max-w-2xl mx-auto flex flex-col items-center px-4 pt-12 pb-20  mt-5">
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
                        <span className="text-2xl font-bold text-blue-800">EzooHire</span>
                        <span className="text-blue-400 text-xl">•</span>
                        <span className="text-sm text-blue-600">&copy; {new Date().getFullYear()} All rights reserved.</span>
                    </div>
                    <nav className="flex space-x-6 text-blue-700 text-sm font-medium">
                        <a href="#" className="hover:text-blue-900 transition-colors">Home</a>
                        <a href="#features" className="hover:text-blue-900 transition-colors">Features</a>
                        {/* <a href="#pricing" className="hover:text-blue-900 transition-colors">Pricing</a> */}
                        <a href="#contact" className="hover:text-blue-900 transition-colors">Contact</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
} 