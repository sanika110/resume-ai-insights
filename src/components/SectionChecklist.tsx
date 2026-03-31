import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface SectionChecklistProps {
  sections: { name: string; present: boolean }[];
}

const SectionChecklist = ({ sections }: SectionChecklistProps) => {
  const presentCount = sections.filter((s) => s.present).length;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-lg h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm sm:text-base font-semibold">Resume Sections</h3>
        <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {presentCount}/{sections.length} detected
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {sections.map((s, i) => (
          <motion.div
            key={s.name}
            className={`flex items-center gap-3 text-sm px-3.5 py-2.5 rounded-xl transition-colors ${
              s.present ? "bg-success/5" : "bg-destructive/5"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {s.present ? (
              <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-success" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
                <X className="w-3 h-3 text-destructive" />
              </div>
            )}
            <span className={`text-xs sm:text-sm ${s.present ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {s.name}
            </span>
            {!s.present && (
              <span className="text-[10px] text-destructive ml-auto font-medium">Missing</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionChecklist;
