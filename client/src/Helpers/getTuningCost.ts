import { TUserCarTuningComponent } from "../types";

export default function getTuningCost(component: TUserCarTuningComponent): number {
    return (component.component_level + 1) * 4000;
}