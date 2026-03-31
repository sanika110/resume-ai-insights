import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadCard from "@/components/UploadCard";

const UploadPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFile = (_file: File) => {
    // file is stored but we simulate analysis
  };

  const handleAnalyze = () => {
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
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Upload Your Resume</h1>
            <p className="text-muted-foreground">Drop your file and let AI do the rest.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isAnalyzing ? (
              <motion.div key="upload" exit={{ opacity: 0, scale: 0.95 }}>
                <UploadCardWrapper onAnalyze={handleAnalyze} onFileSelect={handleFile} />
              </motion.div>
            ) : (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 shadow-xl max-w-lg mx-auto text-center"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-2">Analyzing your resume with AI...</h2>
                <p className="text-sm text-muted-foreground mb-6">This usually takes a few seconds.</p>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2 inline-block">{progress}%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* Wrapper to wire the Analyze button */
const UploadCardWrapper = ({
  onAnalyze,
  onFileSelect,
}: {
  onAnalyze: () => void;
  onFileSelect: (f: File) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <UploadCard
        isAnalyzing={false}
        onFileSelect={(f) => {
          setFile(f);
          onFileSelect(f);
        }}
      />
      {file && (
        <div className="flex justify-center mt-4">
          <button
            onClick={onAnalyze}
            className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Analysis →
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
