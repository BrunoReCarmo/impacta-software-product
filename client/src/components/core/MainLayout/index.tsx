"use client"

import { useState, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./Header";

export default function MainLayout({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Header />
        <div className={styles.container__content}>{children}</div>
      </div>
    </QueryClientProvider>
  );
}
