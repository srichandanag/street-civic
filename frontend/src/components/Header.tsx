import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useState } from 'react';
import IssueReportDialog from './IssueReportDialog';
import ReportGmalerrorIcon from '@mui/icons-material/ReportGmalerror';

interface HeaderProps {
  onIssueCreated: () => void;
}

export default function Header({ onIssueCreated }: HeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <ReportGmalerrorIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Street Civic
          </Typography>
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={() => setDialogOpen(true)}
            sx={{ borderColor: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
          >
            Report Issue
          </Button>
        </Toolbar>
      </AppBar>

      <IssueReportDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        onIssueCreated={onIssueCreated}
      />
    </>
  );
}
