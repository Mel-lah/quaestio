<script setup>
import router from "../../router";
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//Componenet Local data
const email = ref("");
const userName = ref("");
const password = ref("");
const _userID = ref("");

// firebase refs
const userCollectionRef = collection(db, "users");
const miscCollectionRef = collection(db, "misc");
const userCollectionQuery = query(userCollectionRef, orderBy("date", "desc"));
//

// Firebase data and functions
const users = ref([]);

const addUser = () => {
  addDoc(userCollectionRef, {
    email: email.value,
    password: password.value,
    user_name: userName.value,
    date: Date.now(),
  });

  // To be fixed
  // onSnapshot(userCollectionQuery, (querySnapshot) => {
  //   const fbUsers = [];
  //   querySnapshot.forEach((doc) => {
  //     const usr = {
  //       id: doc.id,
  //       email: doc.data().email,
  //       password: doc.data().password,
  //       user_name: doc.data().user_name,
  //     };
  //     fbUsers.push(usr);
  //   });
  //   users.value = fbUsers;
  //   users.value.forEach((us) => {
  //     if (us.email === email.value) {
  //       updateDoc(doc(miscCollectionRef, us.id), {
  //         // put property you want to update
  //         userID: users.value,
  //       });
  //     }
  //   });
  // });

  email.value = "";
  userName.value = "";
  password.value = "";
};

const createUser = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
//

function proceed() {
  router.replace("/dashboard");
}

//Pinia Modal
// const { haveError } = storeToRefs(useCounterStore());
// const storeCounter = useCounterStore();
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-beigeL pb-16 rounded pl-20 pr-20 shadow-lg">
      <h1
        class="text-beigeSD text-5xl font-bold flex justify-center mt-10 mb-10">
        Sign Up
      </h1>
      <form @submit.prevent="addUser, createUser" class="">
        <div class="mb-4">
          <h3 class="text-lg ml-1">Email</h3>
          <input
            type="text"
            v-model="email"
            class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
            placeholder="Ex. abc@gmail.com" />
        </div>
        <div class="mb-4">
          <h3 class="text-lg ml-1">Username</h3>
          <input
            type="text"
            v-model="userName"
            class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
            placeholder="abc" />
        </div>
        <div class="">
          <h3 class="text-lg ml-1">Password</h3>
          <input
            type="password"
            v-model="password"
            class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
            placeholder="*******" />
        </div>
        <div class="flex justify-center mt-10">
          <button
            :disabled="!email || !userName || !password"
            @click="[createUser(), addUser(), proceed()]"
            class="w-80 text-lg font-semibold bg-beigeD h-10 rounded-lg shadow-lg hover:bg-beigeSD">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
