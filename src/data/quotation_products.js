import {ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon} from "@heroicons/react/24/outline/index.js";

const quotationServices = [
    {
        id: 1,
        name: 'Ensacadora',
        velocityOptions: {
            title: 'Selecciona la velocidad',
            items:[
                {
                    id: 1,
                    name: '1 hasta 4 sacos/min',
                    icon: CloudArrowUpIcon,
                    selectedProductId: 1,
                    description: 'hasta 4 sacos'
                },
                {
                    id: 2,
                    name: '5 hasta 9 sacos/min',
                    icon: LockClosedIcon,
                    selectedProductId: 1,
                    description: 'hasta 9 sacos'
                },
                {
                    id: 3,
                    name: '10 sacos/min en adelante',
                    icon: ArrowPathIcon,
                    selectedProductId: 1,
                    description: '10 sacos'
                },
            ],
        },
        fabricationOptionsTitle: 'Material a empacar',
        additionalProductsTitle: 'Complementos',
        packingMaterials: [
            {
                id: 1,
                name: 'Flujo libre(maíz, arroz, cafe, etc.)',
                icon: CloudArrowUpIcon,
                selectedProductId: 1,
                description: 'Alimentador por gravedad'
            },
            {
                id: 2,
                name: 'Compactación(harinas, cemento, arcillas, etc.)',
                icon: LockClosedIcon,
                selectedProductId: 1,
                description: 'Alimentador por tornillo'
            },
            {
                id: 3,
                name: 'Pellets',
                icon: ArrowPathIcon,
                selectedProductId: 1,
                description: 'Alimentador por banda'
            },
        ],
        manufacturingMaterials: [
            {
                id: 1,
                name: 'Acero inoxidable',
                icon: CloudArrowUpIcon,
                selectedProductId: 1,
                description: 'fino'
            },
            {
                id: 2,
                name: 'Acero al carbón',
                icon: LockClosedIcon,
                selectedProductId: 1,
                description: 'barato'
            },
        ],
        brands:{
            pneumatics:{
                brandsTitle: 'Neumática',
                items:[
                    {
                        id: 1,
                        name: 'Marca neumática 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 1,
                        type: '1',
                        description: 'Marca neumática'
                    },
                    {
                        id: 2,
                        name: 'Marca neumática 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 1,
                        type: '1',
                        description: 'Marca neumática'
                    },
                ],
            },
            electronics:{
                brandsTitle: 'Electrónica',
                items:[
                    {
                        id: 3,
                        name: 'Marca electrónica 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 1,
                        type: '2',
                        description: 'Marca electrónica'
                    },
                    {
                        id: 4,
                        name: 'Marca electrónica 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 1,
                        type: '2',
                        description: 'Marca electrónica'
                    },
                ],
            },
        },
        additionalProducts: [
            {
                id: 1,
                name: 'Banda porta sacos',
                icon: CloudArrowUpIcon,
                selectedProductId: 1,
                description: 'Banda porta sacos'
            },
            {
                id: 2,
                name: 'Costura',
                icon: CloudArrowUpIcon,
                selectedProductId: 1,
                description: 'Pedestal y máquina'
            },
        ]
    },
    {
        id: 2,
        name: 'Big bags',
        titleOptions: 'Selecciona la velocidad big bags',
        fabricationOptionsTitle: 'Big bag a empacar',
        additionalProductsTitle: 'Complementos',
        productOptions: [
            {
                id: 4,
                name: '10 big bags en adelante',
                icon: CloudArrowUpIcon,
                selectedProductId: 2,
                description: '10 big bags en adelante'
            },
            {
                id: 5,
                name: '100 big bags',
                icon: LockClosedIcon,
                selectedProductId: 2,
                description: '100 big bags'
            },
        ],
        packingMaterials: [
            {
                id: 4,
                name: 'Material empaque big bag',
                icon: ArrowPathIcon,
                selectedProductId: 2,
                description: 'Alimentador por banda'
            },
        ],
        manufacturingMaterials: [
            {
                id: 1,
                name: 'Acero inoxidable',
                icon: CloudArrowUpIcon,
                selectedProductId: 2,
                description: 'fino'
            },
            {
                id: 2,
                name: 'Acero al carbón',
                icon: LockClosedIcon,
                selectedProductId: 2,
                description: 'barato'
            },
        ],
        brands:{
            pneumatics:{
                brandsTitle: 'Neumática',
                items: [
                    {
                        id: 1,
                        name: 'Marca neumática 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '1',
                        description: 'Marca neumática'
                    },
                    {
                        id: 2,
                        name: 'Marca neumática 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '1',
                        description: 'Marca neumática'
                    },
                ],
            },
            electronics:{
                brandsTitle: 'Electrónica',
                items: [
                    {
                        id: 3,
                        name: 'Marca electrónica 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '2',
                        description: 'Marca electrónica'
                    },
                    {
                        id: 4,
                        name: 'Marca electrónica 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '2',
                        description: 'Marca electrónica'
                    },
                ],
            },
            hydraulics:{
                brandsTitle: 'Hidráulica',
                items: [
                    {
                        id: 5,
                        name: 'Marca hidráulica 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '3',
                        description: 'Marca hidráulica'
                    },
                    {
                        id: 6,
                        name: 'Marca hidráulica 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '3',
                        description: 'Marca hidráulica'
                    },
                ]
            }
        },
        additionalProducts: [
            {
                id: 3,
                name: 'Adicional Big bag',
                icon: CloudArrowUpIcon,
                selectedProductId: 2,
                manufacturingMaterials: [
                    {
                        id: 1,
                        name: 'Acero inoxidable',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 1,
                        description: 'fino'
                    },
                    {
                        id: 2,
                        name: 'Acero al carbón',
                        icon: LockClosedIcon,
                        selectedProductId: 1,
                        description: 'barato'
                    },
                ],
                description: 'Adicional Big bag'
            },
        ]
    },
    {
        id: 3,
        name: 'Otros...',
        titleOptions: 'Selecciona la velocidad otros',
        fabricationOptionsTitle: 'Otros a empacar',
        additionalProductsTitle: 'Complementos',
        productOptions: [
            {
                id: 6,
                name: '10 otros...',
                icon: ArrowPathIcon,
                selectedProductId: 3,
                description: '10 otros...'
            },
            {
                id: 7,
                name: '20 otros...',
                icon: ArrowPathIcon,
                selectedProductId: 3,
                description: '20 otros...'
            },
        ],
        packingMaterials: [
            {
                id: 5,
                name: 'Nada para empacar',
                icon: ArrowPathIcon,
                selectedProductId: 2,
                description: 'Continuar sin selección'
            },
        ],
        manufacturingMaterials: [
            {
                id: 1,
                name: 'Acero inoxidable',
                icon: CloudArrowUpIcon,
                selectedProductId: 3,
                description: 'fino'
            },
            {
                id: 2,
                name: 'Acero al carbón',
                icon: LockClosedIcon,
                selectedProductId: 3,
                description: 'barato'
            },
        ],
        brands:{
            pneumatics:{
                brandsTitle: 'Neumática',
                items: [
                    {
                        id: 1,
                        name: 'Marca neumática 1',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '1',
                        description: 'Marca neumática'
                    },
                    {
                        id: 2,
                        name: 'Marca neumática 2',
                        icon: CloudArrowUpIcon,
                        selectedProductId: 2,
                        type: '1',
                        description: 'Marca neumática'
                    },
                ],
            }
        },
        additionalProducts: [],
    }
]

export {
    quotationServices
}