import React, { useState, useEffect } from 'react';
import { 
  Code2, Smartphone, Plug, CreditCard, Bot, 
  Mail, Instagram, ArrowRight, Menu, X, 
  ChevronRight, Activity, ShieldCheck, CheckCircle2,
  Database, Globe, Cpu, Layers, Zap, Users, ArrowUp, Send, Briefcase,
  Sun, Moon
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Apply Theme to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Enhanced Services Data with Details for Modal
  const services = [
    { icon: <Code2 />, title: "Web & SaaS Development", desc: "Custom platforms, e-commerce engines, and high-performance booking systems.", details: ["Custom SaaS architecture design", "E-commerce platforms with payment gateways", "High-performance booking & reservation systems", "Progressive Web Apps (PWA)", "Scalable multi-tenant architectures"], span: "lg:col-span-2" },
    { icon: <Smartphone />, title: "Mobile Applications", desc: "Cross-platform iOS & Android apps built for performance and user retention.", details: ["React Native & Flutter development", "Native iOS & Android features", "Push notifications & deep linking", "Offline-first data synchronization", "App Store & Play Store deployment"], span: "lg:col-span-1" },
    { icon: <Plug />, title: "API & Systems Integration", desc: "Unified pipelines connecting your CRMs, databases, and third-party tools.", details: ["RESTful & GraphQL API development", "Third-party API integrations (Stripe, Twilio, etc.)", "CRM synchronization (HubSpot, Salesforce)", "Webhook management & event-driven architecture", "Legacy system modernization"], span: "lg:col-span-1" },
    { icon: <CreditCard />, title: "POS & Custom ERPs", desc: "Multi-branch management systems with real-time inventory synchronization.", details: ["Point of Sale (POS) terminal software", "Real-time multi-branch inventory sync", "Custom Enterprise Resource Planning (ERP)", "Barcode scanning & receipt printing", "Financial reporting & analytics dashboards"], span: "lg:col-span-1" },
    { icon: <Bot />, title: "AI Automation & Agents", desc: "Intelligent document processing, custom RAG search, and automated workflows.", details: ["Custom AI agents & chatbots", "Retrieval-Augmented Generation (RAG) systems", "Intelligent document processing (IDP)", "Workflow automation & task orchestration", "LLM fine-tuning & API integration"], span: "lg:col-span-2" }
  ];

  const techStack = ["React", "Node.js", "PostgreSQL", "Express", "TypeScript", "Tailwind CSS", "AWS", "Docker", "React Native", "Python", "OpenAI", "GraphQL"];

  const processSteps = [
    { icon: <Globe />, title: "Discover", desc: "We analyze your business needs and define the project scope." },
    { icon: <Layers />, title: "Design", desc: "We create wireframes, UI/UX designs, and system architecture." },
    { icon: <Cpu />, title: "Develop", desc: "Our team builds your solution using modern, scalable technologies." },
    { icon: <Zap />, title: "Deploy", desc: "We launch, monitor, and provide ongoing support for your system." }
  ];

  const faqs = [
    { q: "What technologies do you use?", a: "Our main focus is on the PERN stack—PostgreSQL, Express, React, and Node.js—for custom full-stack web applications. We also specialize in WordPress for clean, flexible content management and site builds." },
    { q: "How long does a typical project take?", a: "Most of our projects are completed within 1 to 3 weeks, though exact timelines depend on the scope and our current queue of orders." },
    { q: "Do you provide ongoing support?", a: "Yes, we offer ongoing support and maintenance after delivery to keep everything running smoothly." },
    { q: "Can you integrate with our existing systems?", a: "Absolutely. We have extensive experience connecting new web applications with legacy CRMs, databases, and third-party APIs." }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-cyan selection:text-white dark:selection:text-brand-black relative">
      
      {/* Global Background Grid & Glows */}
      <div className="fixed inset-0 bg-grid opacity-50 dark:opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/10 dark:bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 dark:bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 glass border-b border-slate-200 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-20 md:h-24">
            
            <a href="#home" className="absolute left-4 md:left-0 flex-shrink-0 cursor-pointer group flex items-center">
              <img src="/nexwave.png" alt="Nex Wave" className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'Process', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="relative text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex absolute right-0 items-center gap-4">
              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2.5 rounded-full glass text-slate-600 hover:text-brand-blue dark:text-gray-300 dark:hover:text-brand-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan" aria-label="Toggle Theme">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <a href="#contact" className="relative overflow-hidden bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
                Let's Talk
              </a>
            </div>

            <div className="md:hidden absolute right-4 flex items-center gap-3">
              <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-gray-300">
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-gray-300 hover:text-brand-cyan transition-colors p-2 focus-visible:outline-none">
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="px-4 pt-4 pb-8 space-y-2">
            {['Home', 'Services', 'Process', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block mt-4 text-center bg-slate-900 dark:bg-gradient-to-r dark:from-brand-cyan dark:to-brand-blue text-white px-4 py-3 rounded-xl font-bold dark:shadow-glow">
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-slate-200 dark:border-white/10 text-brand-blue dark:text-brand-cyan text-xs font-medium mb-6">
                <Users className="w-3.5 h-3.5" />
                <span>Trusted by 50+ innovative startups</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6 text-slate-900 dark:text-white">
                Ride the Next <br />
                Wave of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">Innovation</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From high-performance SaaS platforms to intelligent AI automations, we build the systems that power your business growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a href="#services" className="group relative overflow-hidden bg-gradient-to-r from-brand-cyan to-brand-blue text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
                  <span className="relative z-10 flex items-center gap-2">Explore Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                </a>
                <a href="#contact" className="glass text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Right Content - Mockup */}
            <div className="relative hidden lg:block animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-cyan rounded-3xl blur-3xl opacity-10 dark:opacity-20 animate-pulse"></div>
              <div className="glass rounded-3xl p-6 relative z-10 border-slate-200 dark:border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-1/3 bg-slate-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-2 w-full bg-slate-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-slate-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="glass p-4 rounded-xl border-slate-200 dark:border-white/5">
                      <div className="h-2 w-1/2 bg-brand-cyan/50 rounded-full mb-2"></div>
                      <div className="h-6 w-3/4 bg-brand-cyan/80 rounded-md"></div>
                    </div>
                    <div className="glass p-4 rounded-xl border-slate-200 dark:border-white/5">
                      <div className="h-2 w-1/2 bg-brand-blue/50 rounded-full mb-2"></div>
                      <div className="h-6 w-3/4 bg-brand-blue/80 rounded-md"></div>
                    </div>
                  </div>
                  <div className="h-32 w-full bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 dark:from-brand-blue/20 dark:to-brand-cyan/20 rounded-xl mt-4 border border-slate-200 dark:border-white/5"></div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 glass p-4 rounded-2xl border-slate-200 dark:border-white/10 shadow-glow animate-float-delayed z-20">
                <ShieldCheck className="w-8 h-8 text-brand-blue dark:text-brand-cyan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="py-10 border-y border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-brand-dark/30 relative z-10 overflow-hidden mask-fade">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="mx-8 flex items-center gap-2 text-slate-600 dark:text-gray-300 font-medium text-lg">
              <div className="w-2 h-2 rounded-full bg-brand-cyan/50"></div>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Our Core Capabilities</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              We deliver end-to-end technology solutions tailored to your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`glass bg-white dark:bg-gradient-to-b dark:from-white/[0.05] dark:to-transparent rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] dark:hover:shadow-glow-cyan hover:border-brand-cyan/50 dark:hover:border-brand-cyan/30 group relative overflow-hidden flex flex-col ${service.span}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-brand-cyan/0 to-brand-blue/0 dark:from-brand-cyan/0 dark:via-brand-cyan/5 dark:to-brand-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-blue/10 dark:group-hover:bg-brand-blue/20 group-hover:border-brand-cyan/50 transition-all duration-500 shadow-inner relative z-10">
                  <div className="text-brand-blue dark:text-brand-cyan group-hover:text-brand-blue dark:group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(service.icon, { className: "w-8 h-8" })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 tracking-tight text-slate-900 dark:text-white">{service.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed relative z-10 flex-grow">{service.desc}</p>
                <button onClick={() => setSelectedService(service)} className="mt-8 flex items-center gap-2 text-brand-blue dark:text-brand-cyan font-semibold transition-all duration-300 relative z-10 hover:text-brand-cyan dark:hover:text-white group/btn focus-visible:outline-none">
                  Learn More <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            ))}
            <div className="bg-gradient-to-br from-brand-blue to-brand-cyan rounded-3xl p-8 flex flex-col justify-center items-start shadow-glow hover:shadow-glow-hover transition-all duration-500 hover:-translate-y-3 relative overflow-hidden group lg:col-span-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 mb-6 lg:mb-0">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Ready to start?</h3>
                <p className="text-white/80 text-lg">Let's discuss how we can bring your project to life.</p>
              </div>
              <a href="#contact" className="bg-white text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 relative z-10 shadow-lg focus-visible:outline-none">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-32 relative z-10 bg-slate-100/50 dark:bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">How We Work</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Our proven process ensures your project is delivered on time and exceeds expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="glass p-8 rounded-3xl relative group hover:bg-white dark:hover:bg-white/10 transition-all duration-500 hover:shadow-soft-light dark:hover:shadow-none">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-white dark:bg-brand-black border border-brand-cyan/50 flex items-center justify-center text-brand-blue dark:text-brand-cyan font-bold text-xl shadow-sm dark:shadow-glow z-10">
                  {index + 1}
                </div>
                <div className="text-brand-blue dark:text-brand-cyan mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-cyan rounded-[3rem] blur-3xl opacity-10 dark:opacity-20 animate-pulse"></div>
              <div className="glass rounded-[3rem] p-10 relative z-10 border-slate-200 dark:border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/20 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-brand-blue dark:text-brand-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">Clean Code</h4>
                      <p className="text-slate-500 dark:text-gray-300 text-sm">Maintainable & Scalable</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-slate-200 dark:bg-white/10"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-brand-blue dark:text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">High Performance</h4>
                      <p className="text-slate-500 dark:text-gray-300 text-sm">Optimized for speed</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-slate-200 dark:bg-white/10"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/20 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-brand-blue dark:text-brand-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">Secure Systems</h4>
                      <p className="text-slate-500 dark:text-gray-300 text-sm">Enterprise-grade security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">Why Choose <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Nex Wave?</span></h2>
              <p className="text-slate-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                We are a cutting-edge software development agency dedicated to transforming complex business challenges into elegant, scalable digital solutions. 
              </p>
              <p className="text-slate-600 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                Whether you need a robust ERP system, a high-converting mobile app, or an AI-driven automation pipeline, our team combines technical excellence with strategic thinking to deliver results that matter.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="glass p-6 rounded-2xl border-l-4 border-l-brand-cyan hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">100%</h4>
                  <p className="text-slate-600 dark:text-gray-300 font-medium">Client Focused</p>
                </div>
                <div className="glass p-6 rounded-2xl border-l-4 border-l-brand-blue hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">24/7</h4>
                  <p className="text-slate-600 dark:text-gray-300 font-medium">Support & Maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 relative z-10 bg-slate-100/50 dark:bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">What Our Clients Say</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "CEO, RetailFlow", text: "Nex Wave transformed our inventory management with a custom ERP that saved us 20 hours a week." },
              { name: "Michael C.", role: "Founder, TechStart", text: "Their AI automation agents completely streamlined our document processing. Highly recommended!" },
              { name: "Emma W.", role: "Director, HealthCare+", text: "The mobile app they built for us has a 4.9-star rating. Their attention to detail is unmatched." }
            ].map((testimonial, i) => (
              <div key={i} className="glass p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300 hover:shadow-soft-light dark:hover:shadow-none">
                <div className="flex text-brand-blue dark:text-brand-cyan mb-4">
                  {[...Array(5)].map((_, i) => <Zap key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 dark:text-gray-300 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center font-bold text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{testimonial.name}</h5>
                    <p className="text-slate-500 dark:text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mb-6"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden border-slate-200 dark:border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors focus-visible:outline-none">
                  <span className="font-semibold text-lg text-slate-900 dark:text-white">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-brand-blue dark:text-brand-cyan transition-transform duration-300 ${activeFaq === index ? 'rotate-90' : ''}`} />
                </button>
                <div className={`px-6 pb-6 text-slate-600 dark:text-gray-300 transition-all duration-300 ${activeFaq === index ? 'block' : 'hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 dark:bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Amazing</span></h2>
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Have a project in mind? We'd love to hear about it. Reach out through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:nexwave.lk@gmail.com" className="glass p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(234,67,53,0.15)] hover:border-[#EA4335]/50 focus-visible:outline-none">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#EA4335]/10 transition-colors duration-300">
                <Mail className="w-8 h-8 text-slate-600 dark:text-gray-300 group-hover:text-[#EA4335] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Email Us</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">nexwave.lk@gmail.com</p>
              <span className="text-xs font-semibold text-brand-blue dark:text-brand-cyan group-hover:text-[#EA4335] transition-colors flex items-center gap-1">
                Send a message <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="https://instagram.com/nexwave.lk" target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(225,48,108,0.15)] hover:border-[#E1306C]/50 focus-visible:outline-none">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#E1306C]/10 transition-colors duration-300">
                <Instagram className="w-8 h-8 text-slate-600 dark:text-gray-300 group-hover:text-[#E1306C] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Follow Us</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">@nexwave.lk</p>
              <span className="text-xs font-semibold text-brand-blue dark:text-brand-cyan group-hover:text-[#E1306C] transition-colors flex items-center gap-1">
                View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="https://www.fiverr.com/s/RV7NgxV" target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(29,191,115,0.15)] hover:border-[#1DBF73]/50 focus-visible:outline-none">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#1DBF73]/10 transition-colors duration-300">
                <Briefcase className="w-8 h-8 text-slate-600 dark:text-gray-300 group-hover:text-[#1DBF73] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Portfolio</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">View our latest work</p>
              <span className="text-xs font-semibold text-brand-blue dark:text-brand-cyan group-hover:text-[#1DBF73] transition-colors flex items-center gap-1">
                Explore Work <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-white/[0.02] pointer-events-none"></div>
            <form className="relative z-10 space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Form submitted! Connect to Express backend."); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2 group-focus-within:text-brand-blue dark:group-focus-within:text-brand-cyan transition-colors">Your Name</label>
                  <input type="text" className="w-full bg-slate-100 dark:bg-brand-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-cyan focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:bg-white dark:focus:bg-brand-dark/80 transition-all placeholder-slate-400 dark:placeholder-gray-600" placeholder="John Doe" />
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2 group-focus-within:text-brand-blue dark:group-focus-within:text-brand-cyan transition-colors">Your Email</label>
                  <input type="email" className="w-full bg-slate-100 dark:bg-brand-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-cyan focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:bg-white dark:focus:bg-brand-dark/80 transition-all placeholder-slate-400 dark:placeholder-gray-600" placeholder="john@example.com" />
                </div>
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2 group-focus-within:text-brand-blue dark:group-focus-within:text-brand-cyan transition-colors">Subject</label>
                <input type="text" className="w-full bg-slate-100 dark:bg-brand-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-cyan focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:bg-white dark:focus:bg-brand-dark/80 transition-all placeholder-slate-400 dark:placeholder-gray-600" placeholder="Project Inquiry" />
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2 group-focus-within:text-brand-blue dark:group-focus-within:text-brand-cyan transition-colors">Message</label>
                <textarea rows="5" className="w-full bg-slate-100 dark:bg-brand-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-cyan focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-cyan focus:bg-white dark:focus:bg-brand-dark/80 transition-all placeholder-slate-400 dark:placeholder-gray-600 resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="group relative overflow-hidden w-full bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-cyan active:scale-[0.98] focus-visible:outline-none flex items-center justify-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-100 dark:bg-brand-black border-t border-slate-200 dark:border-white/5 relative z-10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <img src="/nexwave.png" alt="Nex Wave" className="h-16 w-auto object-contain mb-6 dark:drop-shadow-[0_0_10px_rgba(0,210,255,0.3)]" />
              <p className="text-slate-600 dark:text-gray-300 max-w-sm leading-relaxed mb-6">
                Building the next wave of digital innovation. We transform complex business challenges into elegant, scalable digital solutions.
              </p>
              <div className="flex gap-4">
                <a href="mailto:nexwave.lk@gmail.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 dark:text-gray-300 transition-all duration-300 hover:text-[#EA4335] hover:border-[#EA4335]/50 hover:shadow-[0_0_20px_rgba(234,67,53,0.2)] hover:scale-110 focus-visible:outline-none">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/nexwave.lk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 dark:text-gray-300 transition-all duration-300 hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:shadow-[0_0_20px_rgba(225,48,108,0.2)] hover:scale-110 focus-visible:outline-none">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.fiverr.com/s/RV7NgxV" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 dark:text-gray-300 transition-all duration-300 hover:text-[#1DBF73] hover:border-[#1DBF73]/50 hover:shadow-[0_0_20px_rgba(29,191,115,0.2)] hover:scale-110 focus-visible:outline-none">
                  <Briefcase className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 tracking-tight text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Services', 'Process', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors focus-visible:outline-none">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 tracking-tight text-slate-900 dark:text-white">Stay Updated</h4>
              <p className="text-slate-600 dark:text-gray-300 text-sm mb-4">Subscribe to our newsletter for the latest tech insights.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-brand-cyan transition-all placeholder-slate-400 dark:placeholder-gray-600" />
                <button type="submit" className="bg-brand-blue dark:bg-brand-cyan text-white dark:text-brand-black p-2 rounded-lg hover:bg-brand-cyan dark:hover:bg-white transition-colors focus-visible:outline-none">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} Nex Wave. All rights reserved.
            </p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-cyan transition-colors focus-visible:outline-none">
              Back to Top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* --- SERVICE MODAL --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/80 backdrop-blur-md animate-fade-in-up">
          <div className="glass max-w-2xl w-full p-8 md:p-12 rounded-3xl border-slate-200 dark:border-white/20 relative shadow-2xl dark:shadow-glow-cyan max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-brand-black/95">
            <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all focus-visible:outline-none">
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 dark:bg-brand-cyan/20 flex items-center justify-center mb-6 border border-brand-cyan/30">
              <div className="text-brand-blue dark:text-brand-cyan">
                {React.cloneElement(selectedService.icon, { className: "w-8 h-8" })}
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">{selectedService.title}</h3>
            <p className="text-slate-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">{selectedService.desc}</p>
            <h4 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">What we offer:</h4>
            <ul className="space-y-4 mb-10">
              {selectedService.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-gray-300">
                  <CheckCircle2 className="w-6 h-6 text-brand-blue dark:text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setSelectedService(null)} className="block w-full text-center bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg dark:shadow-glow focus-visible:outline-none">
              Discuss Your Project
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;