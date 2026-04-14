import { Elysia } from "elysia";
import { notesService } from "./notes.service";

export const notesModule = new Elysia({
  name: "notesModule",
}).decorate({
  notesService,
});
