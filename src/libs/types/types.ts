export interface ProjectType {
  project_type: string;
  project_status: string;
  id: number;
  propert_listing_no: string | null;
  image: string;
  hero_image: string;
  cover: string;
  icon: string;
  home_area: string;
  year_built: string;
  brochure: string;
  start_price: string;
  end_price: string;
  title: string;
  hero_title: string;
  description: string;
  keywords: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  catigories: string;
  location: string;
  location_link: string;
  features: Array<{
    id?: number;
    key?: string;
    value?: string;
  }>;
  amenities: Array<{
    id: number;
    type: string;
    title: string;
  }>;
  property_floor_plans: Array<{
    id: number;
    property_listing_id: number;
    image: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  }>;
  property_listing_images: Array<{
    id: number;
    image: string;
  }>;
  property_payment_plans: Array<{
    id: number;
    down_payment: string;
    monthly_payment: string;
    years: string;
    text: string;
  }>;
  property_listing_videos: Array<{
    id: number;
    video: string;
    type: string;
  }>;
}



export interface BlogType{
    id: number;
    image: string;
    cover: string;
    title: string;
    description: string;
    keywords: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    category?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ServiceTypes{
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface BannerTypes{
    id: number;
    type: string;
    image: string;
    title: string;
    description: string;
  
}

export interface TestimonialType{
    id: number;
    image: string;
    name: string;
    role: string;
    description: string;
    
}
export interface ShortsTypes{
    id: number;
    video: string;
    background: string;
    title?: string;
    location?: string;
    thumbnail?: string;
}

export interface FQAType {
  id: number;
  request: string;
  response: string;
}
