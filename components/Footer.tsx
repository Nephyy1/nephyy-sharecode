import Link from 'next/link';
import { Mail, Phone, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4 items-start">
            <Link href="/" className="font-bold text-xl">
              Nephyy ShareCode
            </Link>
            <p className="text-muted-foreground text-sm">
              Platform modern untuk berbagi, berkolaborasi, dan me-review kode dengan mudah.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Sitemap</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/create" className="text-muted-foreground hover:text-primary transition-colors">Create Snippet</Link>
              <Link href="/live" className="text-muted-foreground hover:text-primary transition-colors">Live Coding</Link>
              <Link href="/review" className="text-muted-foreground hover:text-primary transition-colors">AI Review</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:support@nephyy.tech" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>support@nephyy.tech</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+7-999-246-1528</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Get Connected</h3>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nephyy ShareCode. All Rights Reserved by Nephyy.</p>
        </div>
      </div>
    </footer>
  );
}
