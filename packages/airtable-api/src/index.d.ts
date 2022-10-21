import Airtable from "airtable";

declare module "airtable-api" {
  export type MainBase = Airtable.Base;
  export type getMainBase = () => void;
}
