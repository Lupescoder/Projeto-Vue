<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="usuario.foto" />
          </q-avatar>
          <div class="text-weight-bold">{{ usuario.nome }}</div>
          <div>{{ usuario.email }}</div>
          <div>{{ usuario.grupo }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-8"
        v-model="tab"
      >
        <q-tab round icon="home" @click="openHome" />
        <q-tab round icon="today" @click="openCalendar" />
        <q-tab round icon="search" @click="openSearch" />
        <q-tab round icon="settings" @click="toggDrawer" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import perfilService from "src/services/perfil";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const drawer = ref(false);
    const usuario = ref([]);

    const perfil = async () => {
      const { list } = perfilService();
      try {
        const data = await list(
          localStorage.getItem("cliente_token"),
          localStorage.getItem("token")
        );
        usuario.value = {
          email: data.data.Usuario.email,
          foto: data.data.Usuario.foto,
          grupo: data.data.Usuario.grupo,
          nome: data.data.Usuario.nome,
        };
        console.log(usuario.value);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      perfil();
    });

    return {
      usuario,
      drawer,
      logout() {
        localStorage.clear();
        this.$router.push("/login");
      },
      toggDrawer() {
        drawer.value = !drawer.value;
      },
    };
  },
});
</script>
