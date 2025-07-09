"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button variant="ghost" className="w-full justify-start gap-3 text-lg py-6 px-3" onClick={handleSignOut}>
      <LogOut className="w-5 h-5" />
      <span>Log out</span>
    </Button>
  );
}
