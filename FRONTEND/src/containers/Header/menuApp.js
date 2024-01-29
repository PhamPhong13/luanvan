export const adminMenu = [
  {
    //quản lý người dùng
    name: "system.header.user",
    menus: [
      {
        name: "system.header.manage-patient",
        link: "/system/manage-patient",
      },
      {
        name: "system.header.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "system.header.manage-admin",
        link: "/system/manage-admin",
        /* subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/manage-patient' },
                ] */
      },
    ],
  },
  {
    name: "system.header.clinic",
    menus: [
       {
        name: "system.header.manage-clinic",
        link: "/system/manage-clinic",
      },
    ]
  },
  {
    name: "system.header.specialty",
  }
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lý kế hoạch khám bệnh bác sĩ

        name: "menu.doctor.manage-shedule",
        link: "/doctor/manage-shedule",
      },
      {
        //quản lý kế hoạch bệnh nhân của bác sĩ

        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
