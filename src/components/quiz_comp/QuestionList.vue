<script setup>
import CreateQuestion from "./CreateQuestion.vue";
import AnswerQuiz from "./AnswerQuiz.vue";
import OpenQuestion from "./OpenQuestion.vue"
import { useCounterStore } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch, } from "vue";
import { collection, onSnapshot, 
    addDoc, deleteDoc, doc, updateDoc, 
    query, orderBy, } from 'firebase/firestore';
import { db } from '../../firebase';

//Component local data
const _quizID = ref('')
const quizTitle = ref('')
const quizDscrptn = ref('')


// firebase refs
const miscCollectionRef = collection(db, 'misc')
const questionCollectionRef = collection(db, 'questions');
const quizzesCollectionRef = collection(db, 'quizzes');
const questionCollectionQuery = query(questionCollectionRef, orderBy("date", "desc"));
//


// Firebase data and functions
const quizzes = ref([])
const misc = ref([])
const questions = ref([])

//Get data from firebase and filters it so that only question of the selected quiz is displayed
filterQuestions()
function filterQuestions() {
    onSnapshot(miscCollectionRef, (querySnapshot) => {
        const fbmisc = [];
        querySnapshot.forEach((doc) => {
            const msc = {
                id: doc.id,
                userID: doc.data().userID,
                qzectID: doc.data().qzectID,
                noteID: doc.data().noteID,
                quizID: doc.data().quizID,
                questionID: doc.data().questionID,
            }
            fbmisc.push(msc)
        });
        misc.value = fbmisc
        _quizID.value = fbmisc[0].quizID
    });
    onSnapshot(questionCollectionQuery, (querySnapshot) => {
        const fbquestions = [];
        querySnapshot.forEach((doc) => {
            const question = {
                id: doc.id,
                questionq: doc.data().questionq,
                quizID: doc.data().quizID
            }
            fbquestions.push(question)
        });
        questions.value = fbquestions 
        questions.value = questions.value.filter( note =>{
            return note.quizID == _quizID.value
        }) 
    });
    onSnapshot(quizzesCollectionRef, (querySnapshot) => {
        const fbquizzes = [];
        querySnapshot.forEach((doc) => {
            const quiz = {
                id: doc.id,
                quiz_title: doc.data().quiz_title,
                quiz_dscrptn: doc.data().quiz_dscrptn,
                quizID: doc.data().quizID
            }
            fbquizzes.push(quiz)
        });
        quizzes.value = fbquizzes
        quizzes.value.forEach(qz => {
            if(qz.id===_quizID.value){
                quizTitle.value =  qz.quiz_title;
                quizDscrptn.value = qz.quiz_dscrptn;
            }
        });
    });
}
// 


//Save edit quiz title and description
function saveUpdate() {
    updateDoc(doc(quizzesCollectionRef, _quizID.value), {
        quiz_title: quizTitle.value,
        quiz_dscrptn: quizDscrptn.value
    });
}

//Sets the globaQuestionId that will be opened 
const openQuestion = id => {
    const index = questions.value.findIndex(qst => qst.id ===id);
    const temp = questions.value[index].id;

    updateDoc(doc(miscCollectionRef, 'vXGvTZM9HWJ27w9emuXo'), {
        questionID: temp
    }); 
}

const deleteQuestion = id => {
    deleteDoc(doc(questionCollectionRef, id));
}

onMounted(() => {
    filterQuestions()
})
// 

// Pinia Modal
const { scQuestion, sAnswerQuiz, soQuestion } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
// 
</script>

<template> 
    <div class="flex flex-col mx-3 mb-3">
        <div class="flex pt-3  items-center">
            <textarea v-model="quizTitle" class="p-2 mr-3 text-xl font-semibold italic text-black bg-beigeL rounded resize-none w-full h-10 overscroll-none overflow-hidden shadow">{{ quizTitle }}</textarea>  
            <div class="inline-flex items-center justify-end">
                <button @click="saveUpdate()" >
                    <img class="w-4 h-4 hover:opacity-40" src="/img/edit.png"/>
                </button> 
            </div>
        </div>
        <div class="flex flex-col my-2">
            <h4 class="font-semibold  ml-1">Description</h4>
            <textarea v-model="quizDscrptn" rows="4" wrap="hard" class="p-2 w-full text-sm text-black  rounded resize-none shadow">{{ quizDscrptn }}</textarea>
        </div> 
        <div class="inline-flex items-center ml-1">
            <h4 class="mr-2 text-lg font-bold"> Questions</h4>
            <button @click="storeCounter.showCQuestion" class="shadow hover:shadow-lg hover:bg-white hover:bg-opacity-80">
                <img class="w-3 h-3 hover:opacity-40" src="/img/add.png">
            </button>
        </div>
        <div class="flex flex-col overflow-y-scroll pt-3 h-110 mb-3 bg-white rounded shadow">
            <div v-for="q in questions" class="mx-3 ">
                <div class="flex justify-center">
                    <button @click="[storeCounter.showOQuestion(), openQuestion(q.id)]" class="h-10 w-full mb-3 bg-beigeD rounded-3xl shadow hover:bg-beigeSD" >
                        {{ q.questionq }}
                    </button>
                    <button @click="deleteQuestion(q.id)" class="justify-end h-10 ml-4 text-black font-bold hover:text-red-500">
                        &cross;
                    </button>    
                </div>
            </div>
        </div>

        <div class="flex justify-center m-5">
            <button @click="storeCounter.showAnswerQuiz" class="text-lg font-semibold bg-beigeD h-10 w-52 rounded-lg shadow-lg hover:bg-beigeSD">
                Answer Quiz
            </button>            
        </div>

    </div>

    <div v-if="scQuestion" 
            class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
            <CreateQuestion />
    </div>
    <div v-if="sAnswerQuiz" 
            class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
            <AnswerQuiz />
    </div>
    <div v-if="soQuestion" 
            class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 justify-center items-center">
            <OpenQuestion />
    </div>
</template>

<style>
</style>