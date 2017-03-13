import * as express from 'express';
import * as path from 'path';
import {signS3} from './signs3';

let router = express.Router();

router.get('/', (req, res) => res.render('index.html'));

export default router;
