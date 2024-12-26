import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("about").title("About Me"),
      S.documentTypeListItem("experience").title("Work Experience"),
      S.divider(),
    ]);
