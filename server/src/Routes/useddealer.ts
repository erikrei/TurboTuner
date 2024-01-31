import { Router, Request, Response } from 'express';
import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';

import SellingCars from '../Models/SellingCars';
import UserCar from '../Models/UserCar';
import UserInfo from '../Models/UserInfo';

import { TUserInfo } from '../types';

const usedDealerRouter = Router();

usedDealerRouter.get('/', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;

    try {
        const sellingCarsResponse = await SellingCars.find({
            user_id: {
                "$ne": user_id
            }
        });

        return res.json(sellingCarsResponse);
    } catch (error) {
        console.log(error);
    }
})

usedDealerRouter.get('/sellingcars', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;

    try {
        const sellingCarsResponse = await SellingCars.find({
            user_id
        })

        return res.json(sellingCarsResponse);
    } catch (error) {
        console.log(error);
    }
})

usedDealerRouter.get('/bids', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;

    try {
        const sellingCarsResponse = await SellingCars.find({
            'bids.bid_user': user_id
        }, 'name bids.amount')

        return res.json(sellingCarsResponse);
    } catch (error) {

    }
})

usedDealerRouter.get('/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id = req.params.car_id;

    try {
        const sellingCarResponse = await SellingCars.findById(car_id);

        if (sellingCarResponse) {
            return res.json(sellingCarResponse);
        } else {
            return res.status(404).send('Auto mit gegebener ID nicht gefunden.');
        }
    } catch (error) {
        console.log(error);
    }
})

usedDealerRouter.post('/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id = req.params.car_id;
    const user_id = String(req.session.user._id);
    const { price }: { price: number } = req.body;

    try {
        const userCarResponse = await UserCar.findById(car_id);
        const userInfoResponse = await UserInfo.findById(user_id) as TUserInfo;

        if (userCarResponse) {
            if (userCarResponse.user_id !== user_id) {
                return res.status(403).send('Sie sind nicht der Besitzer dieses Autos.');
            }
            if (userCarResponse.tuning_information) {
                return res.status(400).send('Autos, die zum Verkauf angeboten werden, müssen ihr Tuning fertiggestellt haben.')
            }
            if (car_id === userInfoResponse.activeCar?._id) {
                return res.status(400).send('Das aktive Auto kann nicht zum Verkauf angeboten werden.');
            }

            const sellingCarResponse = await SellingCars.create({
                user_id: userCarResponse.user_id,
                name: userCarResponse.name,
                price,
                tuning_components: userCarResponse.tuning_components
            })

            await userCarResponse.deleteOne();

            return res.json(sellingCarResponse);
        } else {
            return res.status(404).send('Auto mit gegebener ID nicht gefunden.');
        }


    } catch (error) {

    }
})

usedDealerRouter.put('/bid/add/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id = req.params.car_id;
    const user_id = String(req.session.user._id);
    const { amount }: { amount: number } = req.body;

    if (!amount) {
        return res.status(400).send('Sie müssen ein Angebot abgeben.');
    }

    try {
        const sellingCarResponse = await SellingCars.findById(car_id);

        if (sellingCarResponse) {
            if (sellingCarResponse.user_id === user_id) {
                return res.status(400).send('Sie können nicht auf ihr eigenes Auto bieten.');
            }

            if (amount > sellingCarResponse.price) {
                return res.status(400).send('Sie können kein Angebot machen, das über dem Preis liegt.')
            }

            if (amount < sellingCarResponse.price * .8) {
                return res.status(400).send('Sie können kein Angebot machen, das unter 80% des Preises liegt.');
            }

            const sellingCarBids = sellingCarResponse.bids;
            const userBid = sellingCarBids.find((bid) => bid.bid_user === user_id);

            if (userBid) {
                userBid.amount = amount;
            } else {
                sellingCarBids.push({
                    amount,
                    bid_user: user_id
                })
                
                await UserInfo.findByIdAndUpdate(user_id, {
                    $inc: {
                        money: -amount
                    }
                })
            }

            await sellingCarResponse.save();

            return res.json(sellingCarResponse);

        } else {
            return res.status(404).send('Gebot konnte nicht hinzugefügt werden, da es das angegebene Auto nicht gibt.');
        }
    } catch (error) {
        console.log(error);
    }
})

usedDealerRouter.put('/bid/remove/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id = req.params.car_id;
    const user_id = String(req.session.user._id);

    try {
        const sellingCarResponse = await SellingCars.findById(car_id);

        if (sellingCarResponse) {
            let carBids = sellingCarResponse.bids;
            const userBid = carBids.find((bid) => bid.bid_user === user_id);

            if (userBid) {
                sellingCarResponse.bids = carBids.filter((bid) => bid.bid_user !== user_id);
            } else {
                return res.status(404).send('Gebot konnte nicht entfernt werden, da es das Gebot nicht gibt.')
            }

            await UserInfo.findByIdAndUpdate(user_id, {
                $inc: {
                    money: userBid.amount
                }
            })

            await sellingCarResponse.save();

            return res.json(sellingCarResponse);
        } else {
            return res.status(404).send('Gebot konnte nicht entfernt werden, da es das angegebene Auto nicht gibt.');
        }
    } catch (error) {
        console.log(error);
    }
})

usedDealerRouter.delete('/buy/price/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id = req.params.car_id;
    const user_id = req.session.user._id;

    try {
        const sellingCarResponse = await SellingCars.findById(car_id);

        if (sellingCarResponse) {
            await UserCar.create({
                name: sellingCarResponse.name,
                tuning_components: sellingCarResponse.tuning_components,
                user_id,
            })
            await UserInfo.findByIdAndUpdate(user_id, {
                $inc: {
                    money: -sellingCarResponse.price
                }
            })
            await UserInfo.findByIdAndUpdate(sellingCarResponse.user_id, {
                $inc: {
                    money: sellingCarResponse.price
                }
            })

            await sellingCarResponse.deleteOne();

            return res.send(`${sellingCarResponse.name} wurde erfolgreich gekauft.`);
        } else {
            return res.status(404).send('Auto konnte nicht gekauft werden, da es nicht vorhanden ist.');
        }
    } catch (error) {
        console.log(error);
    }
})

export default usedDealerRouter;