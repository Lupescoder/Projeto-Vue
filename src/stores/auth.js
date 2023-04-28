import { ref } from "vue";
import { defineStore } from "pinia";
import loginService from "src/services/login";

export const useAuth = defineStore("auth", () => {
  const client_token = ref(localStorage.getItem("client_token"));
  const token = ref(localStorage.getItem("token"));
  const grupo_id = ref(localStorage.getItem("grupo_id"));

  function setClientToken(client_tokenValue) {
    localStorage.setItem("client_token", client_tokenValue);
    client_token.value = client_tokenValue;
  }

  function setToken(tokenValue) {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  function setGroupid(grupo_idValue) {
    localStorage.setItem("grupo_id", grupo_idValue);
    grupo_id.value = grupo_idValue;
  }

  async function checkToken() {
    try {
      const tokenAuth = "Bearer" + token.value;
      const { list } = loginService();
      const data = await list({
        headers: {
          Authorization: tokenAuth,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    token,
    client_token,
    setClientToken,
    setToken,
    setGroupid,
    checkToken,
  };
});
