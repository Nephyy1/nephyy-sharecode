"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
