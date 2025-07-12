import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { getAllTeamMembers } from "@/libs/helpers/teamData";
import TeamMemberCard from "@/components/TeamMemberCard";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  limit?: number;
  variant?: "default" | "compact";
  className?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  subtitle,
  showViewAll = true,
  limit,
  variant = "compact",
  className = "",
}) => {
  const t = useTranslations("our_team");
  const locale = useLocale();
  const teamMembers = getAllTeamMembers();

  const displayMembers = limit ? teamMembers.slice(0, limit) : teamMembers;

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <div className="flex justify-center mb-4">
              <SmallHeadSpan>{title}</SmallHeadSpan>
            </div>
          )}
          <h2 className="text-[50px] lg:text-[60px] xl:text-[70px] font-semibold mb-4">
            {subtitle || (
              <>
                <p>{t("global_executive")}</p>
                <p>{t("leadership")}</p>
              </>
            )}
          </h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 gap-y-25 gap-x-5 mb-12">
          {displayMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} variant={variant} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center">
            <Link
              href="/our-team"
              className="inline-flex items-center gap-2 bg-[#035B8D] hover:bg-black text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold"
            >
              <span>
                {locale === "en"
                  ? "View All Team Members"
                  : "عرض جميع أعضاء الفريق"}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
