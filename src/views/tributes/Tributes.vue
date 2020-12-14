<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <h4>Depoimentos Publicados</h4>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            v-if="items"
            hover
            border
            striped
            :style="'min-height: 250px;'"
            :items="computedItems"
            :fields="fields"
            :items-per-page="10"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{ data.item.status }}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";

export default {
  name: "Tributes",
  data() {
    return {
      items: null,
      fields: [
        // { key: "nome", label: "Nome da vítima" },
        { key: "nomeCompleto", label: "Nome" },
        { key: "dataCriacao", label: "Data de Publicação" },
        { key: "status", label: "Status do Depoimento" },
      ],
      activePage: 1,
    };
  },
  mounted() {
    this.showAlert("Carregando...", "", true, false);
    axios
      .get(` https://opememorial.net/api/Depoimentos`)
      .then((response) => {
        this.$swal.close();
        this.items = response.data;
      })
      .catch((error) => {
        this.showAlert("Erro ao carregar depoimentos", "error", false, true);
      });
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
        };
      });
    },
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
      status = status.toUpperCase();
      switch (status) {
        case "APROVADO":
          return "success";
        case "PENDENTE":
          return "warning";
        case "REPROVADO":
          return "danger";
        default:
          "priamary";
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `tributes/${item.id}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    showAlert(title, icon, loading, confirmButton) {
      this.$swal({
        title: title,
        icon: icon,
        allowOutsideClick: false,
        showConfirmButton: confirmButton,
        onBeforeOpen: () => {
          loading ? this.$swal.showLoading() : null;
        },
      });
    },
  },
};
</script>
