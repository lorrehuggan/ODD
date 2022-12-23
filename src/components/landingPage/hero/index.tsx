import Button from "@components/ui/button/inde";
import { useSession, signIn, signOut } from "next-auth/react";

const Hero = () => {
  return (
    <section className="landing-container pt-8">
      <div>
        <h1 className="text-4xl font-black tracking-tighter xl:text-9xl">
          The finance{" "}
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            tracking
          </span>{" "}
          platform for service nomads
        </h1>
        <h4 className="mt-8 text-xl">
          Effortlessly track your irregular income and expenses with our finance
          tracking app
        </h4>
      </div>
      <div>
        <p className="mt-8">{`Are you tired of struggling to keep track of your finances due to irregular income? Our finance tracking app is specifically designed for people in odd jobs, freelancers, and anyone else with irregular income. With our app, you can easily track your income and expenses, set budget goals, and get a clear picture of your financial health. Plus, with our convenient categorization tools, you can easily stay organized and on top of your finances.`}</p>
        <p className="mt-2">{`Don't let irregular income hold you back from financial stability - sign up for our finance tracking app today and take control of your finances.`}</p>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <a className="rounded-md bg-base-dark-300 p-2">Get Started</a>
      </div>
    </section>
  );
};

export default Hero;
