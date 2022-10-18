"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainBase = exports.MainBase = void 0;
const airtable_1 = __importDefault(require("airtable"));
const apiKey = (_a = process.env.airtableKey) !== null && _a !== void 0 ? _a : process.env.$airtableKey;
const airtable = new airtable_1.default({
    apiKey: apiKey !== null && apiKey !== void 0 ? apiKey : process.env.NEXT_PUBLIC_airtableKey,
});
exports.MainBase = airtable.base("appmXBeHb4evHo4KD");
const getMainBase = () => {
    airtable_1.default.configure({
        endpointUrl: "https://api.airtable.com",
        apiKey: apiKey,
    });
};
exports.getMainBase = getMainBase;
