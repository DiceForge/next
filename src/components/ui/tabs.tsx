"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      "scrollbar-hide flex flex-1 shrink-0 overflow-scroll shadow-tab-line",
      className
    )}
    ref={ref}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      [
        "text-body-medium-300",
        "text-neutral-11",
        "border-b-2",
        "border-b-transparent",
        "px-5",
        "h-10",
        "flex",
        "box-border",
        "cursor-pointer",
        "items-center",
        "gap-2",
        "transition",
        "whitespace-nowrap",

        "hover:bg-neutral-3",
        "active:bg-neutral-4",
        "focus-visible:bg-neutral-3",
        "focus-visible:outline-none",

        "data-[state=active]:text-primary-11",
        "data-[state=active]:border-b-primary-9",
      ],
      className
    )}
    ref={ref}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "ring-offset-background focus-visible:ring-ring mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    )}
    ref={ref}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const TabsExtra = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-1 justify-end gap-2", className)}
    ref={ref}
    {...props}
  />
));
TabsExtra.displayName = "TabsExtra";

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsExtra };
