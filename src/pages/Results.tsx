import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScoreCard from "@/components/ScoreCard";
import SuggestionList from "@/components/SuggestionList";
import SectionChecklist from "@/components/SectionChecklist";

// Mock data — will be replaced by POST /api/analyze response
const mockResult = {
  score: 74,
  strengths: [
    "Good project structure",
    "Clear skills section",
    "Good formatting",
    "Professional contact details",
  ],
  weaknesses: [
    "Add measurable achievements",
    "Improve summary section",
    "Add more technical keywords",
    "Quantify project impact",
  ],
  suggestions: [
    "Include metrics like 'increased revenue by 20%'",
    "Add a professional summary at the top",
    "Use industry-specific keywords",
    "Keep to 1-2 pages maximum",
  ],
  missing_skills: [
    "Docker",
    "CI/CD",
    "Unit Testing",
    "Cloud Services (AWS/GCP)",
    "System Design",
  ],
  sections: [
    { name: "Summary", present: false },
    { name: "Skills", present: true },
    { name: "Projects", present: true },
    { name: "Experience", present: true },
    { name: "Education", present: true },
  ],
};

const Results = () => {
  const [error] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-10 shadow-xl text-center max-w-md"
          >
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Analysis Failed</h2>
            <p className="text-muted-foreground text-sm mb-6">Analysis failed. Try again.</p>
            <Link to="/upload">
              <Button className="gradient-primary text-primary-foreground">
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const data = mockResult;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
            <p className="text-muted-foreground">Here's what our AI found in your resume.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Score */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <ScoreCard score={data.score} />
            </motion.div>

            {/* Right: Sections checklist */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <SectionChecklist sections={data.sections} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <SuggestionList title="Strengths" items={data.strengths} variant="strength" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <SuggestionList title="Improvement Suggestions" items={data.weaknesses} variant="improvement" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <SuggestionList title="Actionable Tips" items={data.suggestions} variant="improvement" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <SuggestionList title="Missing Skills" items={data.missing_skills} variant="skill" />
            </motion.div>
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/upload">
              <Button variant="outline" className="rounded-xl">
                <RotateCcw className="w-4 h-4 mr-2" /> Analyze Another Resume
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
