import {useEffect} from "react";
import useApp from "../../hooks/useApp.js";
import {Transition} from "@headlessui/react";
import BaggerProductsTable from "../../components/products/BaggerProductsTable.jsx";

export default function BaggerProductsTableView() {

    const {allBaggerProducts,
        getAllBaggerProducts} = useApp();


    const columnNamesTable = [
        {id: 1, name: 'Nombre'},
        {id: 2, name: 'Precio Acero Inoxidable'},
        {id: 3, name: 'Precio Acero al Carbón'},
        {id: 4, name: 'Editar'},
    ]


    useEffect(() => {

        getAllBaggerProducts()

    }, []);

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

            <BaggerProductsTable columnNames={columnNamesTable} data={allBaggerProducts} viewDataPath={'/baggerProduct/edit'}></BaggerProductsTable>

        </Transition>
    );
}