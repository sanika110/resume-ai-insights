import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Target, FileCheck, Briefcase, Upload, Cpu, ClipboardCheck, ArrowRight, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: BarChart3, title: "ATS Score Analysis", desc: "Instant compatibility score showing how well your resume passes Applicant Tracking Systems." },
  { icon: Target, title: "Skill Gap Detection", desc: "Identify missing skills and keywords that recruiters are actively looking for." },
  { icon: FileCheck, title: "Improvement Suggestions", desc: "Actionable suggestions to strengthen every section of your resume." },
  { icon: Briefcase, title: "Job Readiness Insights", desc: "Understand how prepared your resume is for your target roles." },
];

const steps = [
  { icon: Upload, step: "01", title: "Upload Resume", desc: "Drop your PDF or DOCX file into our secure upload area." },
  { icon: Cpu, step: "02", title: "AI Analyzes Content", desc: "Our AI scans structure, keywords, and formatting in seconds." },
  { icon: ClipboardCheck, step: "03", title: "Get Your Report", desc: "Receive a detailed report with scores and action items." },
];

const stats = [
  { value: "50K+", label: "Resumes Analyzed" },
  { value: "92%", label: "Improvement Rate" },
  { value: "4.9", label: "User Rating", icon: Star },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="container mx-auto text-center max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold gradient-primary text-primary-foreground mb-6 sm:mb-8 shadow-md">
            <Cpu className="w-3 h-3" />
            AI-Powered Resume Analysis
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-5 sm:mb-6">
            Improve Your Resume
            <br />
            with <span className="gradient-text">AI Analysis</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and get ATS score, improvement suggestions, and skill recommendations instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/upload">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground hover:opacity-90 transition-all h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Analyze Resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Trusted by 50,000+ professionals
            </span>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold">{s.value}</span>
                {s.icon && <s.icon className="w-4 h-4 text-warning fill-warning" />}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="section-header">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">Features</span>
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">Powerful AI tools to optimize your resume for success.</p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1.5">{f.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="section-header">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to a better resume.</p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={itemVariants} className="text-center relative">
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
              )}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg relative">
                <s.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-primary tracking-wider">STEP {s.step}</span>
              <h3 className="font-semibold text-sm sm:text-base mt-1.5 mb-1.5">{s.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 relative">
            Ready to Improve Your Resume?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto relative">
            Join thousands of professionals who have already optimized their resumes with AI.
          </p>
          <Link to="/upload" className="relative">
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground hover:opacity-90 transition-all h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-xl shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
