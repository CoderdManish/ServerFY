import { createFileRoute } from "@tanstack/react-router";
import { ComparisonChart, type ChartRange, type SeriesPoint } from "@/components/admin/ComparisonChart";
import { useState } from "react";

export const Route = createFileRoute("/sfy-console-9f2a/chart-preview")({
  ssr: false,
  component: ChartPreview,
  head: () => ({
    meta: [{ title: "Chart Preview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const RANGES: Record<ChartRange, SeriesPoint[]> = {
  day: mock(24, "hours"),
  week: mock(14, "days"),
  month: mock(30, "days"),
  year: mock(12, "months"),
};

function mock(n: number, _unit: string): SeriesPoint[] {
  const base = 1736400000000;
  return Array.from({ length: n }, (_, i) => ({
    at: new Date(base + i * 86400000).toISOString(),
    current: Math.round(6 + 14 * Math.abs(Math.sin(i * 1.7)) + (i % 5) * 2),
    previous: Math.round(4 + 10 * Math.abs(Math.cos(i * 1.1)) + (i % 4)),
  }));
}

function ChartPreview() {
  const [range, setRange] = useState<ChartRange>("week");
  return (
    <main className="min-h-screen bg-[#070d1f] p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <ComparisonChart
          title="Leads"
          unitLabel="leads"
          range={range}
          onRangeChange={setRange}
          series={RANGES[range]}
        />
e        <ComparisonChart
          title="Visitors"
          unitLabel="visitors"
          range={range}
          onRangeChange={setRange}
          series={RANGES[range]}
        />
      </div>
    </main>
  );
}
