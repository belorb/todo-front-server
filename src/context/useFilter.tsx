import {useOutletContext} from "react-router-dom";
import {ContextFilterType} from "../utils/type.ts";

export function useFilter() {
    return useOutletContext<ContextFilterType>();
}