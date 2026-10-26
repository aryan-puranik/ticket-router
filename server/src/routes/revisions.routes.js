import { Router } from 'express';

const router = Router({mergeParams: true});

router.get('/', (req, res) => {
  res.json({ success: true, data: [], error: null });
});

export default router;