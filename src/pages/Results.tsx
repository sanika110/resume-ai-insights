import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScoreCard from "@/components/ScoreCard";
import SuggestionList from "@/components/SuggestionList";
import SectionChecklist from "@/components/SectionChecklist";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const Results = () => {
  const [error] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 sm:p-10 shadow-xl text-center max-w-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-destructive" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1.5">Analysis Failed</h2>
            <p className="text-muted-foreground text-sm mb-6">Something went wrong. Please try again.</p>
            <Link to="/upload">
              <Button className="gradient-primary text-primary-foreground rounded-xl h-10">
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const data = JSON.parse(
    localStorage.getItem("resumeResult") || "{}"
  );

  const jobMatch = data?.job_match || {};
  const roleMissing = data?.role_missing_skills || {};


  if (!data.score) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No analysis found. Please upload resume again.</p>
      </div>
    );

  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10"
          >
            <div>
              <h1 className="page-title">Analysis Results</h1>
              <p className="page-subtitle">Here's what our AI found in your resume.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/upload">
                <Button variant="outline" size="sm" className="rounded-lg text-xs h-9">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> New Analysis
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="rounded-lg text-xs h-9">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export
              </Button>
            </div>
          </motion.div>

          {/* Score + Sections row */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <ScoreCard score={data.score} />
            </motion.div>
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <SectionChecklist sections={data.sections} />
            </motion.div>
          </motion.div>

          {/* Details grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SuggestionList title="Strengths" items={data.strengths} variant="strength" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SuggestionList title="Areas to Improve" items={data.weaknesses} variant="improvement" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SuggestionList title="Actionable Tips" items={data.suggestions} variant="improvement" />
            </motion.div>
            <motion.div variants={itemVariants}>
            <SuggestionList 
              title="AI Suggestions" 
              items={data.ai_suggestions || []} 
              variant="improvement" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SuggestionList title="Missing Skills" items={data.missing_skills} variant="skill" />
            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-2">

              <div className="glass-card p-6 rounded-xl">

                <h2 className="text-lg font-semibold mb-4">
                  Job Role Match
                </h2>

                {Object.entries(jobMatch).map(([role, score]) => (

                  <div key={role} className="mb-4">

                    <div className="flex justify-between text-sm mb-1">

                      <span className="capitalize">
                        {role}
                      </span>

                      <span>
                        {score}%
                      </span>

                    </div>

                    <div className="w-full bg-muted h-2 rounded">

                      <div
                        className="bg-primary h-2 rounded"
                        style={{ width: `${score}%` }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-2">

              <div className="glass-card p-6 rounded-xl">

                <h2 className="text-lg font-semibold mb-4">
                  Recommended Skills For Roles
                </h2>

                {Object.entries(roleMissing).map(([role, skills]) => (

                  <div key={role} className="mb-4">

                    <h3 className="font-medium capitalize mb-2">
                      {role}
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {skills.slice(0, 5).map((skill, index) => (

                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary rounded text-xs"
                        >

                          {skill}

                        </span>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
