import * as cron from "node-cron";
import Cron from "./service";
class CronService {
  public async borrowEventV3(): Promise<any> {
    try {
      cron.schedule("*/5 * * * * *", async () => {
        console.log("----------------------------------------------------------");
        await Cron.fetchV3BorrowEventAndStore();
      });
    } catch (err) {
      console.log(err);
    }
  }
  public async healthFactorCheck(): Promise<any> {
    try {
      cron.schedule("*/1000 * * * * *", async () => {
        console.log("----------------------------------------------------------");
        await Cron.checkHealthFactor();
      });
    } catch (err) {
      console.log(err);
    }
  }
}
export default new CronService();
