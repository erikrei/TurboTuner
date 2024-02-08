import { Router, Request, Response } from 'express';

import Buildings from '../Models/Buildings';
import UserInfo from '../Models/UserInfo';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';

import calculateBuildingInformation from '../Helpers/buildings/calculateBuildingInformation';

const buildingsRouter = Router();

buildingsRouter.get('/', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;

    try {
        const buildingsResponse = await Buildings.findOne({
            user_id
        })

        return res.json(buildingsResponse);
    } catch (error) {
        console.log(error);
    }
})

buildingsRouter.get('/:buildingName', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { buildingName } = req.params;

    try {
        const buildingsResponse = await Buildings.findOne({
            user_id
        })

        if (buildingsResponse) {
            const building = buildingsResponse.buildings.find((building) => building.buildingName === buildingName);

            if (building) {
                return res.json(building);
            } else {
                return res.status(404).send(`Gebäude ${buildingName} nicht gefunden.`);
            }
        }

    } catch (error) {
        console.log(error);
    }
})

buildingsRouter.put('/improvement/improve', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { buildingName } = req.body;

    try {
        const buildingsResponse = await Buildings.findOne({ user_id });

        if (buildingsResponse) {
            const building = buildingsResponse.buildings.find((building) => building.buildingName === buildingName);

            if (building) {
                if (building.buildingImprovement) {
                    return res.status(400).send(`${buildingName} wird bereits verbessert.`);
                } else {
                    const buildingImprovementObject = calculateBuildingInformation(buildingName, building.buildingLevel);
                    building.buildingImprovement = buildingImprovementObject;

                    if (buildingImprovementObject) {
                        await UserInfo.findByIdAndUpdate(user_id, {
                            $inc: {
                                money: -building.buildingLevelUpCost
                            }
                        })

                        await buildingsResponse.save();
                        return res.json(building);
                    } else {
                        return res.status(400).send('Unbekannter Fehler aufgetreten.');
                    }
                }
            } else {
                return res.status(404).send(`Gebäude ${buildingName} nicht gefunden.`);
            }
        }
    } catch (error) {
        console.log(error);
    }
})

buildingsRouter.put('/improvement/cancel', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { buildingName } = req.body;

    try {
        const buildingsResponse = await Buildings.findOne({ user_id });

        if (buildingsResponse) {
            const building = buildingsResponse.buildings.find((building) => building.buildingName === buildingName);

            if (building) {
                if (!building.buildingImprovement) {
                    return res.status(400).send(`Verbesserung von ${buildingName} kann nicht abgebrochen werden, da ${buildingName} nicht verbessert wird.`);
                } else {
                    await UserInfo.findByIdAndUpdate(user_id, {
                        $inc: {
                            money: building.buildingLevelUpCost
                        }
                    })

                    building.buildingImprovement = undefined;
                    await buildingsResponse.save();
                    return res.json(building);
                }
            } else {
                return res.status(404).send(`Gebäude ${buildingName} nicht gefunden.`);
            }
        }
    } catch (error) {
        console.log(error);
    }
})

buildingsRouter.put('/finish', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { buildingName } = req.body;

    try {
        const buildingsResponse = await Buildings.findOne({ user_id });

        if (buildingsResponse) {
            const building = buildingsResponse.buildings.find((building) => building.buildingName === buildingName);

            if (building) {
                if (building.buildingImprovement) {
                    const msNow = new Date().getTime();

                    if (msNow < building.buildingImprovement.buildingImprovementEnd) {
                        return res.status(400).send(`Verbesserung von ${buildingName} ist noch nicht abgeschlossen.`)
                    } else {
                        building.buildingLevel = building.buildingImprovement.buildingNextLevel;
                        building.buildingLevelUpCost = building.buildingLevelUpCost * building.buildingLevel;
                        building.buildingLevelUpTime = building.buildingLevelUpTime * building.buildingLevel;
                        building.buildingImprovement = undefined;

                        await buildingsResponse.save();

                        return res.json(building);
                    }

                } else {
                    return res.status(400).send(`${buildingName} wird nicht verbessert.`)
                }
            } else {
                return res.status(404).send(`${buildingName} wurde nicht gefunden.`)
            }
        }
    } catch (error) {
        console.log(error)
    }
})





export default buildingsRouter;