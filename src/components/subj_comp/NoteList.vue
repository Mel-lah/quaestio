<script setup>
import CreateNote from "./CreateNote.vue";
import OpenNote from "./OpenNote.vue";
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
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

//Component local data
const subjTitle = ref("");
const subjDscrptn = ref("");
//

// firebase refs
const miscCollectionRef = collection(db, "misc");
const notesCollectionRef = collection(db, "notes");
const subsjectCollectionRef = collection(db, "subjects");
const notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
//

// Firebase data and functions
const misc = ref([]);
const notes = ref([]);
const subjects = ref([]);
const _subjID = ref("");

//Get data from firebase and filters it so that only notes of the selected subject is displayed
filterNotes();
function filterNotes() {
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
    _subjID.value = fbmisc[0].subjectID;
  });
  onSnapshot(subsjectCollectionRef, (querySnapshot) => {
    const fbsubjects = [];
    querySnapshot.forEach((doc) => {
      const subject = {
        id: doc.id,
        userID: doc.data().userID,
        subj_title: doc.data().subj_title,
        subj_dscrptn: doc.data().subj_dscrptn,
      };
      fbsubjects.push(subject);
    });
    subjects.value = fbsubjects;
    subjects.value.forEach((subj) => {
      if (subj.id === _subjID.value) {
        subjTitle.value = subj.subj_title;
        subjDscrptn.value = subj.subj_dscrptn;
      }
    });
  });
  onSnapshot(notesCollectionQuery, (querySnapshot) => {
    const fbnotes = [];
    querySnapshot.forEach((doc) => {
      const notes = {
        id: doc.id,
        note_title: doc.data().note_title,
        subjectID: doc.data().subjectID,
      };
      fbnotes.push(notes);
    });
    notes.value = fbnotes;
    notes.value = notes.value.filter((note) => {
      return note.subjectID == _subjID.value;
    });
  });
}
//

//Save edit subject title and description
function saveUpdate() {
  updateDoc(doc(subsjectCollectionRef, _subjID.value), {
    subj_title: subjTitle.value,
    subj_dscrptn: subjDscrptn.value,
  });
}

//Sets the globaNoteId that will be opened
const openNote = (id) => {
  const index = notes.value.findIndex((note) => note.id === id);
  const temp = notes.value[index].id;

  updateDoc(doc(miscCollectionRef, "vXGvTZM9HWJ27w9emuXo"), {
    noteID: temp,
  });
};

const deleteNote = (id) => {
  deleteDoc(doc(notesCollectionRef, id));
};
//

// Other functions
onMounted(() => {
  filterNotes();
});
//

//Pinia Modal
const { scNote, soNote } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
//
</script>

<template>
  <div class="flex flex-col mx-3 mb-3">
    <div class="flex pt-3 items-center">
      <textarea
        v-model="subjTitle"
        class="p-2 mr-3 text-xl font-semibold italic text-black bg-beigeL rounded resize-none w-full h-10 overscroll-none overflow-hidden shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        >{{ subjTitle }}</textarea
      >
      <div class="inline-flex items-center justify-end">
        <button @click="saveUpdate()">
          <!-- Save Subject Title and details-->
          <img class="w-4 h-4 hover:opacity-40" src="/img/edit.png" />
        </button>
      </div>
    </div>
    <div class="flex flex-col my-2">
      <h4 class="font-semibold ml-1">Description</h4>
      <textarea
        v-model="subjDscrptn"
        rows="4"
        wrap="hard"
        class="p-2 w-full text-sm text-black rounded resize-none shadow focus:outline-none focus:beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg"
        >{{ subjDscrptn }}</textarea
      >
    </div>
    <div class="inline-flex items-center ml-1">
      <h4 class="mr-2 text-lg font-bold">Notes</h4>
      <button
        @click="storeCounter.showCNote"
        class="shadow hover:shadow-lg hover:bg-white hover:bg-opacity-80">
        <img class="w-3 h-3 hover:opacity-40" src="/img/add.png" />
      </button>
    </div>
    <div
      class="flex flex-col overflow-y-scroll pt-3 h-120 mb-3 bg-white rounded shadow">
      <div v-for="nt in notes" class="mx-3">
        <div class="flex justify-center">
          <button
            @click="[openNote(nt.id), storeCounter.showONote()]"
            class="h-10 w-full mb-3 bg-beigeD rounded-3xl shadow hover:bg-beigeSD">
            {{ nt.note_title }}
          </button>
          <button
            @click="deleteNote(nt.id)"
            class="justify-end h-10 ml-4 text-black font-bold hover:text-red-500">
            &cross;
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="scNote"
    class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
    <CreateNote />
  </div>
  <div
    v-if="soNote"
    class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
    <OpenNote />
  </div>
</template>

<style></style>
