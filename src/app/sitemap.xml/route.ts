import { NextResponse } from "next/server";
import { AxiosHeaders } from "axios";
import { getData } from "@/libs/axios/server";
import { getAllTeamMembers } from "@/libs/helpers/teamData";

const baseUrl = "https://www.arxeg.com"; // Replace with your domain
const locales = ["en", "ar"];

const staticPaths = ["", "/about", "/contact", "/faqs", "/projects", "/blogs", "/services", "/core-values", "/our-team"];

async function getAllBlogs(locale: string) {
  try {
    const response = await getData(
      "blogs",
      {},
      new AxiosHeaders({ lang: locale })
    );
    // Ensure we return an array
    return Array.isArray(response?.data?.blogs) ? response.data.blogs : [];
  } catch (error) {
    console.error(`Error fetching blogs for ${locale}:`, error);
    return [];
  }
}

async function getAllProjects(locale: string) {
  try {
    const response = await getData(
      "properties",
      {},
      new AxiosHeaders({ lang: locale })
    );
    // Ensure we return an array
    return Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching projects for ${locale}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const urls: string[] = [];

    // Static localized pages
    for (const locale of locales) {
      for (const path of staticPaths) {
        urls.push(`${baseUrl}/${locale}${path}`);
      }
    }

    // Dynamic localized blogs
    for (const locale of locales) {
      const blogs = await getAllBlogs(locale);
      // Double-check that blogs is iterable
      if (Array.isArray(blogs)) {
        for (const blog of blogs) {
          if (blog?.slug) {
            urls.push(`${baseUrl}/${locale}/blogs/${blog.slug}`);
          }
        }
      }
    }

    // Dynamic localized projects
    for (const locale of locales) {
      const projects = await getAllProjects(locale);
      // Double-check that projects is iterable
      if (Array.isArray(projects)) {
        for (const project of projects) {
          if (project?.slug) {
            urls.push(`${baseUrl}/${locale}/projects/${project.slug}`);
          }
        }
      }
    }

    // Dynamic localized team members
    try {
      const teamMembers = getAllTeamMembers();
      // Ensure teamMembers is iterable
      if (Array.isArray(teamMembers)) {
        for (const locale of locales) {
          for (const teamMember of teamMembers) {
            if (teamMember?.id) {
              urls.push(`${baseUrl}/${locale}/our-team/${teamMember.id}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    }

    // Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap with just static pages if there's an error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales.flatMap(locale => 
  staticPaths.map(path => `
  <url>
    <loc>${baseUrl}/${locale}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
).join("")}
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800"
      },
    });
  }
}