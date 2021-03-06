export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["Ações"],
      },

      {
        _name: "CSidebarNavItem",
        name: "Condolências Publicadas",
        to: "/condolences",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Depoimentos Publicados",
        to: "/tributes",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Criar Perfil Moderador",
        to: "/registeruser",
        icon: "cil-cursor",
      },
      {
        _name: "CSidebarNavItem",
        name: "Exibir Moderadores",
        to: "/users",
        icon: "cil-cursor",
      },
    ],
  },
];
