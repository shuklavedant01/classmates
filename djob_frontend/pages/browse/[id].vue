<script setup>
import { useRoute } from 'vue-router'
import { useRuntimeConfig, useFetch, useSeoMeta } from '#app'

const route = useRoute()
const config = useRuntimeConfig()

const { data: job, pending } = await useFetch(`${config.public.apiURL}/api/v1/jobs/${route.params.id}/`)

// Set SEO meta safely after data is loaded
if (!pending.value && job.value) {
  useSeoMeta({
    title: job.value.title || 'Job Details',
    ogTitle: job.value.title || 'Job Details',
    description: job.value.description || ''
  })
}
</script>



<template>
     <div class="py-10 px-6 grid md:grid-cols-4 gap-3">
        <div class="md:col-span-3">
            <h1 class="mb-6 text-3xl">{{job.title}}</h1>
            <p>
                {{job.description}}
            </p>
            <a v-bind:href="'mailto:'+ job.company_email" class="inline-block mt-6 py-4 px-6 bg-teal-700 text-white rounded-xl">Contribute</a>
        </div>

        <div class="md:col-span-1 p-6 bg-teal-700 text-white rounded-xl">
            <h3 class="mb-6 text-2xl">Project Leader</h3>
            <p class="mb-2">{{job.company_name}}</p>
            <p>Year : {{job.company_location}}</p>

            <hr class="my-6  opacity30">

            <h3 class="mb-6 text-2xl">Branch</h3>
            <p class="mb-2">{{job.position_location}}</p>
            <p>Project Status:   {{job.position_salary}}</p>

            <hr class="my-6  opacity30">

            <p>Posted on {{job.created_at_formatted}}</p>
        </div>
    </div>
</template>
