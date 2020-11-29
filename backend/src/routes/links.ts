import { Router } from 'express';

import { linksController } from '../controllers';

const router = Router();

router.post('/', linksController.postLink);

router.get('/:code', linksController.hitLink);

router.get('/:code/stats', linksController.getLink);

export default router;
