<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <img
                  src="../../assets/icons/logo_memorial_avarc.png"
                  alt=""
                  style="max-width: 150px;"
                />
                <CForm>
                  <p class="text-muted">
                    Faça o login de administrador/moderador
                  </p>
                  <CInput
                    placeholder="Email"
                    autocomplete="username email"
                    required
                    v-model="login.email"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Senha"
                    type="password"
                    autocomplete="curent-password"
                    required
                    v-model="login.senha"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton
                        color="primary"
                        class="px-4"
                        :disabled="this.$v.$invalid"
                        @click="submitLogin"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { required, email /*minLength*/ } from "vuelidate/lib/validators";

import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: null,
        senha: null,
      },
    };
  },

  validations: {
    login: {
      email: { required, email },
      senha: { required },
    },
  },

  methods: {
    submitLogin() {
      if (!this.$v.$invalid) {
        this.showAlert("Carregando...", "", true, false);
        axios
          .post(`https://opememorial.net/api/Usuarios`, this.login)
          .then((autorizado) => {
            if (autorizado.data.autorizado === true) {
              this.$swal.close();
              localStorage.setItem("user", JSON.stringify(autorizado.data));
              this.$router.push({ path: "/condolences" });
            } else {
              this.showAlert("Falha na autenticação", "error", false, true);
            }
          })
          .catch((error) => {
            this.showAlert("Falha na autenticação", "error", false, true);
          });
      }
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
<style lang="scss" scoped>
.card-body {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
