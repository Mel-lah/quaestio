<script setup>
import LogOutP from './LogOutP.vue';
import router from '../../router';
import { storeToRefs } from "pinia";
import { useCounterStore } from "../../stores/counter";
import { ref, onMounted} from "vue";
import { collection, onSnapshot, 
    doc, updateDoc, query, orderBy, } from 'firebase/firestore';
import { db } from '../../firebase';


//Component local data
const email = ref('');
const userName = ref('');
const password = ref('');
const _userID = ref('');
// 

// firebase refs
const miscCollectionRef = collection(db, 'misc');
const userCollectionRef = collection(db, 'users');
const userCollectionQuery = query(userCollectionRef, orderBy("date", "desc"));
//


// Firebase data and functions
const misc = ref([])
const users = ref([])



function updateProfile() {
    updateDoc(doc(userCollectionRef, _userID.value), {
        email: email.value,
        password: password.value,
        user_name: userName.value,
    });
}

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
            }
            fbmisc.push(msc)
        });
        misc.value = fbmisc
        _userID.value = fbmisc[0].userID
    });
    onSnapshot(userCollectionQuery, (querySnapshot) => {
        const fbUsers = [];
        querySnapshot.forEach((doc) => {
            const user = {
                id: doc.id,
                email: doc.data().email,
                password: doc.data().password,
                user_name: doc.data().user_name,
            }
            fbUsers.push(user)
        });
        users.value = fbUsers
        users.value.forEach(user => {
            if(user.id===_userID.value){
                userName.value =  user.user_name;
                email.value =  user.email;
                password.value =  user.password;
            }
        });
    });
})
//



//Pinia Modal
const { sLogOut } = storeToRefs(useCounterStore());
const storeCounter = useCounterStore();
// 
</script>

<template> 
    <div class="h-screen flex flex-col justify-center items-center">
        <div class="md:mr-100 mr-80">
            <button @click="[storeCounter.showEProfile(), addNote]" class="rounded p-1 hover:bg-white hover:bg-opacity-80">
                <img src="/img/left.png" class="w-8 h-8 hover:opacity-80">
            </button>
        </div>
        <div class="flex flex-col md:flex-col justify-center items-center bg-beigeL rounded-lg shadow-2xl w-96 md:w-200 h-auto md:h-128">    
            <div class="flex flex-col md:grid md:grid-cols-2 mb-5 md:mb-16 md:mt-0 mt-5">
                <img class="w-60 h-60 border-solid border-2 border-beigeD rounded-xl shadow-xl mx-auto md:mb-0 mb-5" src="/img/ppic.png">
                <div class="flex flex-col justify-center">
                    <div class="mb-1 md:mb-4">
                        <h3 class="text-lg ml-1">Username</h3>
                        <textarea v-model="userName" class="h-10 w-80 p-2 overscroll-none overflow-hidden resize-none border-gray-200 border-1 shadow-sm rounded  focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">
                            {{ userName }}
                        </textarea>
                    </div>
                    <div class="mb-1 md:mb-4">
                        <h3 class="text-lg ml-1">Email</h3>
                        <textarea v-model="email" class="h-10 w-80 p-2 overscroll-none overflow-hidden resize-none border-gray-200 border-1 shadow-sm rounded  focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">
                            {{ email }}
                        </textarea>                    
                    </div>
                    <div class="mb-3 md:mb-0">
                        <h3 class="text-lg ml-1">Password</h3>
                        <textarea v-model="password" type="password" class="h-10 w-80 p-2 overscroll-none overflow-hidden resize-none border-gray-200 border-1 shadow-sm rounded  focus:outline-none focus:border-beigeD focus:ring-beigeD focus:ring-1 focus:shadow-lg">
                            {{ password }}
                        </textarea>                    
                    </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <input type="submit" value="Log Out" @click="storeCounter.showLogOutP()" class="text-lg bg-red-400 h-10 w-52 md:mr-40 rounded-lg shadow-lg md:mb-0 mb-3 hover:bg-red-600">
                <input type="submit" value="Save" @click="updateProfile()" class="text-lg bg-beigeD h-10 w-52 rounded-lg shadow-lg hover:bg-beigeSD md:mb-0 mb-5">
            </div>
        </div>
    </div>
    <div v-if="sLogOut" 
            class="fixed inset-0 z-50 bg-gray-500 bg-opacity-70 justify-center items-center">
            <LogOutP />
    </div>
</template>