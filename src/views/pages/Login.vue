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
                    placeholder="Nome de usuário"
                    autocomplete="username email"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Senha"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" to="/users"
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
export default {
  name: "Login",

  methods() {},
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
