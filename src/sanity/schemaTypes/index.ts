import { type SchemaTypeDefinition } from "sanity";

import { aboutType } from "./aboutType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { experienceType } from "./experienceSchema";
import { postType } from "./postType";
import { projectDescType } from "./projectDescType";
import { projectType } from "./projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    projectType,
    projectDescType,
    aboutType,
    authorType,
    experienceType,
  ],
};
