import { ref } from "vue";
import { defineStore } from "pinia";

export const useAgenda = defineStore("agenda", () => {
  const tipoatendimento = ref(0);
  const agenda = ref(0);
  const data = ref("");

  function setTipoatendimento(tipoatendimentoValue) {
    tipoatendimento.value = tipoatendimentoValue;
  }

  function setAgenda(agendaValue) {
    agenda.value = agendaValue;
  }

  function setData(dataValue) {
    data.value = dataValue;
  }

  return {
    setTipoatendimento,
    setAgenda,
    setData,
    tipoatendimento,
    agenda,
    data,
  };
});
