<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard v-if="condolenceData.length > 0">
        <!-- <CDropdown color="danger" toggler-text="Excluir Moderador" class="m-2">
        </CDropdown> -->
        <CCardHeader>
          <h4>Detalhes do depoimento nº {{ id }}</h4>
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

        <CCardFooter style="display: flex; justify-content: space-between">
          <CButton color="primary" @click="goBack">Voltar</CButton>
          <CButton color="success" @click="saveStatus"
            >Salvar Alterações</CButton
          >
        </CCardFooter>
      </CCard>
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
      name: null,
    };
  },
  mounted() {
    this.showAlert("Carregando...", "", true, false);

    this.id = this.$route.params.id;
    axios
      .get(` https://opememorial.net/api/Depoimentos/id?id=${this.id}`)
      .then((response) => {
        this.$swal.close();
        this.condolenceData.push(response.data);
        this.texto = response.data.texto;
        this.imageBytes = response.data.fotografia;
        this.statusSelected = response.data.status;
        this.name = response.data.nomeCompleto;
      })
      .catch((error) => {
        this.showAlert("Erro ao carregar informações", "error", false, true);
      });

    this.getStatus();
  },
  computed: {
    fields() {
      return [
        { key: "id", label: this.username },
        { key: "nomeCompleto", label: "Nome do Homenageado" },
        { key: "dataCriacao", label: "Data da Publicação" },
        { key: "status", label: "Status da condolência" },
      ];
    },
    computedItems() {
      return this.condolenceData.map((item) => {
        return {
          ...item,
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
        : this.$router.push({ path: "/tributes" });
    },
    getStatus() {
      axios
        .get(` https://opememorial.net/api/Status`)
        .then((response) => {
          this.statusValue = response.data;
        })
        .catch((error) => {
          this.showAlert(
            "Erro ao carregar lista de status",
            "error",
            false,
            true
          );
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
      this.showAlert("Carregando...", "", true, false);
      this.showTable = false;
      axios
        .put(
          `https://opememorial.net/api/Depoimentos/id?id=${this.id}`,
          this.statusLabel
        )
        .then((response) => {
          this.showTable = true;
          this.showAlert("Status Alterdo com sucesso!", "success", false, true);
        })
        .catch((error) => {
          this.showAlert("Erro ao alterar status", "error", false, true);
          this.showTable = true;
        });
    },
    showAlert(title, icon, loading, confirmButton) {
      this.$swal({
        title: title,
        icon: icon,
        allowOutsideClick: false,
        // showCancelButton: false,
        showConfirmButton: confirmButton,
        onBeforeOpen: () => {
          loading ? this.$swal.showLoading() : null;
        },
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
