import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface SectionChecklistProps {
  sections: { name: string; present: boolean }[];
}

const SectionChecklist = ({ sections }: SectionChecklistProps) => (
  <div className="glass-card rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Resume Sections</h3>
    <ul className="space-y-3">
      {sections.map((s, i) => (
        <motion.li
          key={s.name}
          className="flex items-center gap-3 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          {s.present ? (
            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-success" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
              <X className="w-3 h-3 text-destructive" />
            </div>
          )}
          <span className={s.present ? "text-foreground" : "text-muted-foreground"}>{s.name}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

export default SectionChecklist;
