<template>
  <div class="container fixed-center">
    <q-img
      src="~assets/hospital_imagem.svg"
      :fit="contain"
      style="height: 200px; width: 300px"
    />
    <q-form @submit="verAgenda" class="text-center q-gutter-md">
      <q-select
        outlined
        v-model="form.agenda"
        :options="agendas"
        label="Agenda"
      ></q-select>

      <q-select
        outlined
        v-model="form.tipoAtendimento"
        :options="tiposAtendimento"
        label="Tipo de Atendimento"
      ></q-select>
      <q-btn
        color="red"
        label="Ver Agenda"
        type="submit"
        rounded="true"
        glossy
        push
      ></q-btn>
    </q-form>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, ref, onMounted, toRef } from "vue";
import { useAgenda } from "src/stores/agendas.js";
import agendasService from "src/services/agendasids";

export default defineComponent({
  name: "agenda",
  setup() {
    const agendas = ref([]);
    const tiposAtendimento = ref([]);
    const { list } = agendasService();

    const buscarAgendas = async () => {
      try {
        const data = await list(
          localStorage.getItem("cliente_token"),
          localStorage.getItem("token")
        );

        agendas.value = data.data.Agendas.map((agendas) => {
          return { value: agendas.agenda.id, label: agendas.agenda.nome };
        });

        tiposAtendimento.value = data.data.TiposAtendimentos.map(
          (tiposatendimentos) => {
            return {
              value: tiposatendimentos.tiposatendimento.id,
              label: tiposatendimentos.tiposatendimento.nome,
            };
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      buscarAgendas();
    });

    return {
      agendas: toRef(agendas, "value"),
      tiposAtendimento: toRef(tiposAtendimento, "value"),
    };
  },
  data() {
    return {
      form: {
        agenda: null,
        tipoAtendimento: null,
      },
    };
  },
  methods: {
    verAgenda() {
      const dataAtual = new Date();
      const dataFormatada =
        dataAtual.getFullYear() +
        "-" +
        String(dataAtual.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dataAtual.getDate()).padStart(2, "0");

      const agenda = useAgenda();
      agenda.setAgenda(this.form.agenda.value);
      agenda.setData(dataFormatada);
      agenda.setTipoatendimento(this.form.tipoAtendimento.value);
      this.$router.push("/");
    },
  },
});
</script>
