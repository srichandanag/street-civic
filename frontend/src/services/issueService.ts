import axios from 'axios';
import { Issue } from '../types/Issue';

const API_BASE = 'http://localhost:5001/api';

export const issueService = {
  getAll: async (): Promise<Issue[]> => {
    const response = await axios.get(`${API_BASE}/issues`);
    return response.data;
  },

  create: async (issue: Partial<Issue>): Promise<Issue> => {
    const response = await axios.post(`${API_BASE}/issues`, issue);
    return response.data;
  },

  getById: async (id: string): Promise<Issue> => {
    const response = await axios.get(`${API_BASE}/issues/${id}`);
    return response.data;
  },

  update: async (id: string, issue: Partial<Issue>): Promise<Issue> => {
    const response = await axios.put(`${API_BASE}/issues/${id}`, issue);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/issues/${id}`);
  }
};