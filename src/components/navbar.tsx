"use client";

import Button from "@/components/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = useTranslations("NavBar");
  return (
    <div className="absolute w-full h-36 z-20">
      {/* Desktop */}
      <div className="md:flex justify-between mx-10 my-8 hidden">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-wider text-white"
        >
          BREAKTHROUGH
        </Link>
        <div className="flex gap-x-14 items-center">
          <Link
            href="/#story"
            className="text-white border-b-2 border-b-transparent active:border-white  focus:border-white transition-all"
          >
            {t("our_story")}
          </Link>
          <Link
            href="/practical-info"
            className="text-white border-b-2 border-b-transparent active:border-white  focus:border-white transition-all"
          >
            {t("practical_info")}
          </Link>
          <Button href="/rsvp" label={t("rsvp")} className="tracking-widest" />
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between mx-10 my-8">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-wider text-white"
        >
          BREAKTHROUGH
        </Link>

        <Menu
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          size={30}
          className="text-white"
        />

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent className="pt-24">
            <DialogTitle className="hidden">Mobile Sidebar</DialogTitle>
            <div className="flex flex-col gap-y-4 items-start">
              <Link
                href="/#story"
                className="text-slate-900 border-b-2 border-b-transparent active:border-slate-900  focus:border-slate-900 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("our_story")}
              </Link>
              <Link
                href="/practical-info"
                className="text-slate-900 border-b-2 border-b-transparent active:border-slate-900  focus:border-slate-900 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("practical_info")}
              </Link>
              <Button
                href="/rsvp"
                label={t("rsvp")}
                className="invert tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
