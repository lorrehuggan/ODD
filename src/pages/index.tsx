import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/landingPage/layout";

const Home: NextPage = () => {
  return <Layout />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { authenticated: false },
  };
};
