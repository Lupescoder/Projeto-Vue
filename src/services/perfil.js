import useApi from "src/composables/UseApi";

export default function perfilService(dados) {
  const { list } = useApi("usuarios/perfil/", dados);

  return {
    list,
  };
}
