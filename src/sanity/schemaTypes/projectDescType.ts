import { defineArrayMember, defineField, defineType } from "sanity";

export const projectDescType = defineType({
  name: "projectDesc",
  title: "Project Description",
  // icon: ClipboardIcon,
  type: "document",
  fields: [
    defineField({
      name: "attributes",
      title: "Project Attributes",
      type: "array",
      description: "Define the attributes listed on the side of the CTA",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              title: "Label",
              name: "label",
              type: "string",
            },
            {
              title: "Description",
              name: "desc",
              type: "text",
            },
            {
              title: "Width",
              name: "isFullWidth",
              description: "Takes up full Width?",
              type: "boolean",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "descriptionBody",
      title: "Main Description",
      description: "Full Description when in the project view",
      type: "text",
    }),
    defineField({
      name: "shortDescBody",
      title: "Heading Description",
      description:
        "In view when scrolling through project thumbnails, and the main title in project view.",
      type: "text",
    }),
    defineField({
      name: "createdAt",
      hidden: true,
      readOnly: true,
      type: "date",
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      createdAt: "createdAt",
    },
    prepare(selection) {
      const { createdAt } = selection;
      return { title: new Date(createdAt).toDateString() };
    },
  },
});
