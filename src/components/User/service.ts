import UserModelV3 from "./model";
import { IUserService } from "./interface";

/**
 * @export
 * @implements {IUserModelV3Service}
 */
const UserService: IUserService = {
  async getUsersAtRisk(): Promise<any> {
    try {
      const usersAtRisk = await UserModelV3.find({
        usdAmountAtRisk: {
          $gte: 0
        },
      });
      if (usersAtRisk.length > 0) {
        return {
          status: 200,
          error: false,
          message: "success",
          data: usersAtRisk,
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "no users at risk",
          data: usersAtRisk,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: true,
        message: "internal server error",//
      };
      ////
    }
  },
  async getUsersEliglibleForLiquidation(): Promise<any> {
    try {
      const allUsers = await UserModelV3.find({
        usdAmountEligibleForLiquidation: {
          $gte: 0,
        },
      });
      if (allUsers.length > 0) {
        return {
          status: 200,
          error: false,
          message: "success",
          data: allUsers,
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "no users at risk",
          data: allUsers,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: true,
        message: "internal server error",
      };
    }
  },
  async getAllUsers(): Promise<any> {
    try {
      const allUsers = await UserModelV3.find();
      if (allUsers.length > 0) {
        return {
          status: 200,
          error: false,
          message: "success",
          data: allUsers,
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "no users at risk",
          data: allUsers,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: true,
        message: "internal server error",
      };
    }
  },
};

export default UserService;
