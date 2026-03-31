import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-bold mb-3">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="gradient-text text-lg">ResumeAI</span>
          </Link>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xs leading-relaxed">
            AI-powered resume analysis to help you land your dream job.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-3">Legal</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-[10px] sm:text-xs text-muted-foreground">
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
