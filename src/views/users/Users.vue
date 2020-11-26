<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="6" class="text-left"><h4>Moderadores</h4> </CCol>
            <CCol col="6" class="text-right">
              <CButton color="blue" class="px-4" to="/registeruser"
                >Criar moderador</CButton
              >
            </CCol>
          </CRow>
          <!-- Moderadores -->
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            border
            :items="items"
            :fields="fields"
            :items-per-page="10"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      items: null,
      fields: [
        {
          key: "nome",
          label: "Nome",
          _classes: "font-weight-bold",
        },
        { key: "email", label: "E-mail" },
        { key: "tipoUsuario", label: "Tipo de Acesso" },
      ],
      activePage: 1,
    };
  },
  mounted() {
    axios
      .get(` https://opememorial.net/api/Usuarios/moderadores`)
      .then((response) => {
        this.items = response.data;
      });
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
        default:
          "blue";
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `users/${index + 1}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
