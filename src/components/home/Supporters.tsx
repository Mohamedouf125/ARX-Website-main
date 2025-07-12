import React from "react";
import Image from "next/image";
import partnersImg from "../../../public/images/home/Our Partners.png";
import { useTranslations } from "next-intl";
import { AnimatedElement } from "../animations/AnimationType";

const SupportersPage: React.FC = () => {
  const t = useTranslations("supporters");
  return (
    <section className="bg-gray-100 py-20">
      {/* Our Partners Image below metrics */}
      <div className="relative flex flex-col justify-center items-center">
        <div className="head text-center text-gray-900 max-w-2xl mb-10 px-8">
          <span className="text-xl font-bold font-[Cinzel]">
            {t("our_partners")}
          </span>
        </div>

        <AnimatedElement type="slideUp" duration={1} className="w-full h-full flex justify-center items-center">
          <Image
            src={partnersImg}
            alt="Our Partners"
            width={700}
            height={150}
          />
        </AnimatedElement>
      </div>
    </section>
  );
};

export default SupportersPage;
