import Head from "next/head";
import React from "react";
import StatusBar from "./statusBar";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import CreateCompanyForm from "./createCompany";
import Board from "./board";

interface Props {
  children: React.ReactNode;
}

const Layout = () => {
  const { data: sessionData } = useSession();
  const primaryCompany = trpc.company.getFirstWithShifts.useQuery();
  return (
    <>
      <Head>
        <title>{`${sessionData?.user?.name} Dashboard`}</title>
        <meta
          name="description"
          content={`${sessionData?.user?.name} Dashboard`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatusBar />
      <Main>
        {!primaryCompany.data ? (
          <CreateCompanyForm isLoading={primaryCompany.isLoading} />
        ) : (
          <Board
            companyId={primaryCompany.data.id}
            isLoading={primaryCompany.isLoading}
          />
        )}
      </Main>
    </>
  );
};

export default Layout;

const Main = ({ children }: Props) => {
  return <main>{children}</main>;
};
