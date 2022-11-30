import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/landingPage/layout";

const Home: NextPage = () => {

  return (
    <Layout />
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* Checking if the user has a session token. If they do, it redirects them to the dashboard. */
  const { cookies } = ctx.req;
  const session = cookies["next-auth.session-token"];

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
