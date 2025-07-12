import AboutHome from "@/components/home/AboutHome";
import Hero from "@/components/home/Hero";
import HomeContact from "@/components/home/HomeContact";
import OurBlogs from "@/components/home/OurBlogs";
import { OurProjects } from "@/components/home/OurProjects";
import OurServices from "@/components/home/OurServices";
import ShortsPage from "@/components/home/OurShorts";
import SupportersPage from "@/components/home/Supporters";
import WhoWeAre from "@/components/home/WhoWeAre";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import Testimonial from "@/components/home/Testimonial";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const feachData = async () => {
    const { locale } = await params;
    try {
      const response = await getData(
        "home",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const HomeData = await feachData();
  // console.log(HomeData);



  return (
    <div>
      <Hero projects={HomeData.projects} />
      <WhoWeAre />
      <AboutHome />
      <OurServices />
      <OurProjects projects={HomeData.projects} />
      <ShortsPage shorts={HomeData.our_videos} />
      <SupportersPage />
      <OurBlogs blogs={HomeData.blogs} />
      <HomeContact />
      <Testimonial testimonials={HomeData.testimonials} />
    </div>
  );
}
