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
          >
            <template #prepend-content><CIcon name="cil-user"/></template>
          </CInput>
          <CInput
            placeholder="Email"
            autocomplete="email"
            prepend="@"
            v-model="registrarModerador.email"
          />
          <CInput
            placeholder="Senha"
            type="password"
            autocomplete="new-password"
            v-model="registrarModerador.senha"
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
          >
            <template #prepend-content
              ><CIcon name="cil-lock-locked"
            /></template>
          </CInput>
          <CButton color="success" block @click="saveUser"
            >Criar Usuário</CButton
          >
        </CForm>
      </CCardBody>
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
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      },
    };
  },
  validations: {
    registrarModerador: {
      nome: { required },
      sobrenome: "",
      email: { required, email },
      senha: { required },
    },
  },
  methods: {
    saveUser() {
      axios
        .post(
          `https://opememorial.net/api/Usuarios/cadastrar`,
          this.registrarModerador
        )
        .then((response) => {
          alert("Moderador Adicionado");
        })
        .catch((error) => {
          alert("Erro ao adicionar moderador");
        });
    },
  },
};
</script>
