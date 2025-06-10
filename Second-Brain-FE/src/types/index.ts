// src/types/index.ts
export interface Content {
  _id: string;
  type: "youtube" | "twitter" | "document" | "Link";
  link: string;
  title: string;
  description: string;
  tags: { title: string }[];
}
