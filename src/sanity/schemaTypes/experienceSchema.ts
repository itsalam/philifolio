import { defineArrayMember, defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  // icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "role",
      type: "string",
    }),
    defineField({
      name: "startDate",
      type: "datetime",
      title: "Start Date",
    }),
    defineField({
      name: "endDate",
      type: "datetime",
      title: "End Date",
    }),
    defineField({
      name: "isOngoing",
      title: "Flag work experience as ongoing.",
      type: "boolean",
    }),
    defineField({
      name: "points",
      type: "array",
      of: [
        defineArrayMember({
          type: "text",
        }),
      ],
    }),
  ],
});
