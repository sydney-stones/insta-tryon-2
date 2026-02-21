export interface BlogPost {
  slug: string;
  title: string;
  meta_description: string;
  keyword: string;
  author: string;
  date: string;         // ISO: "2026-03-10"
  updated: string;      // ISO: "2026-03-10"
  category: string;
  pillar: boolean;
  reading_time: number; // minutes
  og_image?: string;    // defaults to /og-image.png
  content: string;      // raw markdown
}
