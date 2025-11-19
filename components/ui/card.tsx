"use client";

import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={`bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
