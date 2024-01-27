import { TUserCarTuningComponents } from '../../types';

import getTuningCost from '../getTuningCost';

export default function calculateScrapyardPrice(components: TUserCarTuningComponents[], quality: number): number {
    let scrapyardSum = 0;

    components.map((component) => {
        for (let i = 2; i <= component.component_level; i++) {
            scrapyardSum += getTuningCost(i, quality);
        }
    })

    return scrapyardSum;
}