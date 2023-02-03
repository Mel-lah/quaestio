<script setup>
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

//Component Local data
const noteTitle = ref("");
const noteContent = ref("");
//

// firebase refs
const miscCollectionRef = collection(db, "misc");
const noteCollectionRef = collection(db, "notes");
//

// Firebase data and functions
const misc = ref([]);
const notes = ref([]);
const _noteID = ref("");

function updateNote() {
  updateDoc(doc(noteCollectionRef, _noteID.value), {
    note_title: noteTitle.value,
    note: noteContent.value,
  });
}

// Get misc data from firebase to get subjectID
onMounted(() => {
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
    _noteID.value = fbmisc[0].noteID;
  });
  onSnapshot(noteCollectionRef, (querySnapshot) => {
    const fbnotes = [];
    querySnapshot.forEach((doc) => {
      const notes = {
        id: doc.id,
        note_title: doc.data().note_title,
        note: doc.data().note,
        subjectID: doc.data().subjectID,
      };
      fbnotes.push(notes);
    });
    notes.value = fbnotes;
    notes.value.forEach((note) => {
      if (note.id === _noteID.value) {
        noteTitle.value = note.note_title;
        noteContent.value = note.note;
      }
    });
  });
});
//

// Pinia Modal
const storeCounter = useCounterStore();
//
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="md:mr-100 mr-80">
      <button
        @click="[storeCounter.showONote(), updateNote()]"
        class="rounded p-1 hover:bg-white hover:bg-opacity-80">
        <img src="/img/left.png" class="w-8 h-8 hover:opacity-80" />
      </button>
    </div>
    <div class="bg-beigeL rounded-lg shadow-2xl w-96 md:w-200 h-3/4">
      <form @submit.prevent="addNote">
        <div class="m-5 flex justify-between">
          <textarea
            v-model="noteTitle"
            wrap="hard"
            class="p-2 w-full text-lg font-se h-10 text-black rounded overflow-hidden overscroll-none resize-none shadow focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">
                        {{ noteTitle }}
                    </textarea
          >
        </div>
        <div class="m-5 flex justify-between">
          <textarea
            v-model="noteContent"
            wrap="hard"
            class="p-2 h-140 w-full text-sm text-black rounded resize-none shadow focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">
                        {{ noteContent }}
                    </textarea
          >
        </div>
      </form>
    </div>
  </div>
</template>
