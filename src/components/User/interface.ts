// import { IUserModel } from './model';
import { IUserModelV3 } from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    // /**
    //  * @returns {Promise<IUserModel[]>}
    //  * @memberof IUserService
    //  */
    // findAll(): Promise<IUserModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    // findOne(code: string): Promise<IEventModel[]>;
    getUsersAtRisk():Promise<any>;
    getUsersEliglibleForLiquidation():Promise<any>;
    getAllUsers():Promise<any>;

}
