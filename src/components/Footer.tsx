import React, { ForwardedRef } from "react";

const Footer = React.forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => (
  <footer
    ref={ref}
    className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-8 bg-neutral-950 p-6"
  >
    <p className="max-w-96 text-center text-sm text-neutral-400">
      This is a non-commercial project created for educational purposes. Movies
      cannot be purchased here, and all prices are randomly generated to
      simulate a real movie store.
    </p>
    <p className="text-neutral-200">
      Made with ❤️ by{" "}
      <a
        className="font-bold text-amber-400"
        href="https://github.com/michalwachowicz"
        target="_blank"
        rel="noopener noreferrer"
      >
        Michał Wachowicz
      </a>
    </p>
  </footer>
));

export default Footer;
