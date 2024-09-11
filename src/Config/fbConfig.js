import { viteEnv } from "./index";
const firebaseConfig = {
  apiKey: viteEnv.apik,
  authDomain: viteEnv.authDomain,
  projectId: viteEnv.projectId,
  storageBucket: viteEnv.storageBucket,
  messagingSenderId: viteEnv.messagingSenderId,
  appId: viteEnv.appId,
};

export { firebaseConfig };
