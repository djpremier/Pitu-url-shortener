import { Router } from 'express';

import linksRouter from './links';

const routes = Router();

routes.use('/links', linksRouter);

export default routes;
