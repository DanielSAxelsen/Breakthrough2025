import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="py-20 bg-slate-900 relative mt-20">
      <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
        <div className="flex flex-col gap-y-4 w-full col-span-1">
          <h3 className="text-4xl text-white">BREAKTHROUGH</h3>
          <p
            className="text-white"
            dangerouslySetInnerHTML={{ __html: t.raw("date_location") }}
          />
          <p className="text-white">
            {t("contact")}{" "}
            <a
              href="mailto:danielsaxelsen@gmail.com"
              className="text-white underline"
            >
              danielsaxelsen@gmail.com
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-y-4 col-span-1">
          <h3 className="text-xl text-white">{t("acknowledgements.title")}</h3>
          <p className="text-white text-xs">
            {t("acknowledgements.description")}
          </p>
          <p className="text-white text-xs">
            {t("acknowledgements.special_thanks")}
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;

