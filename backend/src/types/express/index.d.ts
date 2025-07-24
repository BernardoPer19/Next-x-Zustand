import { ProjectType } from "@/feature/Projects/types/projects";
import { UserType } from "../AuthTypes";
import { CollectionType } from "@/feature/collections/types/CollectionTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}