import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
}

const getStatus = (score: number) => {
  if (score >= 80) return { label: "Excellent", color: "text-success" };
  if (score >= 60) return { label: "Good", color: "text-warning" };
  return { label: "Needs Improvement", color: "text-destructive" };
};

const ScoreCard = ({ score }: ScoreCardProps) => {
  const status = getStatus(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-8 flex flex-col items-center shadow-lg">
      <h3 className="text-lg font-semibold mb-6">ATS Score</h3>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--gradient-start))" />
              <stop offset="100%" stopColor="hsl(var(--gradient-end))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className={`mt-4 text-sm font-semibold ${status.color}`}>{status.label}</span>
    </div>
  );
};

export default ScoreCard;
