<script setup>
import CSubject from "./CSubject.vue";
import NoteList from "./NoteList.vue";
import { useCounterStore } from "../../stores/counter";
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

// firebase refs
const miscCollectionRef = collection(db, "misc");
const subjectCollectionRef = collection(db, "subjects");
const subjectCollectionQuery = query(
  subjectCollectionRef,
  orderBy("date", "desc")
);
//

// Firebase data and functions
const subjects = ref([]);
const misc = ref([]);

const setGlobalSubjectID = (id) => {
  const index = subjects.value.findIndex((subject) => subject.id === id);
  const temp = subjects.value[index].id;

  updateDoc(doc(miscCollectionRef, "vXGvTZM9HWJ27w9emuXo"), {
    subjectID: temp,
  });
};

const deleteSubject = (id) => {
  deleteDoc(doc(subjectCollectionRef, id));
};

onMounted(() => {
  onSnapshot(subjectCollectionQuery, (querySnapshot) => {
    const fbsubjects = [];
    querySnapshot.forEach((doc) => {
      const subject = {
        id: doc.id,
        subj_title: doc.data().subj_title,
      };
      fbsubjects.push(subject);
    });
    subjects.value = fbsubjects;
  });
  onSnapshot(miscCollectionRef, (querySnapshot) => {
    const fbmisc = [];
    querySnapshot.forEach((doc) => {
      const msc = {
        id: doc.id,
        userID: doc.data().userID,
        subjectID: doc.data().subjectID,
        noteID: doc.data().noteID,
        quizID: doc.data().quizID,
        questionID: doc.data().questionID,
      };
      fbmisc.push(msc);
    });
    misc.value = fbmisc;
  });
});
//

//Pinia Modal
const storeCounter = useCounterStore();
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="md:mr-100 mr-80">
      <button
        @click="storeCounter.showChangeSubj"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <div class="bg-beigeL rounded-lg shadow-2xl w-96 md:w-200 h-3/4">
      <CSubject />
      <div>
        <h3 class="font-bold text-xl ml-10 mb-2">Subjects</h3>
        <div
          class="flex flex-col overflow-y-scroll pt-3 h-110 mb-8 bg-white mx-5 rounded shadow">
          <!-- Iterate all subject -->
          <div v-for="subj in subjects" class="mx-3">
            <div class="flex justify-center">
              <button
                @click="
                  [setGlobalSubjectID(subj.id), storeCounter.showChangeSubj()],
                    NoteList.filterNotes
                "
                class="h-10 mb-3 w-170 mr-2 bg-beigeD rounded-3xl hover:bg-beigeSD">
                {{ subj.subj_title }}
              </button>
              <button
                @click="deleteSubject(subj.id)"
                class="justify-end h-10 text-black font-bold hover:text-red-500">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
