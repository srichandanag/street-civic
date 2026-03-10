import { Request, Response } from 'express';
import Issue, { IIssue } from '../models/Issue';

export const issueController = {
  // Get all issues
  getAll: async (req: Request, res: Response) => {
    try {
      const { category, severity, status } = req.query;
      
      const filter: any = {};
      if (category) filter.category = category;
      if (severity) filter.severity = severity;
      if (status) filter.status = status;

      const issues = await Issue.find(filter).sort({ createdAt: -1 });
      res.json(issues);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single issue
  getById: async (req: Request, res: Response) => {
    try {
      const issue = await Issue.findById(req.params.id);
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }
      res.json(issue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create issue
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, category, severity, location } = req.body;

      if (!title || !description || !category || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const issue = new Issue({
        title,
        description,
        category,
        severity: severity || 'medium',
        location: {
          type: 'Point',
          coordinates: location.coordinates,
          address: location.address
        }
      });

      const savedIssue = await issue.save();
      res.status(201).json(savedIssue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update issue
  update: async (req: Request, res: Response) => {
    try {
      const { title, description, category, severity, status, location } = req.body;
      
      const issue = await Issue.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          severity,
          status,
          location
        },
        { new: true }
      );

      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      res.json(issue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete issue
  delete: async (req: Request, res: Response) => {
    try {
      const issue = await Issue.findByIdAndDelete(req.params.id);
      
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      res.json({ message: 'Issue deleted' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Upvote issue
  upvote: async (req: Request, res: Response) => {
    try {
      const issue = await Issue.findByIdAndUpdate(
        req.params.id,
        { $inc: { upvotes: 1 } },
        { new: true }
      );

      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      res.json(issue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get heatmap data
  getHeatmapData: async (req: Request, res: Response) => {
    try {
      const issues = await Issue.find().select('location.coordinates severity');
      
      const heatmapData = issues.map(issue => ({
        coordinates: issue.location.coordinates,
        severity: issue.severity,
        intensity: issue.severity === 'high' ? 1.0 : issue.severity === 'medium' ? 0.6 : 0.3
      }));

      res.json(heatmapData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get statistics
  getStats: async (req: Request, res: Response) => {
    try {
      const total = await Issue.countDocuments();
      const byStatus = await Issue.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const bySeverity = await Issue.aggregate([
        { $group: { _id: '$severity', count: { $sum: 1 } } }
      ]);
      const byCategory = await Issue.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);

      res.json({
        total,
        byStatus: Object.fromEntries(byStatus.map(s => [s._id, s.count])),
        bySeverity: Object.fromEntries(bySeverity.map(s => [s._id, s.count])),
        byCategory: Object.fromEntries(byCategory.map(s => [s._id, s.count]))
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
