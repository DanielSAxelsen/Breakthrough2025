import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="py-20 bg-slate-900 relative mt-20">
      <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
        <div className="flex flex-col gap-y-4 w-full col-span-1">
          <h3 className="text-4xl text-white">BREAKTHROUGH</h3>
          <p className="text-white">
            May 25, 2025, Sunday, 10:00 — Mantzius - Johan Mantzius Vej 3, 3460 Birkerød
          </p>
          <p className="text-white">
            {t("contact")}{" "}
            <a
              href="mailto:danielsaxelsen@gmail.com"
              className="text-white underline"
            >
              danielsaxelsen@gmail.com
            </a>
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/breakthroughevent/?hl=da"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span>{t("follow_instagram")}</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 col-span-1">
          <h3 className="text-xl text-white">{t("acknowledgements.title")}</h3>
          <p className="text-white text-xs">
            {t("acknowledgements.description")}
          </p>
          <p
            className="text-white text-xs"
            dangerouslySetInnerHTML={{ __html: t.raw("acknowledgements.special_thanks") }}
          />
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;


