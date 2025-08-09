import PageHero from "@/components/PageHero";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import { getTranslations } from "next-intl/server";
import React from "react";
import { getAllTeamMembers } from "@/libs/helpers/teamData";
import TeamMemberCard from "@/components/TeamMemberCard";
import { AnimatedElement } from "@/components/animations/AnimationType";
import SectionButton from "@/components/SharedComponent/SectionButton";
import { UsersIcon } from "lucide-react";

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("our_team");
  const teamMembers = getAllTeamMembers();


  return (
    <div>
      <PageHero
        title={t("title")}
        // description={t("description")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title") },
        ]}
        backgroundImage="/header__team.webp"
        height="medium"
      />
      {/* BOARD OF DIRECTORS */}
      <section className="pt-30 px-4 pb-60 relative z-10 bg-white rounded-b-3xl">
        <div className="mx-auto text-center mb-12 leading-none">
          <div className="flex justify-center">
            <SmallHeadSpan>{t("title")}</SmallHeadSpan>
          </div>
          <AnimatedElement
            type="slideUp"
            duration={1}
            className="w-full h-full"
          >
            <h2 className="text-[70px] font-semibold">
              <p>{t("global_executive")}</p>
              <p>{t("leadership")}</p>
            </h2>
          </AnimatedElement>
        </div>
        <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 gap-y-25 gap-x-5">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} variant="compact" />
          ))}
        </div>

        <div className="bottom flex md:flex-row flex-col space-y-10 md:space-y-0 justify-between items-center max-w-5xl mx-auto mt-60">
          <div className="left">
            <div className="img w-full h-full opacity-50">
              <img src="/team1.png" alt="team" />
            </div>
          </div>
          <div className="center flex flex-col justify-center items-center">
            <div className="join p-5 rounded-full bg-[#DBA426] h-[250px] w-[250px] flex flex-col justify-center items-center text-center space-y-2">
              <div className="icon">
                <UsersIcon className="w-10 h-10" />
              </div>
              <div className="sub-title">
                <h2 className="text-md uppercase font-[500]">
                  {t("join_our_team")}
                </h2>
              </div>
              <div className="title">
                <h2 className="text-xl font-bold px-5">
                  {t("start_a_career_with_excellent_benefits")}
                </h2>
              </div>
            </div>
            <div className="btn mt-[-20px]">
              <SectionButton href="/contact">
                {t("current_openings")}
              </SectionButton>
            </div>
          </div>

          <div className="right">
            <div className="img w-full h-full opacity-50">
              <img src="/team2.png" alt="team" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
