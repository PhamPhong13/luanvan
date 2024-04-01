export const adminMenu = [
  {
    //quản lý người dùng
    name: "system.manage.user",
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
  {
    //quản lý nhiệm kỳ
    name: "system.nhiemky",
    menus: [
    {
        name: "system.manage-nhiemky",        link: "/system/manage-nhiemky",
      },
    ],
  },
];

export const chtMenu = [
  {
    //quản lý người dùng
    name: "system.manage.user",link: "/system/manage-admin",
  },
  {
    //quản lý danh mục
    name: "system.manage.manage-cat",link: "/system/manage-cat",
  },
  {
    //quản lý bài viết
    name: "system.manage.essay",link: "/system/manage-post",
  },
  {
    //quản lý report
    name: "system.manage.report",link: "/system/report-user",
  },
  {
    //quản lý nhiệm kỳ
    name: "system.nhiemky",
    menus: [
    {
        name: "system.manage-nhiemky",        link: "/system/manage-nhiemky",
      },
    ],
  },
  {
    //quản lý thống kê
    name: "system.thongke",
    menus: [
    {
        name: "system.manage-thongke",        link: "/system/manage-thongke",
      },
    ],
  },
  {
    //quản lý thống kê
    name: "form",
    menus: [
    {
        name: "manage-form",        link: "/system/bieumau",
      },
    ],
  },

];

export const chpMenu = [
  {
    //quản lý người dùng
    name: "system.manage.user",
    menus: [
    {
        name: "system.manage.manage-user",
        link: "/system/manage-user",
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
      {
        name: "system.manage.manage-form",        link: "/system/manage-form",
      },
    ],
  },
  {
    //quản lý thống kê
    name: "Biểu mẫu",
    menus: [
    {
        name: "Quản lý biểu mẫu",        link: "/system/bieumau",
      },
    ],
  },
];



export const menberMenu = [
  {
    //quản lý bài viết
    name: "system.manage.essay",
    menus: [
    {
        name: "system.manage.manage-post",        link: "/system/manage-post",
      },
      {
        name: "system.manage.manage-form",        link: "/system/manage-form",
      },
    ],
  },

];

