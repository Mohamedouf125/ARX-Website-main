// libs/api/testimonials.ts
import { AxiosHeaders } from "axios";
import { getData } from "@/libs/axios/server";

export async function getTestimonials(locale: string) {
  try {
    const response = await getData(
      "testimonials",
      {},
      new AxiosHeaders({
        lang: locale,
      })
    );
    return response.data.testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}
