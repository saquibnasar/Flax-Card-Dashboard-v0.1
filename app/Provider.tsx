import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Worker } from "@react-pdf-viewer/core";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={client}>
          <Worker workerUrl="/pdf.worker.min.mjs">{children}</Worker>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
