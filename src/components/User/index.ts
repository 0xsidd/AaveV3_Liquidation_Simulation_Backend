import { Request, Response } from 'express';
import UserService from './service';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function getInRiskUserData(req: Request, res: Response): Promise < any > {
    try {
        const users:any = await UserService.getUsersAtRisk();        
       return res.status(200).json(users);
    } catch (error) {
        
    }
}

export async function getInLiquidationkUserData(req: Request, res: Response): Promise < any > {
    try {
        const users:any = await UserService.getUsersEliglibleForLiquidation();        
       return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        
    }
}
export async function getAllUsers(req: Request, res: Response): Promise < any > {
    try {
        const users:any = await UserService.getAllUsers();        
       return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        
    }
}



