import useApi from "src/composables/UseApi";

export default function horariosService(dados) {
  const { list } = useApi("consultas/buscarhorarios/" + dados);

  return {
    list,
  };
}
