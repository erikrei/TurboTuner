import axios from "axios";
import { TBuildingInformation } from "../../types";

export default function updateBuildingLevel(building: TBuildingInformation, buildings: TBuildingInformation[], setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>): null {

    axios.put('http://localhost:3000/buildings/finish', {
        buildingName: building.buildingName
    }, { withCredentials: true })
        .then(({ data }: { data: TBuildingInformation }) => {
            const newBuildingData = buildings.map((mapBuilding) => {
                if (mapBuilding._id === building._id) return data;
                else return mapBuilding
            })
            setBuildings(newBuildingData);
        })

    return null;
}