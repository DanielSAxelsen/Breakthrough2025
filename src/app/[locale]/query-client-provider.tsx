"use client";

import React from "react";
import {
  QueryClientProvider as QueryClientProviderR,
  QueryClient,
} from "@tanstack/react-query";

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProviderR client={client}>{children}</QueryClientProviderR>
  );
}
