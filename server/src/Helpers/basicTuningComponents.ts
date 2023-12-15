import { TUserCarTuningComponents } from "../types";

const tuning_components_names = ["Motor", "Tank"];

export default function basicTuningComponents(): TUserCarTuningComponents[] {
    const tuning_components: TUserCarTuningComponents[] = [];

    tuning_components_names.forEach((name) => {
        tuning_components.push({
            component_name: name,
            component_level: 1
        })
    })

    return tuning_components;
}