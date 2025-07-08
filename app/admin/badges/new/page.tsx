"use client";

import { useFormState } from "react-dom";
import { createBadge } from "@/app/admin/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

export default function NewBadgePage() {
  const initialState = { message: "", success: false };
  const [state, dispatch] = useFormState(createBadge, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push('/admin/badges');
    } else if (state.message && typeof state.message !== 'string') {
      const errorMessages = Object.values(state.message).flat().join("\n");
      toast.error(errorMessages);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex justify-center items-start">
      <Card className="w-full max-w-2xl">
        <form action={dispatch}>
          <CardHeader>
            <CardTitle>Create New Badge</CardTitle>
            <CardDescription>Fill out the form to create a new badge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Badge Name</Label>
              <Input id="name" name="name" placeholder="e.g., Top Contributor" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="A short description of the badge." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon_name">Icon</Label>
              <Select name="icon_name" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin (Shield)</SelectItem>
                  <SelectItem value="Expert">Expert (Star)</SelectItem>
                  <SelectItem value="Rookie">Rookie (Baby)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton>Create Badge</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
