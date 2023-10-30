import * as express from 'express';
import * as Routes from '../../routes';
import CronService from "../../common/cron/events.cron"

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');
CronService.borrowEventV3();
// CronService.healthFactorCheck();
/**
 * @exports {express.Application}
 */
export default app;
