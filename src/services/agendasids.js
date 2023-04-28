import useApi from "src/composables/UseApi";

export default function agendasService(dados) {
  const { list } = useApi("consultas/buscaragendas/", dados);

  return {
    list,
  };
}
