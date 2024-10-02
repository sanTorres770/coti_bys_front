import QuotationsTable from "../../components/quotations/QuotationsTable.jsx";
import {columnNames} from "../../data/quotationsTableColumNames.js";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useApp from "../../hooks/useApp.js";
import {Transition} from "@headlessui/react";
import {useAuth} from "../../hooks/useAuth.js";

export default function QuotationTableView() {

    const {allBaggerQuotations} = useApp();
    const {login} = useAuth();

    const location = useLocation()

    const [filteredQuotations, setFilteredQuotations] = useState([]);


    useEffect(() => {

        switch (location.pathname) {

            case '/quotations/all': {
                setFilteredQuotations(allBaggerQuotations)
                break;
            }

            case '/quotations/created': {
                setFilteredQuotations(allBaggerQuotations.filter(quotation => quotation.status === 'NE'))
                break;
            }

            case '/quotations/sent': {
                setFilteredQuotations(allBaggerQuotations.filter(quotation => quotation.status === 'EN'))
                break;
            }

        }

    }, [location]);

    return (

        <Transition
            as={'div'}
            appear={true}
            show={true}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0 -translate-x-6"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >

            <QuotationsTable columnNames={columnNames} data={filteredQuotations} viewDataPath={'/quotations/data'} isAdmin={login.isAdmin}></QuotationsTable>

        </Transition>
    );
}