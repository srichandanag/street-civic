import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import { Issue } from '../types/Issue';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const severityColor = {
    low: 'success',
    medium: 'warning',
    high: 'error'
  } as any;

  const severityIcon = issue.severity === 'high' ? <ErrorIcon /> : <WarningIcon />;

  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {issue.title}
          </Typography>
          <Chip 
            label={issue.severity.toUpperCase()} 
            color={severityColor[issue.severity]}
            size="small"
            icon={severityIcon}
          />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {issue.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip 
            label={issue.category.replace(/_/g, ' ')} 
            variant="outlined"
            size="small"
          />
          <Chip 
            label={`📍 ${issue.location.address}`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Typography variant="caption" color="textSecondary">
          {new Date(issue.createdAt).toLocaleDateString()} • 👍 {issue.upvotes} votes
        </Typography>
      </CardContent>
    </Card>
  );
}
