import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  // icon: BookText as ComponentType,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "inComplete",
      title: "Is project posting under construction?",
      type: "boolean",
    }),
    defineField({
      name: "url",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "appleLink",
      title: "Apple App store URL",
      type: "url",
    }),
    defineField({
      name: "androidLink",
      title: "Andriod Apps store URL",
      type: "url",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "description",
      type: "reference",
      to: { type: "projectDesc" },
    }),
    defineField({
      name: "thumbnails",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "screens",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Main text caption",
            },
            {
              name: "subCaption",
              type: "text",
              title: "Subtext caption",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "projectInfo",
      title: "ProjectInfo",
      type: "array",
      description: "Document data after the Hero",
      // icon: BookText,
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "thumbnails[0]",
            },
          },
          fields: [
            {
              name: "title",
              type: "string",
              title: "Info Title",
            },
            {
              name: "subtitle",
              type: "string",
              title: "Secondary Title",
            },
            {
              name: "invertedIsland",
              type: "boolean",
              title: "Display as Inverted Island?",
              description:
                "invert theming and wrap in island? Brings attention to the following info.",
            },
            {
              name: "desciption",
              type: "text",
              title: "Info Description",
              description: "",
            },
            {
              name: "thumbnails",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    { name: "title", type: "string" },
                    {
                      name: "alt",
                      type: "string",
                      title: "Alternative text",
                    },
                  ],
                }),
              ],
            },
            {
              name: "points",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    {
                      name: "subHeader",
                      type: "string",
                      title:
                        "Sub header in all caps and in a smaller font to categorize the point.",
                    },
                    {
                      name: "title",
                      type: "string",
                      title:
                        "Title header in accented color and larger font to label the point.",
                    },
                    {
                      title: "Rich text description body",
                      name: "description",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                  ],
                }),
              ],
            },
            {
              name: "metrics",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      type: "string",
                      title: "Metric label",
                    },
                    {
                      name: "value",
                      type: "number",
                      title: "Value in number.",
                    },
                    {
                      title: "Metrix Suffix",
                      name: "suffix",
                      type: "string",
                    },
                  ],
                }),
              ],
            },
            defineField({
              name: "screens",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: "caption",
                      type: "string",
                      title: "Main text caption",
                    },
                    {
                      name: "subCaption",
                      type: "text",
                      title: "Subtext caption",
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // defineType({
    //   name: "projectInfo",
    //   // title: "ProjectInfo",
    //   type: "array",
    //   // description: "Document data after the Hero"
    //   // icon: DocumentTextIcon,
    //   of: [
    //     defineArrayMember({
    //       type: "object",
    //       fields: [
    //         {
    //           name: "alt",
    //           type: "string",
    //           title: "Alternative text",
    //         },
    //       ],
    //     }),
    //   ]
    // })
  ],
  preview: {
    select: {
      title: "title",
      description: "description.shortDescBody",
      media: "mainImage",
    },
    prepare(selection) {
      return selection;
    },
  },
});
