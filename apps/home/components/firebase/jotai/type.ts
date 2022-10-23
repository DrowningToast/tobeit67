export interface Profile extends U {
  balance: number;
  gate: "AND" | "OR" | "NOR" | "NOT";
  firstName: string;
  lastName: string;
  userName: string;
  year: number;
  role: "Player" | "Admin" | "Agency";
  activated: boolean;
  id: string;
  discordId: string;
  discordToken: string;
}

import { User as U } from "firebase/auth";
export interface User extends U {
  token: string;
}
