import * as express from 'express';
import * as path from 'path';

let router = express.Router();

router.get('/', (req, res) => res.render('index.html'));

export default router;
