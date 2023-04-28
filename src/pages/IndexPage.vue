<template>
  <q-page padding>
    <q-input filled v-model="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="alterarData(date)"
                  v-close-popup
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-inner-loading :showing="visible">
      <q-spinner-puff size="10em" color="red" />
      </q-inner-loading>
    <q-table
      title="Mapa Cirúrgico"
      :pagination="pagination"
      :rows="horarios"
      :columns="columns"
      hide-header
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td round key="hora" :props="props">
            <q-btn size="sm" :label="props.row.horario" />
          </q-td>
          <q-td round key="paciente" :props="props">
            <q-avatar size="md" :src="props.row.avatar">
              <img :src="props.row.avatar" alt="Foto" />
            </q-avatar>
            {{ props.row.paciente }}
          </q-td>
          <q-td>
            <q-icon
              name="fiber_manual_record"
              size="sm"
              :color="props.row.estatus"
            />
            {{ props.row.sala }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import horariosService from "src/services/horarios";
import { useAgenda } from "src/stores/agendas.js";

export default defineComponent({
  name: "IndexPage",
  
  setup() {
    const horarios = ref([]);
    const agenda = useAgenda();
    const visible = ref(false)
    const columns = [
      { name: "hora", field: "horario", align: "left" },
      { name: "paciente", field: "paciente", align: "left" },
      { name: "paciente", field: "avatar", align: "left" },
      { name: "paciente", field: "sala", align: "left" },
      { name: "paciente", field: "estatus", align: "left" },
    ];
    onMounted(() => {
      getHorarios();
    });

    const getHorarios = async () => {
      visible.value = true
      const { list } = horariosService(
        agenda.agenda + "/" + agenda.tipoatendimento + "/" + agenda.data
      );
      try {
        const data = await list(
          localStorage.getItem("cliente_token"),
          localStorage.getItem("token")
        );
        horarios.value = data.data.map((element) => {
          var nomes = element.Paciente.nome.split(" ");
          if (nomes.length > 1) {
            var primeiroNome = nomes[0];
            var sobrenome = nomes[nomes.length - 1];
            var nomeReduzido = primeiroNome + " " + sobrenome;
          } else {
            var nomeReduzido = element.Paciente.nome;
          }

          var consultaestado;
          switch (element.Consulta.consultasestado_id) {
            case "3":
              consultaestado = "";
              break;
            case "5":
              consultaestado = "yellow";
              break;
            case "2":
              consultaestado = "red";
              break;

            default:
              consultaestado = "";
              break;
          }
          return {
            horario: element.Consulta.horario,
            paciente: nomeReduzido,
            avatar: element.Paciente.foto,
            sala: element.Consulta.sala,
            estatus: consultaestado,
          };
        });
        visible.value = false
      } catch (error) {
        visible.value = false
        console.log(error);
      }
    };
    const alterarData = (date) => {
      const agenda = useAgenda();
      agenda.setData(date);
      getHorarios();
    };

    return {
      visible,
      pagination: {

        descending: false,
        page: 0,
        rowsPerPage: 0
      },
      horarios,
      columns,
      date: ref(agenda.data),
      alterarData,
    };
  },
});
</script>
