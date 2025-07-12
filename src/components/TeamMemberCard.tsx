import React from "react";
import { useLocale } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { TeamMember } from "@/libs/helpers/teamData";
import { AnimatedElement } from "./animations/AnimationType";

interface TeamMemberCardProps {
  member: TeamMember;
  showSocial?: boolean;
  variant?: "default" | "compact";
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  showSocial = false,
  variant = "default",
}) => {
  const locale = useLocale();

  if (variant === "compact") {
    return (
      <AnimatedElement type="slideUp" duration={1} className="w-full h-full">
        <div className="group relative rounded-3xl">
          {/* shapes */}
          <div className="cover z-10 absolute top-0 left-0 w-full h-full">
            <div
              className="absolute top-[54px] right-[0px] bg-white w-[30px] h-[30px] rounded-br-2xl rotate-[180deg]"
              style={{
                clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
              }}
            ></div>
            <div className="absolute top-0 right-0 bg-white w-[55px] h-[55px] rounded-bl-3xl"></div>
            <div
              className="absolute top-[-1px] right-[54px] bg-white w-[30px] h-[30px] rounded-br-2xl rotate-[180deg]"
              style={{
                clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
              }}
            ></div>
          </div>

          {/* floating button */}
          <div className="floating-button absolute top-0 right-0 z-10 text-white">
            <Link
              href={`/${locale}/our-team/${member.id}`}
              className="bg-[#dba426] group-hover:bg-black rounded-full p-2 flex items-center justify-center rotate-[-45deg] hover:rotate-[315deg] transition-all duration-300"
            >
              <ArrowRightIcon className="w-7 h-7" />
            </Link>
          </div>

          <div className="h-[500px] relative overflow-hidden rounded-3xl">
            <img
              src={member.image}
              alt={member.name[locale as keyof typeof member.name]}
              className="w-full h-full object-contain bg-black object-center transition-all grayscale-40 group-hover:grayscale-0 duration-400 cursor-pointer group-hover:scale-110"
            />
          </div>
          <div className="p-6 w-[80%] text-white flex flex-col justify-center items-center text-center absolute bottom-[-50px] left-1/2 -translate-x-1/2 bg-black/0 backdrop-blur-[30px] z-10 rounded-3xl">
            <p className="text-[14px] font-[500]">
              {member.job[locale as keyof typeof member.job]}
            </p>
            <Link href={`/${locale}/our-team/${member.id}`}>
              <h3 className="text-[20px] xl:text-[24px] font-[600] mb-0 hover:text-[#dba426] transition-all duration-300">
                {member.name[locale as keyof typeof member.name]}
              </h3>
            </Link>
          </div>
        </div>
      </AnimatedElement>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-80">
        <img
          src={member.image}
          alt={member.name[locale as keyof typeof member.name]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-1">
            {member.name[locale as keyof typeof member.name]}
          </h3>
          <p className="text-sm text-gray-200">
            {member.job[locale as keyof typeof member.job]}
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {member.about[locale as keyof typeof member.about]}
        </p>

        {showSocial && Object.keys(member.social).length > 0 && (
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              {Object.entries(member.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#035B8D] hover:bg-black rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <span className="text-white text-xs font-bold">
                    {platform.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/our-team/${member.id}`}
          className="block w-full bg-[#035B8D] hover:bg-black text-white text-center py-3 rounded-lg transition-colors duration-300"
        >
          {locale === "en" ? "View Profile" : "عرض الملف الشخصي"}
        </Link>
      </div>
    </div>
  );
};

export default TeamMemberCard;
