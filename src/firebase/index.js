import { firebaseConfig } from "../Config/fbConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// init firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// to handel create new user by email and password no sigin automatically
const secondaryApp = initializeApp(firebaseConfig, "secondary");

export { secondaryApp, analytics };
export default app;
