import useApi from "src/composables/UseApi";

export default function loginService() {
  const { post, list } = useApi("usuarios/login");

  return {
    post,
    list,
  };
}
