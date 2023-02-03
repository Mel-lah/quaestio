import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
    //Modal
    seProfile: false,
    sQuestion: false,
    sTag: false,
    scSubj: false,
    scQuiz: false,
    scNote: false,
    schngSubj: false,
    soNote: false,
    schngQuiz: false,
    scQuestion: false,
    soQuestion: false,
    sAnswerQuiz: false,
    sReviewQuiz: false,
    sDelete: false,
    sLogOut: false,
    //firebase
  }),
  actions: {
    increaseCount(){
      this.count++;
    },
    decreaseCount(){
      this.count--;
    },
    showEProfile(){
      this.seProfile = !this.seProfile;
    },
    showQuestions(){
      this.sQuestion = !this.sQuestion;
    },
    showTag(){
      this.sTag = !this.sTag;
    },
    showCSubject(){
      this.scSubj = !this.scSubj;
    },
    showCQuiz(){
      this.scQuiz = !this.scQuiz;
    },
    showCNote(){
      this.scNote = !this.scNote;
    },
    showChangeSubj(){
      this.schngSubj = !this.schngSubj;
    },
    showONote(){
      this.soNote = !this.soNote;
    },
    showChangeQuiz(){
      this.schngQuiz = !this.schngQuiz;
    },
    showCQuestion(){
      this.scQuestion = !this.scQuestion;
    },
    showAQuestion(){
      this.saQuestion = !this.saQuestion;
    },
    showOQuestion(){
      this.soQuestion = !this.soQuestion;
    },
    showAnswerQuiz(){
      this.sAnswerQuiz = !this.sAnswerQuiz;
    },
    showReviewQuiz(){
      this.sReviewQuiz = !this.sReviewQuiz;
    },
    showDeleteP(){
      this.sDelete = !this.sDelete;
    },
    showLogOutP(){
      this.sLogOut = !this.sLogOut;
    },
  },
  getters: {
    oddOrEven: (state) => {
      if(state.count %2 === 0) return 'even'
      return 'odd'
    },
    getUserID: (state) => {
      return (userId) => state.userID.find((user) => user.id === userId)
    }
  }
});
