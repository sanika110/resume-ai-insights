import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Target, FileCheck, Briefcase, Upload, Cpu, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: BarChart3, title: "ATS Score Analysis", desc: "Get an instant compatibility score showing how well your resume passes Applicant Tracking Systems." },
  { icon: Target, title: "Skill Gap Detection", desc: "Identify missing skills and keywords that recruiters and hiring managers are looking for." },
  { icon: FileCheck, title: "Resume Improvement Suggestions", desc: "Receive actionable suggestions to strengthen every section of your resume." },
  { icon: Briefcase, title: "Job Readiness Insights", desc: "Understand how prepared your resume is for the roles you're targeting." },
];

const steps = [
  { icon: Upload, step: "01", title: "Upload Resume", desc: "Drop your PDF or DOCX file into our secure upload area." },
  { icon: Cpu, step: "02", title: "AI Analyzes Content", desc: "Our AI engine scans structure, keywords, and formatting in seconds." },
  { icon: ClipboardCheck, step: "03", title: "Get Improvement Report", desc: "Receive a detailed report with scores, suggestions, and action items." },
];

const Landing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold gradient-primary text-primary-foreground mb-6">
            AI-Powered Resume Analysis
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Improve Your Resume with{" "}
            <span className="gradient-text">AI Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Upload your resume and get ATS score, improvement suggestions, and skill recommendations instantly.
          </p>
          <Link to="/upload">
            <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity h-14 px-8 text-base rounded-xl shadow-lg">
              Analyze Resume →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to optimize your resume for success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" className="py-20 px-4 bg-muted/40">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to a better resume.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary">STEP {s.step}</span>
              <h3 className="font-semibold mt-1 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
