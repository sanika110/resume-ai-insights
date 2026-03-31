import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb, Zap } from "lucide-react";
import type { ReactNode } from "react";

interface SuggestionListProps {
  title: string;
  items: string[];
  variant: "strength" | "improvement" | "skill" | "section";
}

const variantConfig: Record<string, { icon: ReactNode; dotClass: string }> = {
  strength: {
    icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />,
    dotClass: "bg-success",
  },
  improvement: {
    icon: <Lightbulb className="w-4 h-4 text-warning shrink-0" />,
    dotClass: "bg-warning",
  },
  skill: {
    icon: <Zap className="w-4 h-4 text-accent shrink-0" />,
    dotClass: "bg-accent",
  },
  section: {
    icon: <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />,
    dotClass: "bg-muted-foreground",
  },
};

const SuggestionList = ({ title, items, variant }: SuggestionListProps) => {
  const config = variantConfig[variant];

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
        <h3 className="text-sm sm:text-base font-semibold">{title}</h3>
        <span className="text-[10px] text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2.5 text-xs sm:text-sm"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            {config.icon}
            <span className="text-muted-foreground leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionList;
