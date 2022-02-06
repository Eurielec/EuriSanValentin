import { querySiPiruletas } from "../queries";

const useSiPiruletas = ({ nombreCompletoOInsta }) => {
    // Receives nombreCompletoOInsta
    // Returns boolean hasPiruletas 

    const hasPiruletas = false;

    if (nombreCompletoOInsta){
        hasPiruletas = querySiPiruletas(nombreCompletoOInsta={nombreCompletoOInsta}) //TODO: Query function
    }

    return ({ hasPiruletas })
}

export default useSiPiruletas