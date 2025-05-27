"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function GoBackButton({
  label = "Go Back",
  type,
}: {
  label?: string;
  type?: string;
}) {
  const router = useRouter();
  if (type !== undefined && type === "ghost") {
    return (
      <Link href="#" onClick={() => router.back()}>
        <Button variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
    );
  }
  return <Button onClick={() => window.history.back()}>{label}</Button>;
}
