import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Upload Resume", href: "/upload" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong">
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display font-bold">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
          </div>
          <span className="gradient-text text-lg sm:text-xl">ResumeAI</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/upload">
            <Button className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-lg h-9 px-5 text-sm">
              Analyze Resume
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-1.5 -mr-1.5 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="glass-card-strong px-4 sm:px-6 py-3 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/60 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link to="/upload" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground rounded-lg h-10">
                    Analyze Resume
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
