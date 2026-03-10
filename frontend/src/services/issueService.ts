import axios from 'axios';
import { Issue, CreateIssuePayload } from '../types/Issue';

const API_BASE = '/api';

export const issueService = {
  getAll: async (filters?: any): Promise<Issue[]> => {
    const response = await axios.get(`${API_BASE}/issues`, { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Issue> => {
    const response = await axios.get(`${API_BASE}/issues/${id}`);
    return response.data;
  },

  create: async (payload: CreateIssuePayload): Promise<Issue> => {
    const response = await axios.post(`${API_BASE}/issues`, payload);
    return response.data;
  },

  update: async (id: string, payload: Partial<Issue>): Promise<Issue> => {
    const response = await axios.put(`${API_BASE}/issues/${id}`, payload);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/issues/${id}`);
  },

  getHeatmapData: async () => {
    const response = await axios.get(`${API_BASE}/issues/heatmap/data`);
    return response.data;
  },

  upvote: async (id: string): Promise<Issue> => {
    const response = await axios.post(`${API_BASE}/issues/${id}/upvote`);
    return response.data;
  }
};
