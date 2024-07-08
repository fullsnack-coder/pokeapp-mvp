import { BackgroundTypeColorProvider } from "@/context/background-type-color";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <BackgroundTypeColorProvider>
        <Component {...pageProps} />
      </BackgroundTypeColorProvider>
    </QueryClientProvider>
  );
}
