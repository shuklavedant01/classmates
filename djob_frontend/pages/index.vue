<script setup>
const {data: jobs}=await useFetch('http://127.0.0.1:8000/api/v1/jobs/newest/')

</script>

<template>
    <div class="py-20 px-6 bg-teal-700 text-center">
        <h1 class="mb-12 text-5xl text white">Contribute In Projects</h1>

        <NuxtLink to="/browse" class="inline-block py-4 px-8 bg-teal-900 text-white rounded-xl">BROWSE</NuxtLink>
    </div>

    <div class="py-10 px-6">
        <h2 class="mb-8 text-2xl text-center">Newest Projects</h2>

        <div class="space-y-4">
           
           <job 
                v-for="job in jobs" 
                v-bind:key="job.id"
                v-bind:job="job"
            />         
        </div>
    </div>
</template>