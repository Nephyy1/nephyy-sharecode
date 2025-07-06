import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { createClient } from '@/lib/supabase/server';
import { UserNav } from './UserNav';

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-slate-800/80">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
            <CodeXml className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline-block">Nephyy ShareCode</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/create">Create</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/live">Live</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/review">Review</Link>
              </Button>
          </nav>
          <div className="w-px h-6 bg-border mx-4 hidden md:block"></div>
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Button variant="outline" asChild className="hidden sm:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="btn-gradient shadow-subtle hover:shadow-subtle-hover" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
