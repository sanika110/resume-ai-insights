import { useCallback, useState, type DragEvent } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const ACCEPTED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const UploadCard = ({ onFileSelect, isAnalyzing }: UploadCardProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

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

  return (
    <div className="glass-card rounded-2xl p-8 shadow-xl max-w-lg mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleChange}
        />
        <AnimatePresence mode="wait">
          {fileName ? (
            <motion.div key="file" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Drag & Drop your resume or click to upload
              </p>
              <p className="text-xs text-muted-foreground">PDF or DOCX</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-4 text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      <Button
        className="w-full mt-6 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base"
        disabled={!fileName || isAnalyzing}
        onClick={() => {}}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
      </Button>
    </div>
  );
};

export default UploadCard;
