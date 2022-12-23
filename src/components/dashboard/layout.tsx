import Head from "next/head";
import React, { useEffect } from "react";
import StatusBar from "./statusBar";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import CreateCompanyForm from "./createCompany";
import Board from "./board";
import useCompany from "@utils/state/company";

interface Props {
  children: React.ReactNode;
}

const Layout = () => {
  const { data: sessionData } = useSession();
  const primaryCompany = trpc.company.getFirstWithShifts.useQuery();
  const setCompanyName = useCompany((state) => state.setCompanyName);
  const setCompanyID = useCompany((state) => state.setCompanyID);

  useEffect(() => {
    if (primaryCompany.data) {
      setCompanyName(primaryCompany.data.name);
      setCompanyID(primaryCompany.data.id);
    }
  }, [primaryCompany.data, setCompanyName, setCompanyID]);

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
          <Board isLoading={primaryCompany.isLoading} />
        )}
      </Main>
    </>
  );
};

export default Layout;

const Main = ({ children }: Props) => {
  return <main>{children}</main>;
};
