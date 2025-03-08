import { logout, signUp, login, addSongu, deleteSong } from "./auth";

const signUpForm = document.querySelector("#signupForm");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  signUp(firstname, lastname, email, password);
});

const logInForm = document.querySelector("#loginForm");
logInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});

const logOutForm = document.querySelector("#logoutForm");
logOutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  logout();
});

const addSongForm = document.querySelector("#addForm");
addSongForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const songu = document.getElementById("addSong").value;

  addSongu(songu);
});

const deleteSongForm = document.querySelector("#deleteForm");
deleteSongForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const songu = document.getElementById("deleteSong").value;

  deleteSong(songu);
});
