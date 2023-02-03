<script setup>
import { ref, onMounted,} from "vue";
import { collection, onSnapshot, 
    addDoc, deleteDoc, doc, updateDoc, 
    query, orderBy, } from 'firebase/firestore';
import { db } from '../../firebase';

// firebase refs
const miscCollectionRef = collection(db, 'misc');
const questionCollectionRef = collection(db, 'quizzes');
const questionCollectionQuery = query(questionCollectionRef, orderBy("date", "desc"));
//


// Component Local data
const newQuizTitle = ref('')


// Firebase data and functions
const quizzes = ref([])
const misc = ref([])



const addQuiz = () => {
    addDoc(questionCollectionRef, {
        userID: misc.value[0].userID,
        quiz_title: newQuizTitle.value,
        quiz_dscrptn: '',
        date: Date.now()
    });
    newQuizTitle.value = ''
}


onMounted(() => {
    onSnapshot(questionCollectionQuery, (querySnapshot) => {
        const fbquizzes = [];
        querySnapshot.forEach((doc) => {
            const question = {
                id: doc.id,
                quiz_title: doc.data().quiz_title,
            }
            fbquizzes.push(question)
        });
        quizzes.value = fbquizzes
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
            }
            fbmisc.push(msc)
        });
        misc.value = fbmisc
    });
})
// 
</script>

<template>  
    <div class="flex flex-col justify-center gap-4 md:grid md:grid-rows-3 md:gap-0 mx-5 mt-5 mb-3 h-40 bg-white rounded shadow">
        <div class="flex justify-start items-center ml-5">
            <h3 class="font-semibold text-lg">Add New Quiz</h3>
        </div>
        <form @submit.prevent="addQuiz" >
            <div class="flex px-3 md:px-0 md:justify-center -mt-1">
                <input v-model="newQuizTitle" class="h-10 w-170 p-3 rounded border-gray-200 border-1 shadow-sm focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg" type="text" name="SubjectTitle" placeholder="New Quiz Title">
            </div>
            <div class="flex justify-center -mt-1">
                <button :disabled="!newQuizTitle"  class="mt-4 font-semibold bg-beigeD h-10 w-52 rounded-lg shadow-md hover:bg-beigeSD hover:shadow-xl">
                    Create Quiz
                </button>                    
            </div>
        </form>
    </div>
</template>