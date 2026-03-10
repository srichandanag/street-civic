import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

interface IssueReportDialogProps {
  open: boolean;
  onClose: () => void;
  onIssueCreated: () => void;
}

const CATEGORIES = [
  { value: 'pothole', label: 'Pothole' },
  { value: 'broken_light', label: 'Broken Light' },
  { value: 'broken_sign', label: 'Broken Sign' },
  { value: 'damaged_curb', label: 'Damaged Curb' },
  { value: 'flooding', label: 'Flooding' },
  { value: 'debris', label: 'Debris' },
  { value: 'graffiti', label: 'Graffiti' },
  { value: 'other', label: 'Other' }
];

const SEVERITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High Critical' }
];

export default function IssueReportDialog({ open, onClose, onIssueCreated }: IssueReportDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('pothole');
  const [severity, setSeverity] = useState('medium');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAddress(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
      });
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !address) {
      setError('Please fill in all fields');
      return;
    }

    if (latitude === 0 || longitude === 0) {
      setError('Please set location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5001/api/issues', {
        title,
        description,
        category,
        severity,
        location: {
          coordinates: [longitude, latitude],
          address
        }
      });

      setTitle('');
      setDescription('');
      setCategory('pothole');
      setSeverity('medium');
      setAddress('');
      setLatitude(0);
      setLongitude(0);
      onIssueCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report a Street Issue</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          placeholder="e.g., Large pothole on Main St"
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
          placeholder="Describe the issue in detail"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {CATEGORIES.map(cat => (
              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Severity</InputLabel>
          <Select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            label="Severity"
          >
            {SEVERITIES.map(sev => (
              <MenuItem key={sev.value} value={sev.value}>{sev.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <TextField
            fullWidth
            label="Location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Click button to use current location"
          />
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={handleGetLocation}
            sx={{ mt: 1 }}
          >
            📍 Use Current Location
          </Button>
          <TextField
            fullWidth
            label="Latitude"
            value={latitude}
            disabled
            sx={{ mt: 1 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Longitude"
            value={longitude}
            disabled
            sx={{ mt: 1 }}
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Report Issue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}