<template>
  <div class="container fixed-center">
    <q-form @submit="login" class="text-center q-gutter-md">
      <q-img
        src="~assets/eba_logo.svg"
        :fit="contain"
        style="height: 140px; max-width: 120px"
      />

      <q-input
        outlined
        v-model="clinica"
        suffix=".eba.med.br"
        required
      ></q-input>

      <q-input
        outlined
        v-model="form.username"
        label="Usuário"
        required
      ></q-input>

      <q-input
        outlined
        v-model="form.password"
        label="Senha"
        type="password"
        required
      ></q-input>

      <q-btn
        color="red"
        label="Entrar"
        type="submit"
        rounded="true"
        glossy
        push
      ></q-btn>

      <p>
        Esqueceu a senha? <br />
        <a style="color: #b7b7b7" href="#">Clique aqui</a>
      </p>
    </q-form>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import loginService from "src/services/login";
import { useAuth } from "src/stores/auth.js";
import Swal from "sweetalert2";
import LoadingScreen from "../components/Loading.vue";
import { Loading } from "quasar";

export default defineComponent({
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        clinica: "",
      },
      clinica: "",
    };
  },
  methods: {
    async login() {
      Loading.show({
        spinner: LoadingScreen,
      });

      const { post } = loginService();
      const auth = useAuth();
      const { Buffer } = require("buffer");
      const client_token = Buffer.from(this.clinica).toString("base64");
      auth.setClientToken(client_token);

      try {
        const data = await post(this.form, client_token);
        auth.setToken(data.data.token);
        auth.setGroupid(data.data.group_id);
        this.$router.push("/agenda");
        Loading.hide();
      } catch (error) {
        Loading.hide();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário ou Senhas Incorreta!",
          confirmButtonText: "OK",
        });
        console.log(error);
      }
    },
  },
});
</script>
