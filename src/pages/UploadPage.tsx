import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadCard from "@/components/UploadCard";

const UploadPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          navigate("/results");
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 flex items-start justify-center">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-header"
          >
            <h1 className="page-title">Upload Your Resume</h1>
            <p className="page-subtitle">Drop your file and let AI do the rest.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isAnalyzing ? (
              <motion.div key="upload" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <UploadCard
                  isAnalyzing={false}
                  hasFile={!!file}
                  onFileSelect={(f) => setFile(f)}
                  onAnalyze={handleAnalyze}
                />
                <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  Your data is encrypted and never shared
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 sm:p-14 shadow-xl text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1.5">Analyzing your resume with AI...</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-8">This usually takes a few seconds.</p>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-3 inline-block">{progress}%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;
