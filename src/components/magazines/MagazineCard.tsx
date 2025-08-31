"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailGateDialog from "./EmailGateDialog";

export type Issue = {
  id: string;
  slug: string;
  title: string;
  month: number;
  year: number;
  cover_url: string;
};

export default function MagazineCard({ issue }: { issue: Issue }) {
  return (
    <Card className="overflow-hidden group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="tracking-wider">
          {issue.title} — {issue.month}/{issue.year}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={issue.cover_url}
            alt={`Portada ${issue.title}`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <EmailGateDialog issue={issue} />
      </CardContent>
    </Card>
  );
}
