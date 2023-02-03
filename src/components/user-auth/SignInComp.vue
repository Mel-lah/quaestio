<script setup>
import router from "../../router";
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// firebase refs
const userCollectionRef = collection(db, "users");
const miscCollectionRef = collection(db, "misc");
const userCollectionQuery = query(userCollectionRef, orderBy("date", "desc"));
//

// Firebase data and functions
const users = ref([]);
const email = ref("");
const password = ref("");

//To be fixed
function signIn() {
  if (email.value == "alicando@gmail.com") {
    if (password.value == "alicandojam") {
      router.replace("/dashboard");
    }
  } else {
    window.alert("Incorrect user details.");
    router.replace("/");
  }
}

function setUserID() {
  //Check if input
  if (email.value)
    updateDoc(doc(miscCollectionRef, "vXGvTZM9HWJ27w9emuXo"), {
      //to be edited once maayo na ang signin
      userID: "iuCKZNmyUod0EHV76Q45",
    });
}

onMounted(() => {
  onSnapshot(userCollectionQuery, (querySnapshot) => {
    const fbUsers = [];
    querySnapshot.forEach((doc) => {
      const usr = {
        id: doc.id,
        email: doc.data().email,
        password: doc.data().password,
        user_name: doc.data().user_name,
      };
      fbUsers.push(usr);
    });
    users.value = fbUsers;
  });
});
//

//Pinia Modal
const storeCounter = useCounterStore();
//
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-beigeL pb-16 rounded pl-20 pr-20 shadow-lg">
      <h1
        class="text-beigeSD text-5xl font-bold flex justify-center mt-10 mb-10">
        Sign In
      </h1>
      <form>
        <div class="mb-4">
          <h3 class="text-lg ml-1">Email</h3>
          <input
            type="text"
            v-model="email"
            class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
            placeholder="Ex. abc@gmail.com" />
        </div>
        <div class="">
          <h3 class="text-lg ml-1">Password</h3>
          <input
            type="password"
            v-model="password"
            class="h-10 w-80 p-3 border-gray-200 border-1 shadow-sm rounded focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
            placeholder="******" />
        </div>
        <div class="flex justify-center mt-10">
          <button
            :disabled="!email || !password"
            @click="[signIn(), storeCounter.showTitle(), setUserID()]"
            class="w-80 text-lg font-semibold bg-beigeD h-10 rounded-lg shadow-lg hover:bg-beigeSD disabled:border-bg-black">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
