import { Link } from "react-router-dom";
import Logo from "@/Assets/images/logo/logo.svg?react";

import bgLgWebp from "@/Assets/images/error-bg/lg/error-bg-lg.webp";
import bgLgJpg from "@/Assets/images/error-bg/lg/error-bg-lg.jpg";

import bgMdWebp from "@/Assets/images/error-bg/md/error-bg-md.webp";
import bgMdJpg from "@/Assets/images/error-bg/md/error-bg-md.jpg";

import bgSmWebp from "@/Assets/images/error-bg/sm/error-bg-sm.webp";
import bgSmJpg from "@/Assets/images/error-bg/sm/error-bg-sm.jpg";

const ErrorPage = () => (
  <div className="fixed flex h-full w-full items-center justify-center p-6">
    <section className="flex max-w-xl flex-col items-center gap-8 rounded-lg bg-neutral-900 p-9 shadow-lg">
      <Logo className="h-auto w-full max-w-52" aria-label="FlickStore" />
      <div>
        <h1 className="text-center text-2xl font-bold text-neutral-200">
          The page was not found.
        </h1>
        <p className="mt-4 text-center text-neutral-300">
          Sorry. The page you are looking for was not found.
        </p>
      </div>
      <Link
        to="/"
        role="button"
        className="w-full rounded-lg bg-amber-400 p-3 text-center text-xl font-bold text-neutral-950"
      >
        Go to the homepage
      </Link>
    </section>
    <div className="fixed -z-10 h-full w-full">
      <div className="fixed inset-x-0 top-0 z-10 h-full w-full bg-neutral-950 opacity-80" />
      <picture>
        <source
          srcSet={bgLgWebp}
          type="image/webp"
          media="(min-width: 3600px)"
        />
        <source
          srcSet={bgLgJpg}
          type="image/jpeg"
          media="(min-width: 3600px)"
        />

        <source
          srcSet={bgMdWebp}
          type="image/webp"
          media="(min-width: 1700px)"
        />
        <source
          srcSet={bgMdJpg}
          type="image/jpeg"
          media="(min-width: 1700px)"
        />

        <source srcSet={bgSmWebp} type="image/webp" />
        <source srcSet={bgSmJpg} type="image/jpeg" />

        <img
          src={bgSmJpg}
          alt=""
          className="fixed h-full w-full animate-moveBg object-cover"
        />
      </picture>
    </div>
  </div>
);

export default ErrorPage;
