import Link from "next/link";
import localFont from "next/font/local";

import {cn} from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <p className={cn(
          "text-lg text-white pb-1",
          headingFont.className,
        )}>
          Mentor
        </p>
      </div>
    </Link>
  );
};
