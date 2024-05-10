import clsx from "clsx";
import Accent from "./Accent";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1
        className={clsx(
          "text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
        )}
      >
        <Accent>Aidityas.</Accent>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Just a simple <Accent>personal</Accent> blog
      </h4>
    </section>
  );
}
