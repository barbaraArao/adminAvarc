<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <h4>Condolências Publicadas</h4>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            v-if="items"
            hover
            border
            striped
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
  name: "Condolences",
  data() {
    return {
      items: null,
      fields: [
        { key: "nomeVitima", label: "Nome da vítima" },
        { key: "nomeHomenageante", label: "Homenageante" },
        { key: "data", label: "Data de Publicação" },
        { key: "status", label: "Status da condolência" },
      ],
      activePage: 1,
    };
  },
  mounted() {
    axios
      .get(` http://avarcsp-001-site1.gtempurl.com/api/Mensagems`)
      .then((response) => {
        this.items = response.data;
      });
  },
  computed: {
    computedItems() {
      return this.items.map((item) => {
        return {
          ...item,
          nomeVitima: item.vitima.nome,
          nomeHomenageante: item.pessoa.nome,
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
    rowClicked(item, index) {
      this.$router.push({ path: `condolences/${index + 2}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
  },
};
</script>
