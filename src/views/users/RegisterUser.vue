<template>
  <CRow class="justify-content-center">
    <CCol md="6">
      <CCard class="mx-4 mb-0">
        <CCardBody class="p-4">
          <CForm>
            <h1>Register</h1>
            <p class="text-muted">Adicionar</p>
            <CInput
              placeholder="Username"
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
              placeholder="Password"
              type="password"
              autocomplete="new-password"
              v-model="registrarModerador.senha"
            >
              <template #prepend-content
                ><CIcon name="cil-lock-locked"
              /></template>
            </CInput>
            <CInput
              placeholder="Repeat password"
              type="password"
              autocomplete="new-password"
              class="mb-4"
            >
              <template #prepend-content
                ><CIcon name="cil-lock-locked"
              /></template>
            </CInput>
            <CButton color="success" block>Create Account</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: "RegisterUser",

  data() {
    return {
      registrarModerador: {
        nome: "",
        sobrenome: "",
        email: { required, email },
        senha: "",
      },
    };
  },
};
</script>
