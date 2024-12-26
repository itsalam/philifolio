import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Me",
  type: "document",
  //   icon: UserIcon,
  fields: [
    defineField({
      name: "intro",
      title: "Introduction",
      description:
        "Will be shown at the hero introduction, wrap a word with !{word}! to add an associated images next to it.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "subIntro",
      title: "Sub Introduction",
      description:
        "Will be shown at the hero introduction, below the main intro.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      description: "will be displayed as badges in the About section",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "keyImage",
      title: "Intro key images",
      description:
        "will be displayed next to the words in the introduction wrapped with !x!, and will cycle if numerous images are shown.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "keyword", type: "string" },
            {
              name: "images",
              type: "array",
              of: [defineArrayMember({ type: "image" })],
            },
            {
              name: "placeBefore",
              description: "Place before the keyword?",
              type: "boolean",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutQuote",
      title: "About Text",
      description: "Text in the skills section, will fade in while scrolling.",
      type: "text",
    }),
    defineField({
      name: "aboutMe",
      title: "About Me description",
      description: "Text in the About page.",
      type: "text",
    }),
    defineField({
      name: "testamonials",
      title: "Testamonies",
      description: "Text in the About page.",
      type: "array",

      of: [
        defineArrayMember({
          preview: {
            select: {
              title: "personName",
              media: "avatar",
            },
          },
          type: "object",
          fields: [
            {
              type: "image",
              name: "avatar",
              options: {
                hotspot: true, // Optional, for cropping
              },
            },
            {
              type: "text",
              name: "testamony",
            },
            {
              type: "text",
              name: "personName",
            },
            {
              type: "text",
              name: "personRole",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      // Optionally select fields you might use for identification
      content: "content",
    },
    prepare(selection) {
      // You can display a static label or summary content here
      return {
        title: "About Me",
      };
    },
  },
});
