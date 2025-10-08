import dynamic from "next/dynamic";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";

// Dynamic imports for better performance
const Hero = dynamic(() => import("@/components/home/Hero"), {
  loading: () => <div className="h-screen bg-gray-100 animate-pulse" />,
});

const WhoWeAre = dynamic(() => import("@/components/home/WhoWeAre"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const AboutHome = dynamic(() => import("@/components/home/AboutHome"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const OurServices = dynamic(() => import("@/components/home/OurServices"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const OurProjects = dynamic(
  () =>
    import("@/components/home/OurProjects").then((mod) => ({
      default: mod.OurProjects,
    })),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  }
);

const ShortsPage = dynamic(() => import("@/components/home/OurShorts"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const SupportersPage = dynamic(() => import("@/components/home/Supporters"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const OurBlogs = dynamic(() => import("@/components/home/OurBlogs"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const HomeContact = dynamic(() => import("@/components/home/HomeContact"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

const Testimonial = dynamic(() => import("@/components/home/Testimonial"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

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
      <Hero banners={HomeData?.sliders} />
      <WhoWeAre bannerWho={HomeData?.bannerWho?.image} />
      <AboutHome bannerAbout={HomeData?.bannerAbout?.image} />

      <OurServices services={HomeData?.main_focus} />

      <OurProjects projects={HomeData?.projects} />
      <ShortsPage shorts={HomeData?.our_videos} />
      <SupportersPage />
      <OurBlogs blogs={HomeData?.blogs} />
      <HomeContact contact={HomeData?.bannerQuickEnquiry.image} />

      <Testimonial testimonials={HomeData?.testimonials} />
    </div>
  );
}
