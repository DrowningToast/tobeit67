// import { User } from "firebase/auth";
import { atom } from "jotai";
import { Profile } from "./type";
import { User } from "./type";

export const firebaseReady = atom<boolean>(false);
firebaseReady.debugLabel = "firebaseReady";
export const firebaseUserAtom = atom<Partial<User> | null>(null);
firebaseUserAtom.debugLabel = "firebaseUserAtom";
export const firebaseToken = atom<string | null>(null);

export const profileInfoAtom = atom<Profile | null>(null);
