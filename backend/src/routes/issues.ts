import { Router } from 'express';
import { issueController } from '../controllers/issueController';

const router = Router();

// Issue routes
router.get('/issues', issueController.getAll);
router.post('/issues', issueController.create);
router.get('/issues/heatmap/data', issueController.getHeatmapData);
router.get('/issues/:id', issueController.getById);
router.put('/issues/:id', issueController.update);
router.delete('/issues/:id', issueController.delete);
router.post('/issues/:id/upvote', issueController.upvote);

// Statistics
router.get('/stats', issueController.getStats);

// Categories
router.get('/categories', (req, res) => {
  const categories = [
    { value: 'pothole', label: 'Pothole' },
    { value: 'broken_light', label: 'Broken Light' },
    { value: 'broken_sign', label: 'Broken Sign' },
    { value: 'damaged_curb', label: 'Damaged Curb' },
    { value: 'flooding', label: 'Flooding' },
    { value: 'debris', label: 'Debris' },
    { value: 'graffiti', label: 'Graffiti' },
    { value: 'other', label: 'Other' }
  ];
  res.json(categories);
});

export default router;
