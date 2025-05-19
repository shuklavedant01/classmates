<script setup>
import{onMounted} from'vue'
import{useUserStore} from '@/Stores/user'

const userStore=useUserStore()

onMounted(()=>{
  userStore.initStore()
})
</script>



<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
