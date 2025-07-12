# PageHero Component

A reusable hero component for all pages except the home page. This component provides consistent styling and functionality across the application.

## Features

- **Customizable title and description**: Pass dynamic content based on the page
- **Dynamic breadcrumbs**: Automatically generated based on the current page
- **Localization support**: Works with both English and Arabic
- **Flexible height options**: Small, medium, and large heights
- **Optional search functionality**: For pages that need search (like projects)
- **Customizable background images**: Different images for different pages
- **Responsive design**: Works on all screen sizes

## Props

```typescript
interface PageHeroProps {
  title: string; // Page title
  description?: string; // Optional page description
  breadcrumbs: BreadcrumbItem[]; // Array of breadcrumb items
  backgroundImage?: string; // Background image URL
  height?: "small" | "medium" | "large"; // Height variant
  showDescription?: boolean; // Whether to show description
  showSearch?: boolean; // Whether to show search input
  searchPlaceholder?: string; // Search placeholder text
  onSearchChange?: (value: string) => void; // Search change handler
}

interface BreadcrumbItem {
  label: string; // Breadcrumb label
  href?: string; // Optional link URL
}
```

## Usage Examples

### Standard Hero (About, Contact, FAQs, Blogs)

```tsx
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";

const MyPage = () => {
  const t = useTranslations("page_key");
  const locale = useLocale();

  return (
    <PageHero
      title={t("title")}
      description={t("description")}
      breadcrumbs={[
        { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
        { label: t("title") },
      ]}
      backgroundImage="/images/home/banner1.png"
      height="medium"
    />
  );
};
```

### Hero with Search (Projects)

```tsx
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";

const ProjectsPage = () => {
  const t = useTranslations("projects");
  const locale = useLocale();

  const handleSearchChange = (value: string) => {
    // Handle search logic
    console.log("Search:", value);
  };

  return (
    <PageHero
      title={t("name")}
      backgroundImage="/images/home/projects-bg.jpg"
      height="medium"
      showSearch={true}
      searchPlaceholder={t("search_placeholder")}
      showDescription={false}
      breadcrumbs={[
        { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
        { label: t("title") },
      ]}
      onSearchChange={handleSearchChange}
    />
  );
};
```

### Hero without Description

```tsx
<PageHero
  title={t("title")}
  breadcrumbs={[
    { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
    { label: t("title") },
  ]}
  backgroundImage="/images/home/banner2.png"
  height="small"
  showDescription={false}
/>
```

## Height Variants

- **small**: `h-[35vh] md:h-[45vh]` - For pages with minimal content
- **medium**: `h-[45vh] md:h-[65vh]` - Default height for most pages
- **large**: `h-[60vh] md:h-[80vh]` - For pages that need more visual impact

## Translation Keys

Make sure to add the following translation keys to your locale files:

### English (en.json)

```json
{
  "page_key": {
    "title": "Page Title",
    "description": "Page description text"
  }
}
```

### Arabic (ar.json)

```json
{
  "page_key": {
    "title": "عنوان الصفحة",
    "description": "وصف الصفحة"
  }
}
```

## Implementation Status

The PageHero component has been successfully implemented on the following pages:

- ✅ About page (`/about`)
- ✅ Contact page (`/contact`)
- ✅ Blogs page (`/blogs`)
- ✅ FAQs page (`/fqas`)
- ✅ Projects page (`/projects`) - with search functionality

## Notes

- The home page uses a different hero component (`src/components/home/Hero.tsx`) with unique functionality
- Individual project pages (`/projects/[id]`) and blog detail pages (`/blogs/[blog-slug]`) have their own specialized layouts
- The component automatically handles RTL layout for Arabic language
- Breadcrumbs are automatically localized based on the current locale
