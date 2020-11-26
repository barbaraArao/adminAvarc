<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink to="/pages/login">
        <div class="c-avatar">
          Logout
        </div>
      </CHeaderNavLink>
    </template>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
