import Head from "next/head";
import React from "react";
import StatusBar from "./statusBar";
import { signOut, useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const Layout = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>{`${sessionData?.user?.name} Dashboard`}</title>
        <meta name="description" content={`${sessionData?.user?.name} Dashboard`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatusBar />
      <Main>
      </Main>
    </>
  );
}

export default Layout;


const Main = ({ children }: Props) => {
  return (
    <main>
      {children}
    </main>
  )
}


