"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { getTeamMember } from "@/libs/helpers/teamData";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import { notFound } from "next/navigation";
import SocialIcons from "@/components/SocialIcons";

interface TeamMemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TeamMemberPage = ({ params }: TeamMemberPageProps) => {
  const t = useTranslations("our_team");
  const locale = useLocale();
  const resolvedParams = React.use(params);
  const member = getTeamMember(resolvedParams.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="">
      {/* Hero Section */}
      <PageHero
        title={member.name[locale as keyof typeof member.name]}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title"), href: "/our-team" },
          { label: member.name[locale as keyof typeof member.name] },
        ]}
        backgroundImage="/images/home/team-bc.jpg"
        height="small"
        hideDescription={true}
      />

      {/* Main Content */}
      <div className="w-full py-20 rounded-3xl relative z-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 pb-20 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-5 lg:gap-20">
            {/* Left Column - Sticky Image */}
            <div className="md:sticky md:top-30 md:h-fit relative">
              <div className="rounded-3xl">
                <Image
                  src={member.image}
                  alt={member.name[locale as keyof typeof member.name]}
                  width={1000}
                  height={1000}
                  className="object-contain object-center w-[90%] sm:w-[70%] mx-auto rounded-3xl lg:w-[80%]"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-12">
              {/* About Section */}
              <section>
                <span className="text-sm bg-[#dba426] text-white px-5 py-2 rounded-full uppercase font-[600]">
                  {member.job[locale as keyof typeof member.job]}
                </span>
                <h3 className="text-[30px] lg:text-[50px] font-[700] text-gray-900 my-6">
                  {member.name[locale as keyof typeof member.name]}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-[500]">
                  {member.about[locale as keyof typeof member.about]}
                </p>
              </section>

              <section>
                {/* Contact Info */}
                <div className="">
                  <h2 className="text-[18px] font-[600] text-gray-400">
                    Email Address
                  </h2>
                  <ul className="text-lg">
                    <li className="border-b border-gray-200 pb-4 pt-0">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-[16px] hover:text-[#dba426] transition-colors duration-300 font-[600]"
                      >
                        {member.email}
                      </a>
                    </li>
                    <li className="border-b border-gray-200 py-4 flex justify-between items-center">
                      <a
                        href={`tel:${member.phone}`}
                        className="text-[16px] hover:text-[#dba426] transition-colors duration-300 font-[600]"
                      >
                        {member.phone}
                      </a>

                      {/* Social Links */}
                      {Object.keys(member.social).length > 0 && (
                        <div className="">
                          <SocialIcons
                            social={member.social}
                            size="sm"
                            className="p-0 m-0 bg-transparent "
                          />
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </section>

              {/* Cover Letter Section */}
              <section>
                <h3 className="text-[30px] font-[700] text-gray-900 mb-6">
                  {t("about_me")}
                </h3>
                <div className="">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    &quot;
                    {
                      member.coverLetter[
                        locale as keyof typeof member.coverLetter
                      ]
                    }
                    &quot;
                  </p>
                </div>
              </section>

              {/* Experience Section */}
              <section>
                <div className="space-y-4">
                  {member.experience[
                    locale as keyof typeof member.experience
                  ].map((exp, index) => (
                    <div key={index} className="flex gap-3 px-5">
                      <div className="w-1 h-1 bg-[#dba426] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[18px] font-[600] leading-relaxed">
                        {exp}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Achievements Section */}
              <section>
                <div className="">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    &quot;
                    {
                      member.coverLetter[
                        locale as keyof typeof member.coverLetter
                      ]
                    }
                    &quot;
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage;
