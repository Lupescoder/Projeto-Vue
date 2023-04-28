<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
      <router-view  />
      </transition>
      
    </q-page-container>

    <q-footer class="bg-white">
      <q-tabs
        active-color="red"
        indicator-color="transparent"
        class="text-grey-8"
        v-model="tab"
      >
        <q-tab round icon="home" @click="agenda" />
        <q-tab round icon="today" @click="openCalendar" />
        <q-tab round icon="search" @click="openSearch" />
        <q-tab round icon="settings" @click="perfil" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "MainLayout",

  setup() {
    const router = useRouter()
    return {
      tab: ref(),
      perfil() {
        router.push({name:'perfil'})
      },
      agenda(){
        router.push({name:'home'})
      }
    };
  },
});
</script>
