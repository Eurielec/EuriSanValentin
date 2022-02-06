import { querySiPiruletas } from "../queries";

const useSiPiruletas = ({ nombreCompletoOInsta }) => {
    // Receives nombreCompletoOInsta
    // Returns { hasPiruletas, piruletas }

    const hasPiruletas = false;
    const piruletas = [];

    if (nombreCompletoOInsta){
        piruletas = querySiPiruletas(nombreCompletoOInsta={nombreCompletoOInsta}) //TODO: Query function
        hasPiruletas = true
    }

    return ({ hasPiruletas, piruletas })
}

export default useSiPiruletas