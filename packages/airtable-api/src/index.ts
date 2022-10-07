import dotenv from "dotenv";
// import { Ijobs } from "./types/Ijobs";
dotenv.config({});

import Airtable from "airtable";
const apiKey = process.env.airtableKey;

const airtable = new Airtable({
  apiKey: apiKey,
});

export const MainBase = airtable.base(process.env.airtableMainBase as string);
export const getMainBase = () => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: apiKey,
  });
};
