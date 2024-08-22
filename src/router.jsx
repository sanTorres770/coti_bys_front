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
import QuotationLayout from "./views/layouts/QuotationLayout.jsx";
import QuotationStep1 from "./views/quotations/QuotationStep1.jsx";
import QuotationStep2 from "./views/quotations/QuotationStep2.jsx";
import QuotationStep3 from "./views/quotations/QuotationStep3.jsx";
import QuotationStep4 from "./views/quotations/QuotationStep4.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import QuotationTableView from "./views/quotations/QuotationTableView.jsx";
import QuotationDataView from "./views/quotations/QuotationDataView.jsx";
import NewSupplyForm from "./views/supplies/NewSupplyForm.jsx";
import NewBaggerProductForm from "./views/products/NewBaggerProductForm.jsx";
import BaggerProductsTableView from "./views/products/BaggerProductsTableView.jsx";
import UpdateBaggerProductForm from "./views/products/UpdateBaggerProductForm.jsx";
import UpdateSupplyForm from "./views/supplies/UpdateSupplyForm.jsx";

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
                path: '/dashboard',
                element: <Dashboard/>,
            },
            {
                path: '/quotations/created',
                element: <QuotationTableView/>,
            },
            {
                path: '/quotations/sent',
                element: <QuotationTableView/>,
            },
            {
                path: '/quotations/all',
                element: <QuotationTableView/>,
            },
            {
                path: '/quotations/data',
                element: <QuotationDataView/>,
            },
            {
                path: '/supplies/create',
                element: <NewSupplyForm/>,
            },
            {
                path: '/supplies/list',
                element: <UpdateSupplyForm/>,
            },
            {
                path: '/baggerProduct/create',
                element: <NewBaggerProductForm/>,
            },
            {
                path: '/baggerProduct/list',
                element: <BaggerProductsTableView/>,
            },
            {
                path: '/baggerProduct/edit',
                element: <UpdateBaggerProductForm/>,
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
        path: "/quot",
        element: <QuotationLayout/>,
        children: [
            {
                path: '/quot/step_1',
                element: <QuotationStep1/>
            },
            {
                path: '/quot/step_2',
                element: <QuotationStep2/>
            },
            {
                path: '/quot/step_3',
                element: <QuotationStep3/>
            },
            {
                path: '/quot/step_4',
                element: <QuotationStep4/>
            },
            {
                path: '/quot/ext_step_1',
                element: <QuotationStep1/>
            },
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
    },
])

export default router