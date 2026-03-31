import { useCallback, useState, useRef, type DragEvent } from "react";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  hasFile: boolean;
}

const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const UploadCard = ({ onFileSelect, onAnalyze, isAnalyzing, hasFile }: UploadCardProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      setError("Please upload PDF or DOCX");
      setFileName("");
      return;
    }
    setError("");
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSet(file);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
  };

  const fileSize = fileName ? "PDF/DOCX" : "";

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-lg mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : fileName
            ? "border-success/40 bg-success/5"
            : "border-border hover:border-primary/40 hover:bg-primary/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleChange}
        />
        <AnimatePresence mode="wait">
          {fileName ? (
            <motion.div
              key="file"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium truncate max-w-[240px]">{fileName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{fileSize} • Click to change</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drag & Drop your resume
                </p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse • PDF, DOCX</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="flex items-center gap-2 mt-4 text-sm text-destructive"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="w-full mt-5 sm:mt-6 gradient-primary text-primary-foreground hover:opacity-90 transition-all h-11 sm:h-12 text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg"
        disabled={!hasFile || isAnalyzing}
        onClick={onAnalyze}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Resume →"}
      </Button>
    </div>
  );
};

export default UploadCard;
