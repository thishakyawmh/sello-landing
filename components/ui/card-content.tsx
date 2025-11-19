"use client";

import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "", ...rest }: CardProps) {
  return (
    <div {...rest} className={`${className}`}>
      {children}
    </div>
  );
}
