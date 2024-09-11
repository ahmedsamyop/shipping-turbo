import app, { secondaryApp } from "../index";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
// auth
const auth = getAuth(app);
const secondaryAuth = getAuth(secondaryApp);
// database Firestore
const db = getFirestore(app);
// collection DA
const colRefDelivery = collection(db, "delivery");

class Users {
  // admin
  async getAdmin(id) {
    try {
      const docRef = doc(db, "admin", id);
      const response = await getDoc(docRef);
      return response.data();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // deliveries
  async displayDAs() {
    try {
      let deliveries = [];
      const response = (await getDocs(colRefDelivery)).docs;
      response.forEach((doc) => {
        deliveries.push({ ...doc.data(), id: doc.id });
      });
      return deliveries;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getDA(id) {
    try {
      const docRef = doc(db, "delivery", id);
      const response = await getDoc(docRef);
      return response.data();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createDA(fname, lname, phone, email, password) {
    try {
      const response = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const { uid } = response.user;
      await secondaryAuth.signOut();
      if (uid) {
        await setDoc(doc(db, "delivery", uid), {
          fname,
          lname,
          phone,
          email,
          password,
          id: uid,
          role: "da",
        });
        return `Create Succefully Delivery by email: ${email}`;
      }
    } catch (error) {
      console.log(error);
      throw new Error(`unable to create DA by email: ${email}`);
    }
  }
  async editDA({ id, fname, lname, phone }) {
    try {
      const docRef = doc(db, "delivery", id);
      await updateDoc(docRef, { fname, lname, phone });
      return `Update DA Succefully`;
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to update DA`);
    }
  }
  async deleteDA(id) {
    try {
      const docRef = doc(db, "delivery", id);
      await deleteDoc(docRef);
      return `Delete delivery Succefully`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // Authentication
  async login(userEmail, userPassword) {
    try {
      const response = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      const { uid } = response.user;
      const userDA = await this.getDA(uid);
      if (!userDA) {
        const userAdmin = await this.getAdmin(uid);
        return {
          id: userAdmin.id,
          email: userAdmin.email,
          fname: userAdmin.fname,
          lname: userAdmin.lname,
          phone: userAdmin.phone,
          role: userAdmin.role,
        };
      } else {
        return {
          id: userDA.id,
          email: userDA.email,
          fname: userDA.fname,
          lname: userDA.lname,
          phone: userDA.phone,
          role: userDA.role,
        };
      }
    } catch (error) {
      throw new Error("unable to login with email and password");
    }
  }
  async logout() {
    try {
      await signOut(auth);
      return {
        id: "",
        email: "",
        fname: "",
        lname: "",
        phone: "",
        role: "",
      };
    } catch (error) {
      throw new Error("Server Error unable to logout");
    }
  }
}

export { Users, auth, colRefDelivery };
