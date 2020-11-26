<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard>
        <!-- <CDropdown color="danger" toggler-text="Excluir Moderador" class="m-2">
        </CDropdown> -->

        <CCardBody v-if="condolenceData.length > 0">
          <CDataTable
            striped
            small
            fixed
            border
            :items="computedItems"
            :fields="fields"
          />
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

        <CSpinner color="primary" v-else />
        <CCardFooter>
          <CButton color="primary" @click="goBack">Voltar</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from "./CondolencesData";
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
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(
        ` http://avarcsp-001-site1.gtempurl.com/api/Mensagems/id?id=${this.id}`
      )
      .then((response) => {
        this.condolenceData.push(response.data);
        this.texto = response.data.texto;
        this.imageBytes = response.data.vitima.imagem;
        this.statusSelected = response.data.status;
      });
    this.getStatus();
  },
  watch() {},
  computed: {
    fields() {
      return [
        { key: "id", label: this.username },
        { key: "nomeVitima", label: "Nome da Vítima" },
        { key: "nomeHomenageante", label: "Homenageante" },
        { key: "data", label: "Data da Publicação" },
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
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/condolences" });
    },
    getStatus() {
      axios
        .get(` http://avarcsp-001-site1.gtempurl.com/api/Status`)
        .then((response) => {
          this.statusValue = response.data;
          console.log(response.data);
        });
    },
    changeValue(e) {
      console.log(e);
      const value = {
        idAlteradoPor: 1,
        status: e,
      };
      axios
        .put(
          `http://avarcsp-001-site1.gtempurl.com/api/Mensagems/id?id=${e}`,
          value
        )
        .then((response) => {
          console.log(response);
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
