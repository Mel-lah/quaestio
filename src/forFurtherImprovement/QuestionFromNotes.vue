<script setup>
    import Notes from "../components/pop-ups/CNotes.vue"
    import CreateQuestion from "../components/pop-ups/CreateQuestion.vue"
</script>

<template>  
    <div class="content">
        <Notes />
        <CreateQuestion />
    </div>
    
</template>

<style scoped>
.content{
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.5em;
    margin-left: 2.5%;
    margin-right: 2.5%;
}

</style>