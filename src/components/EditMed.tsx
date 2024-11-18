import MedMenu from "./MedMenu";
import {useLocation} from "react-router-dom";
import {Medication} from "../types/types.ts";

const EditMed = () => {
    const {state} = useLocation();
    const {med} = state;
    return MedMenu('edit', med as Medication);
};
export default EditMed;