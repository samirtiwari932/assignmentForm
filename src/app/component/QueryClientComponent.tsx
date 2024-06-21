"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryClientComponent({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>

            {children}
        </QueryClientProvider>
    );
}