import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          colors: {
            "base-dark": ["#18181b", "#27272a", "#3f3f46", "#737373"],
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
