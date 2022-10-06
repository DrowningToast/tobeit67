import { firebaseReady, firebaseUserAtom } from "./jotai/store";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import app from "./app";

export const auth = getAuth(app);

// A function which takes a string and return a promise | Resolve the given string if the string doesn't contain any forbidden char and reject if does
export const sanitizeInput = (unknown: string, type = typeof "a") => {
  return new Promise<string>((resolve, reject) => {
    if (typeof unknown === typeof "a") {
      if (
        unknown.includes(">") ||
        unknown.includes("<") ||
        unknown.includes("'") ||
        unknown.includes('""') ||
        unknown.includes("/") ||
        unknown.includes("\\") ||
        unknown.includes(" ")
      ) {
        reject("Invalid Char");
        return;
      }
      resolve(unknown);
    }
  });
};

// A function which takes a email string and return a promise | Resolve if the given string is in valid email format and reject if not
export const validateEmail = (unknown: string) => {
  return new Promise<string>((resolve, reject) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(String(unknown).toLowerCase());
    if (result) {
      resolve(unknown);
    } else {
      reject("Invalid Email");
    }
  });
};

export const handleLoginWithEmail = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "") throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validEmail = await validateEmail(email);
      const response = await signinEmail(validEmail, validPass);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const handleRegisterWithEmail = async (
  email: string,
  password: string,
  username: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "" || !auth.currentUser)
        throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validUsername = await sanitizeInput(username);
      const validEmail = await validateEmail(email);
      const response = await signupEmail(validEmail, validPass);
      updateProfile(auth.currentUser, {
        displayName: validUsername,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * @description Async function which returns a promise | takes email and password to login the user in
 *
 */
export const signinEmail = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    try {
      let response = signInWithEmailAndPassword(auth, email, password);
      resolve(response); // let authOnStateChange handle updating redux state
    } catch (e) {
      reject("An error has occured while trying to sign you in : " + e);
    }
  });
};

/**
// @description Async function which returns promise | takes email and password to sign up the user  
 * @param email 
 * @param password 
 * @returns 
 */
export const signupEmail = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = createUserWithEmailAndPassword(auth, email, password);
      resolve(response);
    } catch (err) {
      reject(
        "An error has occurred while trying to creating a new user : " + err
      );
    }
  });
};

/**
 * @description Signout the user but can only be used as a function component in React
 * @returns
 */
export const SignOutFC: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const cb = async () => {
      try {
        await signOut(auth);

        console.log("Sucessfully signed out");
        router.push("/");
      } catch (e) {
        console.error("An error has occured");
        console.log(e);
      }
    };
    cb();
  }, []);

  return null;
};

/**
 * @description Signout the firebase
 * @returns
 */
export const SignOut = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await signOut(auth);
      resolve(null);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * @param {Object} props
 * @param { (user : User | null , ready : boolean) => boolean} props.cb
 * @param {String} props.path
 */
export const ConditionalRedirect: FC<{
  cb: (
    fbProfile: User | null,
    ready: boolean
  ) => boolean | undefined | null | string;
  path: string;
}> = ({ cb, path }) => {
  const [fbProfile] = useAtom<User | null>(firebaseUserAtom);
  const [ready] = useAtom<boolean>(firebaseReady);
  const router = useRouter();

  useEffect(() => {
    if (cb(fbProfile, ready) && true) {
      router.push(path);
    }
  }, [fbProfile, ready]);

  return null;
};

/**
 * @description Get firebase token without force refreshing the token
 * @returns
 */
export const getFirebaseToken = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser);
      resolve(token);
    } else {
      reject("Not signed in");
    }
  });
};

/**
 * @description Get firebase token and force refreshing the token
 * @returns
 */
export const getNewIdToken = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser, true);
        resolve(token);
      } else {
        reject("Not signed in");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let googleProvider: GoogleAuthProvider | null = null;

/**
 * @description Sign in using google authentication
 * @param middleware
 * @returns
 */
export const signinWithGooglePopUp = (
  middleware?: (user: User) => Promise<void>
) => {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }
  return new Promise(async (resolve, reject) => {
    if (!googleProvider) return reject("Fatal error");
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        if (middleware) await middleware(user);
        console.log("Succesfully signed in");
        resolve(user);
      })
      .catch((err) => {
        console.log("Failed to signin due to " + err);
        reject(err);
      });
  });
};
