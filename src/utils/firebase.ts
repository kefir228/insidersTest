import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpv_13S4bMXSxgEFKHgpyQ1E0670XzeAQ",
  authDomain: "insiders-test-36d0b.firebaseapp.com",
  projectId: "insiders-test-36d0b",
  storageBucket: "insiders-test-36d0b.firebasestorage.app",
  messagingSenderId: "526468983182",
  appId: "1:526468983182:web:bf6f06cba496bde6305cdf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
