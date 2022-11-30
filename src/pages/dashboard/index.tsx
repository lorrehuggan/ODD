import { GetServerSideProps } from "next";
import Layout from "../../components/dashboard/layout";

const Dashboard = () => {

  return (
    <Layout />
  )
}

export default Dashboard


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* Checking if the user has a session token. If they do, it redirects them to the dashboard. */
  const { cookies } = ctx.req;
  const session = cookies["next-auth.session-token"];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
