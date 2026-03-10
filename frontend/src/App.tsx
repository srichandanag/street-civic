import { useEffect, useState } from 'react';
import { Container, Grid, Box, Paper, Typography, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Heatmap from './components/Heatmap';
import IssueCard from './components/IssueCard';
import { Issue } from './types/Issue';
import { issueService } from './services/issueService';

function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getAll();
      setIssues(data);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
    // Refresh every 30 seconds
    const interval = setInterval(fetchIssues, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onIssueCreated={fetchIssues} />
      
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Map Section */}
        <Box sx={{ flex: 2, minHeight: 0, backgroundColor: '#e0e0e0' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Heatmap issues={issues} />
          )}
        </Box>

        {/* Issues List Section */}
        <Box sx={{ 
          flex: 1, 
          minHeight: 0, 
          backgroundColor: 'white',
          borderLeft: '1px solid #e0e0e0',
          overflowY: 'auto'
        }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Recent Issues ({issues.length})
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : issues.length === 0 ? (
              <Typography color="textSecondary">
                No issues reported yet. Be the first to report!
              </Typography>
            ) : (
              issues.map(issue => (
                <IssueCard key={issue._id} issue={issue} />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
