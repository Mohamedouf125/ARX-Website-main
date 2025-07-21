"use client";
import { Link } from "@/i18n/routing";
import { ProjectType } from "@/libs/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProjectCard = ({ project }: { project?: ProjectType }) => {
  const t = useTranslations("projects");

  console.log(project?.cover);

  return (
    <div
      className={`w-full relative h-[500px] overflow-hidden flex items-end rounded-3xl group cursor-pointer`}
    >
      <div
        className={`w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-between p-8 rounded-3xl relative`}
      >
        <div className="absolute top-0 left-0 w-full h-full transition-all duration-300 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black/90 after:rounded-3xl after:z-0">
          <Image
            src={project?.cover || ""}
            alt={project?.title || "Axiom Tower"}
            className="w-full h-full object-cover object-center rounded-3xl scale-130 group-hover:translate-x-[50px] transition-all duration-300"
            width={700}
            height={700}
          />
        </div>

        <div className="flex justify-start z-10">
          <span className="bg-[#dba426] text-white font-[500] text-[12px] px-6 py-2 rounded-full uppercase">
            {t("under_construction")}
          </span>
        </div>

        <div className="z-10 w-full text-white">
          <div className="">
            <div className="">
              <div className="flex items-center gap-1 border-b border-white pb-3 mb-5">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99935 7.99967C7.26602 7.99967 6.66602 7.39967 6.66602 6.66634C6.66602 5.93301 7.26602 5.33301 7.99935 5.33301C8.73268 5.33301 9.33268 5.93301 9.33268 6.66634C9.33268 7.39967 8.73268 7.99967 7.99935 7.99967ZM11.9993 6.79967C11.9993 4.37967 10.2327 2.66634 7.99935 2.66634C5.76602 2.66634 3.99935 4.37967 3.99935 6.79967C3.99935 8.35967 5.29935 10.4263 7.99935 12.893C10.6993 10.4263 11.9993 8.35967 11.9993 6.79967ZM7.99935 1.33301C10.7993 1.33301 13.3327 3.47967 13.3327 6.79967C13.3327 9.01301 11.5527 11.633 7.99935 14.6663C4.44602 11.633 2.66602 9.01301 2.66602 6.79967C2.66602 3.47967 5.19935 1.33301 7.99935 1.33301Z"
                    fill="#dba426"
                  />
                </svg>
                <div className="text-[16px] font-[600] capitalize">
                  {project?.location}
                </div>
              </div>

              <div className="flex justify-start">
                <Link
                  href={`projects/${project?.slug}`}
                  className="text-[40px] font-[600] capitalize hover:text-[#dba426] transition-all duration-300 flex justify-start"
                >
                  {project?.title}
                </Link>
              </div>
              {/* <div
                className="text-[18px] font-[400] uppercase"
                dangerouslySetInnerHTML={{ __html: project?.hero_title || "" }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
