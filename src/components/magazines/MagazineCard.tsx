"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ⛔️ Quitamos este porque no se usa en este archivo:
// import { Button } from "@/components/ui/button";
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
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {issue.title} — {issue.month}/{issue.year}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={issue.cover_url}
            alt={`Portada ${issue.title}`}  // ✅ template string correcto
            fill                           // ✅ usamos fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"  // ✅ requerido cuando usás fill
          />
        </div>

        {/* CTA: email-gate */}
        <EmailGateDialog issue={issue} />
      </CardContent>
    </Card>
  );
}

