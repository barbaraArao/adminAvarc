<template>
  <div>
    <CCard>
      <CCardHeader> <h4>Criar usuário moderador</h4> </CCardHeader>

      <CCardBody>
        <CForm>
          <!-- <p class="text-muted">Adicionar</p> -->
          <CInput
            placeholder="Nome de Usuário"
            autocomplete="username"
            v-model="registrarModerador.nome"
            required
          >
            <template #prepend-content><CIcon name="cil-user"/></template>
          </CInput>
          <CInput
            placeholder="Nome Completo"
            autocomplete="username"
            v-model="registrarModerador.sobrenome"
            required
          >
            <template #prepend-content><CIcon name="cil-user"/></template>
          </CInput>
          <CInput
            placeholder="Email"
            autocomplete="email"
            prepend="@"
            v-model="registrarModerador.email"
            required
          />
          <CInput
            placeholder="Senha"
            type="password"
            autocomplete="new-password"
            v-model="registrarModerador.senha"
            required
          >
            <template #prepend-content
              ><CIcon name="cil-lock-locked"
            /></template>
          </CInput>
          <CInput
            placeholder="Confirmar senha "
            type="password"
            autocomplete="new-password"
            class="mb-4"
            v-model="registrarModerador.confirmarSenha"
            required
          >
            <template #prepend-content
              ><CIcon name="cil-lock-locked"
            /></template>
          </CInput>
        </CForm>
      </CCardBody>
      <CCardFooter style="display: flex; justify-content: space-between;">
        <CButton color="primary" @click="goBack">Voltar</CButton>

        <CButton color="success" @click="saveUser">Criar Usuário</CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { required, email /*minLength*/ } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "RegisterUser",
  components: {},

  data() {
    return {
      registrarModerador: {
        nome: null,
        sobrenome: null,
        email: null,
        senha: null,
        confirmarSenha: null,
      },
    };
  },
  validations: {
    registrarModerador: {
      nome: { required },
      sobrenome: { required },
      email: { required, email },
      senha: { required },
      confirmarSenha: { required },
    },
  },
  methods: {
    saveUser() {
      if (!this.$v.$invalid) {
        this.showAlert("Carregando...", "", true, false);
        axios
          .post(
            `https://opememorial.net/api/Usuarios/cadastrar`,
            this.registrarModerador
          )
          .then((response) => {
            this.showAlert(
              "Moderador adicionado com sucesso!",
              "success",
              false,
              true
            );
          })
          .catch((error) => {
            this.showAlert("Erro ao adicionar moderador", "error", false, true);
          });
      }
    },
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/condolences" });
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
