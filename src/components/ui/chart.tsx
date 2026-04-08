"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  };
};

const ChartContext = React.createContext<{config: ChartConfig} | null>(null);

export function ChartContainer({
  children,
  config,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>
          {children as any}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltipContent({
  active,
  payload,
  className,
}: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className={cn("border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)}>
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex w-full items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex flex-1 justify-between gap-4">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-mono font-medium">{item.value?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartLegendContent({ payload, className }: any) {
  if (!payload?.length) return null;
  return (
    <div className={cn("flex items-center justify-center gap-4 pt-3", className)}>
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartLegend = RechartsPrimitive.Legend;
export const ChartStyle = () => null;