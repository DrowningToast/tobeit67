// import { User } from "firebase/auth";
import { atom } from "jotai";
import { Profile } from "./type";
import { User } from "./type";

export const firebaseReady = atom<boolean>(false);
export const firebaseUserAtom = atom<User | null>(null);
export const firebaseToken = atom<string | null>(null);

export const profileInfoAtom = atom<Profile | null>(null);
