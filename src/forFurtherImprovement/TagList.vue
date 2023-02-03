<script setup>
import { useCounterStore } from "../../stores/counter";

const storeCounter = useCounterStore();
</script>

<template>
    <!-- Parameter
        If normal opening, show as is
        If opening from any, its default tag is active, and cannot be changed
        Pressing and activating any custom tag will make it a tag of the opened content
    -->
    <div class="h-screen flex flex-col justify-center items-center">
        <div class="mr-100">
            <button @click="storeCounter.showTag" class="">
                <img src="/img/left.png " class="w-8 h-8 hover:opacity-40">
            </button>
        </div>
        
        <div class="bg-beigeL rounded-lg shadow-2xl w-200 h-3/4">    
            <div class="">
                <h3 class="text-2xl font-bold mt-5 ml-5 mb-5">Tags</h3>

                <div class="flex flex-col">
                    <div class=" bg-white mx-5 rounded shadow-md h-32 mb-8">
                        <h3 class="text-lg font-semibold my-2 mx-5">
                            Default Tag
                        </h3>
                        <div class="flex justify-evenly m-5">
                            <!-- iterate default tags -->
                            <!-- button, if opened from quiz, question, notes or sub then the highlighted will be added as their tags-->
                            <button class="flex justify-center items-center font-medium border-beigeD border-1 h-12 w-40 rounded-lg shadow-lg hover:bg-beigeSD">
                                <img class="h-4 w-4 mr-2" src="/img/book.png" >
                                Subjects
                            </button>
                            <button class="flex justify-center items-center font-medium  border-beigeD border-1 h-12 w-40 rounded-lg shadow-lg hover:bg-beigeSD">
                                <img class="h-4 w-4 mr-2 roun" src="img/note.png" >
                                Notes
                            </button>
                            <button class="flex justify-center items-center font-medium  border-beigeD border-1 h-12 w-40 rounded-lg shadow-lg hover:bg-beigeSD">
                                <img class="h-4 w-4 mr-2 roun" src="/img/quiz.png" >
                                Quizzes
                            </button>
                            <button class="flex justify-center items-center font-medium  border-beigeD border-1 h-12 w-40 rounded-lg shadow-lg hover:bg-beigeSD">
                                <img class="h-4 w-4 mr-2 roun" src="/img/question.png" >
                                Questions
                            </button>
                        </div>
                    </div>
                    <div class=" bg-white mx-5 rounded shadow-md h-110">
                        <div class="inline-flex items-center">
                            <h3 class="text-lg font-semibold my-2 ml-5 mr-3">
                                Custom Tag
                            </h3>
                            <button @click="">
                                <img class="w-3 h-3 hover:opacity-40" src="/img/add.png"/>
                            </button>
                        </div>
                        <!-- Get list of tag -->
                        <div>
                            taaaag
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    
</template>