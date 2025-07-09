import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, Menu, FilePlus2, WandSparkles, LogOut, User as UserIcon, Settings, Compass, MessagesSquare, ShieldCheck, TerminalSquare } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { createClient } from '@/lib/supabase/server';
import { UserNav } from './UserNav';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { LogoutButton } from './LogoutButton';

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = profileData;
  }

  const navItems = [
    { href: "/explore", label: "Explore", icon: <Compass className="w-5 h-5" /> },
    { href: "/forums", label: "Forums", icon: <MessagesSquare className="w-5 h-5" /> },
    { href: "/create", label: "Create", icon: <FilePlus2 className="w-5 h-5" /> },
    { href: "/live-code", label: "Live Code", icon: <TerminalSquare className="w-5 h-5" /> },
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

  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase();

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

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <ThemeToggle />
          {user ? <UserNav user={user} profile={profile} /> : <AuthButtons />}
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
            <SheetContent side="right" className="w-[300px] flex flex-col p-0">
              <SheetHeader className="p-4 text-left border-b">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
                      <CodeXml className="w-5 h-5" />
                    </div>
                    <span>Nephyy ShareCode</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="p-4 flex-grow overflow-y-auto">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                       <Link href={item.href} className="flex items-center gap-3 text-lg py-3 hover:bg-accent rounded-md px-3">
                          {item.icon}
                          <span>{item.label}</span>
                       </Link>
                    </SheetClose>
                  ))}
                </nav>

                {user && (
                  <>
                    <DropdownMenuSeparator className="my-4" />
                    <div className="px-3 text-lg font-semibold mb-2">Account</div>
                    {profile?.role === 'admin' && (
                      <SheetClose asChild>
                        <Link href="/admin" className="flex items-center gap-3 text-lg py-3 text-primary hover:bg-accent rounded-md px-3">
                          <ShieldCheck className="w-5 h-5" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Link href="/profile" className="flex items-center gap-3 text-lg py-3 hover:bg-accent rounded-md px-3">
                        <UserIcon className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/settings" className="flex items-center gap-3 text-lg py-3 hover:bg-accent rounded-md px-3">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <LogoutButton />
                    </SheetClose>
                  </>
                )}
              </div>

              <SheetFooter className="p-4 mt-auto border-t">
                {user ? (
                   <div className="flex items-center gap-3 w-full">
                      <Avatar>
                        <AvatarImage src={profile?.avatar_url || ''} alt="User avatar" />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-sm font-medium truncate">{profile?.full_name}</span>
                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                      </div>
                   </div>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
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
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
