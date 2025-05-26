"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User2 } from "lucide-react";

interface UserProfileProps {
  user: User;
  className?: string;
}

export function UserProfile({ user, className }: UserProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <User2 className="h-4 w-4" />
        <span className="hidden sm:inline">
          {user.user_metadata.name || user.email}
        </span>
      </Button>
      {isExpanded && (
        <Card className="absolute right-0 top-12 w-80 z-50">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.user_metadata.name && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Name
                </div>
                <div>{user.user_metadata.name}</div>
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Email
              </div>
              <div>{user.email}</div>
            </div>
            <Button asChild className="w-full" variant="outline">
              <a href="/logout">Sign out</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
