import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
}

const getStatus = (score: number) => {
  if (score >= 80) return { label: "Excellent", bgClass: "bg-success/10", textClass: "text-success" };
  if (score >= 60) return { label: "Good", bgClass: "bg-warning/10", textClass: "text-warning" };
  return { label: "Needs Improvement", bgClass: "bg-destructive/10", textClass: "text-destructive" };
};

const ScoreCard = ({ score }: ScoreCardProps) => {
  const status = getStatus(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-lg h-full">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5 sm:mb-6">
        ATS Score
      </h3>
      <div className="relative w-28 h-28 sm:w-36 sm:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="7"
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
            className="text-2xl sm:text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className={`mt-4 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${status.bgClass} ${status.textClass}`}>
        {status.label}
      </span>
    </div>
  );
};

export default ScoreCard;
