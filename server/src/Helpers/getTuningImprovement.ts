type TComponentData = {
    component_name: string
    component_base_value: number
    component_base_reducer: number
}

const componentsData: TComponentData[] = [
    {
        component_name: 'Motor',
        component_base_value: 5000,
        component_base_reducer: 50
    }, {
        component_name: 'Tank',
        component_base_value: 0,
        component_base_reducer: 0
    }
]

export default function getTuningImprovement(component_name: string, component_level: number, quality: number): number {
    let baseValue = componentsData.find((component) => component.component_name === component_name)?.component_base_value;
    const baseReducer = componentsData.find((component) => component.component_name === component_name)?.component_base_reducer;

    if (baseValue && baseReducer) {
        baseValue = getQualityBaseValue(baseValue, quality);
        return baseValue - ((component_level - 1) * baseReducer)
    } else {
        return 0;
    }
}

function getQualityBaseValue(baseValue: number, quality: number): number {
    switch (quality) {
        case 1:
            return baseValue * .9;
        case 2:
            return baseValue * .95;
        case 4:
            return baseValue * 1.05;
        case 5:
            return baseValue * 1.1;
        default:
            return baseValue;
    }
}

