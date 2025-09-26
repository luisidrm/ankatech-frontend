"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Create client once per component instance (important!)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Optional debugging panel */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
