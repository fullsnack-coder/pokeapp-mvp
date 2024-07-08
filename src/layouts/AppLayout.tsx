import SearchBar from "@/components/SearchBar";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
}>;

const inter = Inter({ subsets: ["latin"] });

const AppLayout: React.FC<Props> = ({ title = "Pokemon App", children }) => {
  return (
    <section className={`${inter.className}`}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <picture>
          <img
            src="/pokemon-logo.png"
            alt="Pokemon"
            className="w-full h-[200px] object-contain"
          />
        </picture>
      </Link>
      <div className="sticky top-3 z-10">
        <SearchBar />
      </div>
      <main className="mx-auto max-w-[1200px] xl:max-w-[1400px] px-5 py-10 min-h-[50vh]">
        {children}
      </main>
      <footer className="py-8">
        <p className="text-center text-gray-500">
          Made with PokeAPI Data by Manuel Garcia{" "}
        </p>
      </footer>
    </section>
  );
};

export default AppLayout;
