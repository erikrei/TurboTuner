import getQualityMultiplicator from "./getQualityMultiplicator";

type TComponentData = {
    component_name: string
    component_base_value: number
    component_base_reducer: number
    component_value_above_200: number
}

const componentsData: TComponentData[] = [
    {
        component_name: 'Motor',
        component_base_value: 5000,
        component_base_reducer: 25,
        component_value_above_200: 1000
    }, {
        component_name: 'Tank',
        component_base_value: 0,
        component_base_reducer: 0,
        component_value_above_200: 0
    }
]

export default function getTuningImprovement(component_name: string, component_level: number, quality: number): number {
    let baseValue = componentsData.find((component) => component.component_name === component_name)?.component_base_value;
    const baseReducer = componentsData.find((component) => component.component_name === component_name)?.component_base_reducer;

    if ((component_level > 200 && quality >= 4) || (component_level > 500 && quality <= 3)) return -1;

    if (component_level > 200 && baseValue) {
        const valueAbove200 = componentsData.find((component) => component.component_name === component_name)?.component_value_above_200;
        if (valueAbove200) {
            switch (quality) {
                case 1:
                    return valueAbove200 - 250;
                case 2:
                    return valueAbove200 - 500;
                default:
                    return valueAbove200
            }
        } else return 0
    }

    if (baseValue && baseReducer) {
        baseValue *= getQualityMultiplicator(quality);
        let improvement = baseValue - ((component_level - 1) * baseReducer);
        if (improvement < 0) improvement = baseReducer;
        return improvement;
    } else {
        return 0;
    }
}

