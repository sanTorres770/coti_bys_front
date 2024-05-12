import { createBrowserRouter } from 'react-router-dom'
import Layout from "./views/layouts/Layout.jsx";
import Index from "./views/Index.jsx";
import AuthLayout from "./views/layouts/AuthLayout.jsx";
import Login from "./views/auth/Login.jsx";
import Register from "./views/auth/Register.jsx";
import CustomerServicesList from "./views/services_list/CustomerServicesList.jsx";
import NewServiceLayout from "./views/layouts/NewServiceLayout.jsx";
import NewServiceStep1 from "./views/new_service/NewServiceStep1.jsx";
import NewServiceStep2 from "./views/new_service/NewServiceStep2.jsx";
import NewServiceStep3 from "./views/new_service/NewServiceStep3.jsx";
import AdminLayout from "./views/layouts/AdminLayout.jsx";
import AllServicesList from "./views/services_list/AllServicesList.jsx";
import ServiceData from "./components/services/ServiceData.jsx";
import OperatorServicesList from "./views/services_list/OperatorServicesList.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Index/>
            },
            {
                path: '/new',
                element: <NewServiceLayout/>,
                children:[
                    {
                        path: '/new/step_1',
                        element: <NewServiceStep1/>
                    },
                    {
                        path: '/new/step_2',
                        element: <NewServiceStep2/>
                    },
                    {
                        path: '/new/step_3',
                        element: <NewServiceStep3/>
                    }
                ]
            },
            {
                path: '/customer/services',
                element: <CustomerServicesList/>
            },
            {
                path: '/admin',
                element: <AdminLayout/>,
                children: [
                    {
                        path: '/admin/services',
                        element: <AllServicesList/>
                    },
                    {
                        path: '/admin/operators',
                        element: <AllServicesList/>
                    },
                    {
                        path: '/admin/others',
                        element: <AllServicesList/>
                    },
                    {
                        path: '/admin/register/customer',
                        element: <Register/>
                    },
                    {
                        path: '/admin/register/operator',
                        element: <Register/>
                    }
                ]
            },
            {
                path: '/service/data',
                element: <ServiceData/>
            },
            {
                path: '/operator/services',
                element: <OperatorServicesList/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            }
        ]
    }
])

export default router