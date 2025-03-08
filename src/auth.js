import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "./config";
import { db } from "./config";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged In User: ", user.email);
    await fetchUserData(user.uid);
  } else {
    console.log("No user is signed in");
  }
});

async function fetchUserData(userID) {
  try {
    const userDoc = await getDocs(collection(db, "users"));
    const userData = userDoc.docs.find((doc) => doc.id === userID)?.data();
    console.log("User data: ", userData);
    document.getElementById("greeting").innerHTML =
      "<h1> Hi, " + userData.firstname + "</h1>";
  } catch (error) {
    console.error("Error getting user data: ", error);
  }
}

async function fetchSongRT() {
  try {
    // Reference to the "songs" collection
    const userDoc = collection(db, "songs");

    // Set up the real-time listener
    onSnapshot(userDoc, (snapshot) => {
      const songs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      console.log("Real-time songs: ", songs);

      document.getElementById("songList").innerHTML = songs
        .map((song) => `<li>${song.Name}</li>`)
        .join("");
    });
  } catch (error) {
    console.log("Could not get songs from firestore", error);
  }
}

export async function signUp(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User Signed Up:", userCredential.user.email);
    console.log("User ID:", userCredential.user.uid);
    const userRef = doc(db, "users", userCredential.user.uid);

    await setDoc(userRef, {
      firstname: firstName,
      lastname: lastName,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    window.location.href = "citymanager.html";
  } catch (error) {
    console.error("Login error: " + error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log("User Logged out");
  } catch (error) {
    console.error("Logout error: ", error.message);
  }
}

export async function addSongu(song) {
  try {
    //This will be the new document ID
    const cityRef = doc(db, "songs", song.toLowerCase());

    //city ref is the first parameter (to set doc id)
    await setDoc(cityRef, {
      Name: song,
    });

    alert("Good job! Your song was saved!");
    document.getElementById("addSong").value = "";
    fetchSongRT();
  } catch (error) {
    console.log("error saving the song: ", error);
  }
}

export async function deleteSong(song) {
  try {
    const deleteRef = doc(db, "songs", song.toLowerCase());
    await deleteDoc(deleteRef);
    console.log(`Document with ID ${song} deleted successfully`);

    alert("Good job! Song was deleted!");
    document.getElementById("deleteSong").value = "";
    fetchSongRT();
  } catch (error) {
    console.log("error deleting song: ", error);
  }
}
fetchSongRT();
