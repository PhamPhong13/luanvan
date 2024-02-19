export const adminMenu = [
  {
    //quản lý người dùng
    name: "system.manage.manage-user",
    menus: [
    {
        name: "system.manage.manage-user",
        link: "/system/manage-user",
        /* subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/manage-patient' },
                ] */
      },
      {
        name: "system.manage.manage-admin",
        link: "/system/manage-admin",
        /* subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/manage-patient' },
                ] */
      },
    ],
  },
  {
    //quản lý danh mục
    name: "system.manage.manage-cat",
    menus: [
    {
        name: "system.manage.manage-category",        link: "/system/manage-cat",
      },
    ],
  },
  {
    //quản lý bài viết
    name: "system.manage.essay",
    menus: [
    {
        name: "system.manage.manage-post",        link: "/system/manage-post",
      },
    ],
  },

];

