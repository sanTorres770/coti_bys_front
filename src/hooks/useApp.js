import { useContext} from "react";
import AppContext from "../context/AppProvider.jsx";

const useApp = () => {
    return useContext(AppContext)
}

export default useApp