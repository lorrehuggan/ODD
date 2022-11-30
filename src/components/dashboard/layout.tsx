import Head from "next/head";
import React from "react";
import StatusBar from "./statusBar";
import { useSession } from "next-auth/react";
import { trpc } from '../../utils/trpc'
import CompanyForm from "./companyForm";

interface Props {
  children: React.ReactNode;
}

const Layout = () => {
  const { data: sessionData } = useSession();
  const companies = trpc.dashboard.getCompanies.useQuery()
  return (
    <>
      <Head>
        <title>{`${sessionData?.user?.name} Dashboard`}</title>
        <meta name="description" content={`${sessionData?.user?.name} Dashboard`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatusBar />
      <Main>
        {companies.data?.length === 0 &&
          <CompanyForm />
        }
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


