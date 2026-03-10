import { MapContainer, TileLayer, Tooltip, Popup } from 'react-leaflet';
import { Box, Card, Chip, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Issue } from '../types/Issue';

interface HeatmapProps {
  issues: Issue[];
}

export default function Heatmap({ issues }: HeatmapProps) {
  const mapRef = useRef<any>(null);
  const heatmapLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !issues.length) return;

    const map = mapRef.current;
    
    // Remove old heatmap layer
    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current);
    }

    // Create heatmap data: [lat, lng, intensity]
    const heatmapData = issues.map(issue => {
      const [lng, lat] = issue.location.coordinates;
      const intensity = issue.severity === 'high' ? 1.0 : issue.severity === 'medium' ? 0.6 : 0.3;
      return [lat, lng, intensity];
    });

    // Create custom heatmap using circles (since leaflet-heat requires additional setup)
    const featureGroup = L.featureGroup();
    
    issues.forEach(issue => {
      const [lng, lat] = issue.location.coordinates;
      
      // Color based on severity
      let color = '#ffd700'; // Green for low
      if (issue.severity === 'high') color = '#dc3545'; // Red
      else if (issue.severity === 'medium') color = '#ffc107'; // Orange/Yellow
      else color = '#90EE90'; // Green

      const circle = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.7
      });

      circle.bindPopup(`
        <div style="font-size: 12px; width: 200px;">
          <strong>${issue.title}</strong><br/>
          Category: ${issue.category}<br/>
          Severity: ${issue.severity}<br/>
          ${issue.description.substring(0, 100)}...
        </div>
      `);

      featureGroup.addLayer(circle);
    });

    featureGroup.addTo(map);
    heatmapLayerRef.current = featureGroup;

  }, [issues]);

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={[40.7128, -74.0060]} // New York as default
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      {/* Legend */}
      <Card
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          p: 2,
          backgroundColor: 'white',
          maxWidth: 250
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Issue Severity
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#90EE90', borderRadius: '50%' }} />
          <Typography variant="caption">Low Severity</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#ffc107', borderRadius: '50%' }} />
          <Typography variant="caption">Medium Severity</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: '#dc3545', borderRadius: '50%' }} />
          <Typography variant="caption">High Severity</Typography>
        </Box>

        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#666' }}>
          Total Issues: {issues.length}
        </Typography>
      </Card>
    </Box>
  );
}
