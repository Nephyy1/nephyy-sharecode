import Link from 'next/link';
import { Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-xl hover:text-primary transition-colors">
              Nephyy ShareCode
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Platform untuk developer berbagi kode, berdiskusi di forum, dan mendapatkan review AI.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Features</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/create" className="text-muted-foreground hover:text-primary transition-colors">Create Snippet</Link>
              <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore Snippets</Link>
              <Link href="/review" className="text-muted-foreground hover:text-primary transition-colors">AI Review</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Community</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/forums" className="text-muted-foreground hover:text-primary transition-colors">Forums</Link>
              <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">My Profile</Link>
              <Link href="/settings" className="text-muted-foreground hover:text-primary transition-colors">Settings</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright © {new Date().getFullYear()} Nephyy</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="https://instagram.com/shunsinee.x" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://t.me/NepSoHee" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
