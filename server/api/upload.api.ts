import * as express from 'express';
let router = express.Router();

router.post('/upload', (req, res, next) => {
  res.json({message: 'ok'});
});

export = router;
