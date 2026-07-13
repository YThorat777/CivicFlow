"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Input } from "@/components/ui/Field";
import { cx } from "@/lib/utils";
import { SERVICES } from "@/lib/mock-data";
import { ServiceCategory } from "@/lib/types";

const CATEGORIES: Array<ServiceCategory | "All"> = [
  "All",
  "Identity",
  "Housing",
  "Business",
  "Health",
  "Transport",
  "Records",
];

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "All">("All");

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <AppShell
      title="Browse services"
      description="Explore available civic services and start an application."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-sm flex-1">
          <Input
            placeholder="Search services…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search services"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-ink-700 bg-ink-700 text-paper"
                  : "border-ink-100 bg-paper-panel text-ink-600 hover:border-ink-300"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate">
          No services match &ldquo;{query}&rdquo;. Try a different search or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
