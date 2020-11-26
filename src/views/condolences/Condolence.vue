<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard v-if="condolenceData.length > 0">
        <!-- <CDropdown color="danger" toggler-text="Excluir Moderador" class="m-2">
        </CDropdown> -->
        <CCardHeader>
          <CButton color="primary" @click="goBack">Voltar</CButton>
        </CCardHeader>

        <CCardBody style="min-height:200px">
          <CDataTable
            striped
            small
            fixed
            border
            :items="computedItems"
            :fields="fields"
          >
            <template #status="data">
              <td>
                <!-- <CBadge :color="getBadge(data.item.status)">
                  {{ data.item.status }}
                </CBadge> -->
                <CDropdown
                  :toggler-text="statusSelected"
                  class="m-2"
                  style="position: fixed"
                >
                  <CDropdownItem
                    v-for="item in statusValue"
                    :key="item.id"
                    :class="data"
                    @click="changeStatus(item)"
                  >
                    {{ item.descricao }}</CDropdownItem
                  >
                </CDropdown>
              </td>
            </template>
          </CDataTable>
          <template>
            <h5>Mensagem:</h5>
            <p>{{ texto }}</p>
          </template>
          <template v-if="imageBytes">
            <h5>Imagem:</h5>
            <img
              class="img"
              v-bind:src="'data:image/jpeg;base64,' + imageBytes"
            />
          </template>
        </CCardBody>

        <CCardFooter>
          <CButton color="success" @click="saveStatus"
            >Salvar Alterações</CButton
          >
        </CCardFooter>
      </CCard>
      <CSpinner color="primary" v-else />
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.usersOpened = from.fullPath.includes("users");
    });
  },
  data() {
    return {
      id: null,
      usersOpened: null,
      condolenceData: [],
      texto: "",
      imageBytes: null,
      statusValue: null,
      statusSelected: null,
      statusLabel: null,
      showTable: true,
      user: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(` https://opememorial.net/api/Mensagems/id?id=${this.id}`)
      .then((response) => {
        this.condolenceData.push(response.data);
        this.texto = response.data.texto;
        this.imageBytes = response.data.vitima.imagem;
        this.statusSelected = response.data.status;
      });

    this.getStatus();
  },
  computed: {
    fields() {
      return [
        { key: "id", label: this.username },
        { key: "nomeVitima", label: "Nome da Vítima" },
        { key: "nomeHomenageante", label: "Homenageante" },
        { key: "data", label: "Data da Publicação" },
        { key: "status", label: "Status da condolência" },
      ];
    },
    computedItems() {
      return this.condolenceData.map((item) => {
        return {
          ...item,
          nomeVitima: item.vitima.nome,
          nomeHomenageante: item.pessoa.nome,
        };
      });
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "aprovado" || "Aprovado":
          return "success";
        case "Pendente" || "pendente":
          return "warning";
        case "Reprovado" || "reprovado":
          return "danger";
        default:
          "priamary";
      }
    },
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/condolences" });
    },
    getStatus() {
      axios
        .get(` https://opememorial.net/api/Status`)
        .then((response) => {
          console.log(response.data);
          this.statusValue = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },

    changeStatus(item) {
      this.user = JSON.parse(localStorage.getItem("user"));

      this.statusSelected = item.descricao;
      const value = {
        idAlteradoPor: this.user.id,
        status: item.descricao,
        id: this.id,
      };
      this.statusLabel = value;
    },

    saveStatus() {
      this.showTable = false;
      axios
        .put(
          `https://opememorial.net/api/Mensagems/id?id=${this.id}`,
          this.statusLabel
        )
        .then((response) => {
          this.showTable = true;
          alert("Status alterado com sucesso!!");
        })
        .catch((error) => {
          alert("Erro ao alterar o Status");
          this.showTable = true;
        });
    },
  },
};
</script>
<style>
.img {
  max-width: 250px;
}
</style>
