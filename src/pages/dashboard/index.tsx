import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../components/dashboard/layout";

const Dashboard = () => {
  return <Layout />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* Checking if the user has a session token. If they do, it redirects them to the dashboard. */
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
