const adminOptions = [
    {
        id: '1',
        name: 'Servicios',
        path: '/admin/services',
        icon: 'manage-services.svg',
        adminOption: '5'
    },
    {
        id: '2',
        name: 'Técnicos',
        path: '/admin/operators',
        icon: 'manage-operators.svg',
        adminOption: '5'
    },
/*    {
        id: '3',
        name: 'Otros',
        path: '/admin/others',
        icon: 'customer.svg',
        adminOption: '5'
    },*/
    {
        id: '4',
        name: 'Registrar nuevo usuario cliente',
        path: '/admin/register/customer',
        icon: 'new-user-1.svg',
        adminOption: '6'
    },
    {
        id: '5',
        name: 'Registrar nuevo usuario técnico',
        path: '/admin/register/operator',
        icon: 'new-user-2.svg',
        adminOption: '6'
    }
]

export {
    adminOptions
}