// "use client";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import ProjectsClient from "./ProjectsClient";

const ProjectsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations("projects");

  const feachData = async () => {
    try {
      const response = await getData(
        "properties",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const projects = await feachData();

  console.log("projects", projects);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section with Search */}
      <PageHero
        title={t("name")}
        backgroundImage={"/project__header.webp"}
        height="small"
        hideDescription={true}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("name") },
        ]}
      />

      <ProjectsClient projects={projects.properties} />
    </div>
  );
};

export default ProjectsPage;
