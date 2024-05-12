const options = [
    {
        id: '1',
        name: 'Solicitar nuevo servicio',
        icon: 'new.svg',
        path: '/new/step_1',
        serviceFinished: false,
        roles: ['customer']
    },
    {
        id: '2',
        name: 'Mis servicios pendientes',
        icon: 'pending.svg',
        path: '/customer/services',
        serviceFinished: false,
        roles: ['customer']
    },
    {
        id: '3',
        name: 'Mis servicios finalizados',
        icon: 'finished.svg',
        path: '/customer/services',
        serviceFinished: true,
        roles: ['customer']
    },
    {
        id: '4',
        name: 'Servicios asignados',
        icon: 'tool.svg',
        path: '/operator/services',
        serviceFinished: true,
        roles: ['operator']
    },
    {
        id: '5',
        name: 'Gestión de servicios',
        icon: 'admin.svg',
        path: '/admin/services',
        serviceFinished: true,
        roles: ['admin']
    },
    {
        id: '6',
        name: 'Gestión de usuarios',
        icon: 'users.svg',
        path: '/admin',
        serviceFinished: true,
        roles: ['admin']
    }
]

export {
    options
}