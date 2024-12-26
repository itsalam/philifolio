import { defineQuery } from "next-sanity";
import { client } from "./client";

export type ThumbnailProject = Awaited<
  ReturnType<typeof getProjectThumbnailInfo>
>[number];

export const getProjectThumbnailInfo = async (slug?: string) => {
  const queryProjectThumbnail =
    defineQuery(`*[_type == "project" && (!defined($slug) || slug.current != $slug)] | order(_createdAt asc, inComplete desc){
  _id, 
  title, 
  slug, 
  thumbnails,
  inComplete,
  description->{
    shortDescBody,
    tags
  }
}`);
  const result = await client.fetch(queryProjectThumbnail, {
    slug: slug ?? null,
  });
  return result;
};

export type ProjectInfo = Awaited<ReturnType<typeof getProjectsPageInfo>>;

export const getProjectsPageInfo = async (slug: string) => {
  const queryProjectInfo =
    defineQuery(`*[_type == "project" && (!defined($slug) || slug.current == $slug)][0]{
      _id, 
      title, 
      slug, 
      thumbnails, 
      mainImage,
      url,
      inComplete, 
      appleLink,
      androidLink,
      description->{
        attributes,
        descriptionBody,
        shortDescBody
      },
      projectInfo[]{
        ...,
        "screens": screens[]{
          ...,
          "asset": asset->url
        }
      }
    }`);
  const result = await client.fetch(queryProjectInfo, { slug });
  return result;
};

export type HomePageInfo = Awaited<ReturnType<typeof getHomePageInfo>>;

export const getHomePageInfo = async () => {
  const queryHomePageInfo = defineQuery(`*[_type == "about"][0]{
  _id, 
  keyImage,
  intro,
  subIntro,
  skills,
  aboutQuote,
  aboutMe,
  testamonials[]{
    personName,
    personRole,
    testamony,
    "avatar": avatar.asset->url
  },
}`);
  const result = await client.fetch(queryHomePageInfo);
  return result;
};

export type SkilLSectionInfo = Awaited<ReturnType<typeof getSkillSectionInfo>>;

export const getSkillSectionInfo = async () => {
  const querySkillSectionInfo = defineQuery(`*[_type == "about"][0]{
  _id, 
  skills,
  aboutQuote
}`);
  const result = await client.fetch(querySkillSectionInfo);
  return result;
};

export type AboutPageInfo = Awaited<ReturnType<typeof getAboutPageInfo>>;

export const getAboutPageInfo = async () => {
  const queryAboutPageInfo = defineQuery(`*[_type == "about"][0]{
  _id, 
  aboutMe,
  testamonials[]{
    personName,
    personRole,
    testamony,
    "avatar": avatar.asset->url
  },
  keyImage
}`);
  const result = await client.fetch(queryAboutPageInfo);
  return result;
};

export type Experience = Awaited<ReturnType<typeof getExperiences>>[number];

export const getExperiences = async () => {
  const queryExperiences =
    defineQuery(`*[_type == "experience"] | order(startDate desc){
  _id, 
  title,
  role,
  startDate,
  endDate,
  isOngoing,
  points
}`);
  const result = await client.fetch(queryExperiences);
  return result;
};
