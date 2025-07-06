import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, LogIn } from 'lucide-react';

export default function Header() {
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
            <CodeXml className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline-block">Nephyy ShareCode</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/live">Live</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/review">Review</Link>
          </Button>
          {isLoggedIn ? (
            <>
            </>
          ) : (
            <div className="flex items-center gap-2">
                <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
                <Button className="btn-gradient shadow-subtle hover:shadow-subtle-hover">Register</Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
