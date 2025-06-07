<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const userStore = useUserStore()
const router = useRouter()
const config = useRuntimeConfig()
let jobs = ref()

onMounted(() => {
  if (!userStore.user.isAuthenticated) {
    router.push('/login')
  } else {
    getJobs()
  }
})

useSeoMeta({
  title: 'My Projects',
  ogTitle: 'My Projects',
  description: 'The Description'
})

async function getJobs() {
  await $fetch(`${config.public.apiURL}/api/v1/jobs/my`, {
    headers: {
      'Authorization': 'token ' + userStore.user.token,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    jobs.value = response
  })
  .catch(error => {
    console.log('error', error)
  })
}

function deleteJob(id) {
  console.log('id', id)
  jobs.value = jobs.value.filter(job => job.id !== id)
}
</script>




<template>
    <div class="py-10 px-6">
        <h1 class="mb-6 text-2xl">My Projects</h1>

        <div class="space-y-4">
            
            
             <Job
  v-for="job in jobs"
  :key="job.id"
  :job="job" 
  :my="true"
  @deleteJob="() => deleteJob(job.id)"
/>


            </div>


        
        

    </div>
</template>
