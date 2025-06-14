<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { useRuntimeConfig, useFetch } from '#app'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

onMounted(() => {
  if (!userStore.user.isAuthenticated) {
    router.push('/login')
  }
})

// Fetch job details with dynamic backend URL
const { data: job } = await useFetch(`${config.public.apiURL}/api/v1/jobs/${route.params.id}/`, {
  headers: {
    'Authorization': 'token ' + userStore.user.token
  }
})

let title = ref(job.value?.title || '')
let description = ref(job.value?.description || '')
let position_salary = ref(job.value?.position_salary || '')
let position_location = ref(job.value?.position_location || '')
let company_name = ref(job.value?.company_name || '')
let company_location = ref(job.value?.company_location || '')
let company_email = ref(job.value?.company_email || '')
let errors = ref([])

async function submitForm() {
  console.log('submitForm')

  errors.value = []

  if (title.value === '') errors.value.push('The title field is missing')
  if (description.value === '') errors.value.push('The description field is missing')
  if (position_salary.value === '') errors.value.push('The position salary field is missing')
  if (position_location.value === '') errors.value.push('The position location field is missing')
  if (company_name.value === '') errors.value.push('The company name field is missing')
  if (company_location.value === '') errors.value.push('The company location field is missing')
  if (company_email.value === '') errors.value.push('The company email field is missing')

  if (errors.value.length === 0) {
    await $fetch(`${config.public.apiURL}/api/v1/jobs/${route.params.id}/edit/`, {
      method: 'PUT',
      headers: {
        'Authorization': 'token ' + userStore.user.token,
        'Content-Type': 'application/json'
      },
      body: {
        category: job.value.category,
        title: title.value,
        description: description.value,
        position_salary: position_salary.value,
        position_location: position_location.value,
        company_name: company_name.value,
        company_location: company_location.value,
        company_email: company_email.value
      }
    })
      .then(response => {
        console.log('response', response)
        router.push({ path: '/myjobs' })
      })
      .catch(error => {
        if (error.response) {
          for (const property in error.response._data) {
            errors.value.push(`${property}: ${error.response._data[property]}`)
          }
          console.log(JSON.stringify(error.response))
        } else if (error.message) {
          errors.value.push('Something went wrong. Please try again')
          console.log(JSON.stringify(error))
        }
      })
  }
}
</script>

<template>
    <div class="py-10 px-6">
        <h1 class="mb-6 text-2xl">Edit Projects</h1>

        <form v-on:submit.prevent="submitForm" class="space-y-4">
            
            
            <div>
                <label>Title</label>
                <input v-model="title" type="text" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>

            <div>
                <label>Description</label>
                <textarea v-model="description" class="w-full mt-2 p-4 rounded-xl bg-gray-100"></textarea>

            </div>


             <div>
                <label>Project Status</label>
                <input type="text" v-model="position_salary" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>

            <div>
                <label>Lead Year</label>
                <input type="text" v-model="position_location" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>


            <div>
                <label>Project Lead</label>
                <input type="text" v-model="company_name" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>


            <div>
                <label>Lead Year</label>
                <input type="text" v-model="company_location" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>

            <div>
                <label>Email</label>
                <input type="text" v-model="company_email" class="w-full mt-2 p-4 rounded-xl bg-gray-100">

            </div>


            

            <div
                    v-if="errors.length" 
                    class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                >
                    <p v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </p>
                </div>

            <button class="py-4 px-6 bg-teal-700 text-white rounded-xl">Save Changes</button>
        </form>
    </div>
</template>
