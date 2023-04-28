<template>
    <q-inner-loading :showing="visible">
        <q-spinner-puff size="10em" color="red" />
      </q-inner-loading>
   <q-page padding v-if="visible == false">
    
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
          src="~assets/background.svg"
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
   </q-page>
  </template>
  
  <script>
  /* eslint-disable */

  import { defineComponent, ref, onMounted } from "vue";
  import perfilService from "src/services/perfil";
  
  export default defineComponent({
    name: "Perfil",
  
    setup() {
      const visible = ref(false)
      const usuario = ref([]);
  
      const perfil = async () => {
        visible.value = true
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
          visible.value = false
        } catch (error) {
            visible.value = false
          console.log(error);
        }
      };
      onMounted(() => {
        perfil();
      });
  
      return {
        visible,
        usuario,
        logout() {
          localStorage.clear();
          this.$router.push("/login");
        },
      };
    },
  });
  </script>
  