import Airtable from "airtable";
const apiKey = process.env.airtableKey ?? process.env.$airtableKey;
const baseId = process.env.airtableBase ?? process.env.NEXT_PUBLIC_airtableBase;

const airtable = new Airtable({
  apiKey: apiKey ?? process.env.NEXT_PUBLIC_airtableKey,
});

export const MainBase = airtable.base(baseId!);
export const getMainBase = () => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: apiKey,
  });
};
