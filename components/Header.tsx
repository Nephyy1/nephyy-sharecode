"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { CodeXml, Menu } from 'lucide-react';

export default function Header() {
  const isLoggedIn = false;
  const navItems = [
    { href: "/create", label: "Create" },
    { href: "/live", label: "Live" },
    { href: "/review", label: "Review" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
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
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              <Button variant="outline">Login</Button>
              <Button className="btn-gradient shadow-subtle hover:shadow-subtle-hover">Register</Button>
            </>
          )}
        </div>

        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <SheetClose key={item.href} asChild>
                         <Link href={item.href} className="text-lg py-2 hover:bg-accent rounded-md px-3">{item.label}</Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
                <div className="flex flex-col gap-3">
                  {isLoggedIn ? (
                    <></>
                  ) : (
                    <>
                      <Button variant="outline">Login</Button>
                      <Button className="btn-gradient">Register</Button>
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
