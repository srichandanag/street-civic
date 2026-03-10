export interface Issue {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  location: {
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
  };
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  category: string;
  severity: string;
  location: {
    coordinates: [number, number];
    address: string;
  };
}
