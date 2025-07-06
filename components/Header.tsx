import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, Menu, FilePlus2, Radio, WandSparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { createClient } from '@/lib/supabase/server';
import { UserNav } from './UserNav';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const navItems = [
    { href: "/create", label: "Create", icon: <FilePlus2 className="w-5 h-5" /> },
    { href: "/live", label: "Live", icon: <Radio className="w-5 h-5" /> },
    { href: "/review", label: "Review", icon: <WandSparkles className="w-5 h-5" /> },
  ];

  const AuthButtons = () => (
    <>
      <Button variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button className="btn-gradient shadow-subtle hover:shadow-subtle-hover" asChild>
        <Link href="/register">Register</Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-slate-800/80">
      <div className="container flex h-16 max-w-7xl items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
            <CodeXml className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline-block">Nephyy ShareCode</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {user ? <UserNav user={user} /> : <AuthButtons />}
        </div>

        <div className="md:hidden ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col h-full p-4">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                       <Link href={item.href} className="flex items-center gap-3 text-lg py-2 hover:bg-accent rounded-md px-3">
                          {item.icon}
                          <span>{item.label}</span>
                       </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <UserNav user={user} />
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>
                       <SheetClose asChild>
                        <Button className="btn-gradient w-full" asChild>
                          <Link href="/register">Register</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
