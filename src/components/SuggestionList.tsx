import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Lightbulb, Zap } from "lucide-react";
import type { ReactNode } from "react";

interface SuggestionListProps {
  title: string;
  items: string[];
  variant: "strength" | "improvement" | "skill" | "section";
}

const icons: Record<string, ReactNode> = {
  strength: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />,
  improvement: <Lightbulb className="w-4 h-4 text-warning shrink-0" />,
  skill: <Zap className="w-4 h-4 text-accent shrink-0" />,
  section: <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0" />,
};

const SuggestionList = ({ title, items, variant }: SuggestionListProps) => (
  <div className="glass-card rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-3 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          {icons[variant]}
          <span className="text-muted-foreground">{item}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

export default SuggestionList;
