<template>
  <div>
    <CCard>
      <CCardHeader> <h4>Criar usuário moderador</h4> </CCardHeader>

      <CCardBody>
        <CForm>
          <!-- <p class="text-muted">Adicionar</p> -->
          <CInput placeholder="Nome de Usuário" autocomplete="username">
            <template #prepend-content><CIcon name="cil-user"/></template>
          </CInput>
          <CInput placeholder="Email" autocomplete="email" prepend="@" />
          <CInput
            placeholder="Senha"
            type="password"
            autocomplete="new-password"
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
          <CButton color="success" block>Criar Usuário</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  components: {},
};
</script>
