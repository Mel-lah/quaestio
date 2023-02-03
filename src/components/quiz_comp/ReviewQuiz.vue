<script setup>
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted} from "vue";
import { collection, onSnapshot, 
    doc, updateDoc, 
    query, orderBy, } from 'firebase/firestore';
import { db } from '../../firebase';


// Component local data
const userAnswer = ref('');
const quizTitle = ref('');
const _quizID = ref('');


// firebase refs
const miscCollectionRef = collection(db, 'misc')
const quizzesCollectionRef = collection(db, 'quizzes');
const questionCollectionRef = collection(db, 'questions');
const questionCollectionQuery = query(questionCollectionRef, orderBy("date", "desc"));
//


// Firebase data and functions
const misc = ref([])
const questions = ref([])
const quizzes = ref([])


//Get data from firebase and filters it so that only question of the selected quiz is displayed
filterQuestions()
function filterQuestions() {
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
        _quizID.value = fbmisc[0].quizID
    });
    onSnapshot(quizzesCollectionRef, (querySnapshot) => {
        const fbquiz = [];
        querySnapshot.forEach((doc) => {
            const msc = {
                id: doc.id,
                quiz_title: doc.data().quiz_title,
                description: doc.data().description,
            }
            fbquiz.push(msc)
        });
        quizzes.value = fbquiz
        quizzes.value.forEach(quiz => {
            if(quiz.id===_quizID.value){
                quizTitle.value = quiz.quiz_title;
            }
        });        
    });
    onSnapshot(questionCollectionQuery, (querySnapshot) => {
        const fbquestions = [];
        querySnapshot.forEach((doc) => {
            const question = {
                id: doc.id,
                questionq: doc.data().questionq,
                quizID: doc.data().quizID,
                answer: doc.data().answer
            }
            fbquestions.push(question)
        });
        questions.value = fbquestions 
        questions.value = questions.value.filter( quiz =>{
            return quiz.quizID == _quizID.value
        }) 
        
    });
}


// 

// Pinia Modal
const { saQuestion } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
// 
</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <div class="bg-beigeL rounded-lg shadow-2xl mt-11 w-96 md:w-200 h-3/4">  
            <div class="flex flex-col justify-start px-5 pt-5 mb-3 mx-5">
                <h3 class="text-xl font-semibold">
                    {{ quizTitle }}
                </h3>
                <p>
                    Number of Items: {{ questions.length }}
                </p>
            </div>
            <div class="flex flex-col  overflow-y-scroll h-128 bg-white mx-5 rounded p-5 shadow ">
                <div v-for="question in questions" class="flex flex-col bg-gray-200 rounded mb-5">
                    <div class="grid content-between h-64 md:h-44">
                        <div class="mx-5 mt-2 mb-2 text-lg overflow-auto ">
                           {{ question.questionq}}
                        </div>
                        <!-- Supposed to show user's answer -->
                        <!-- <input v-model="userAnswer.score" type="text" class="p-3 mx-3 md:mx-auto md:ml-8 h-10 w-64 md:w-150 mb-2 rounded-md border-gray-300 border-1 shadow-sm focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">            -->
                        <textarea disabled class="px-3 py-1 font-semibold text-lg italic  mx-3 md:mx-auto md:ml-8 h-10 w-64 md:w-150 mb-2 rounded-md border-gray-300 border-1 shadow-sm overscroll-none overflow-hidden resize-none focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">{{ question.answer }}</textarea>
                    </div> 
                </div>
            </div>   
            <div class="flex justify-center mt-5 ">
                <button @click="[storeCounter.showReviewQuiz(), storeCounter.showAnswerQuiz()]" class="text-lg font-semibold bg-beigeD h-10 w-52 rounded-lg shadow-md hover:bg-beigeSD">
                    Finish Review
                </button>
            </div>
        </div>
    </div>   
</template>