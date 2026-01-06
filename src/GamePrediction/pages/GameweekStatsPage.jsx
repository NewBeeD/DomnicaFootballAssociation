// src/GamePrediction/pages/GameweekStatsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getUserAllGameweekStats } from '../services/gameweekService';

const GameweekStatsPage = ({ userId }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getUserAllGameweekStats(userId);
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to load gameweek statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (!userId) {
    return <Alert severity="warning">Please log in to view gameweek statistics.</Alert>;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (stats.length === 0) {
    return <Alert severity="info">No gameweek statistics available yet.</Alert>;
  }

  // Calculate summary stats
  const totalGameweekPoints = stats.reduce((sum, gw) => sum + (gw.gameweekPoints || 0), 0);
  const totalGameweekPredictions = stats.reduce((sum, gw) => sum + (gw.gameweekPredictions || 0), 0);
  const totalGameweekCorrect = stats.reduce((sum, gw) => sum + (gw.gameweekCorrect || 0), 0);
  const avgGameweekPoints = stats.length > 0 ? (totalGameweekPoints / stats.length).toFixed(1) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Gameweeks Played
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {stats.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Gameweek Points
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                {totalGameweekPoints}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Avg Points/GW
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                {avgGameweekPoints}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Accuracy
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                {totalGameweekPredictions > 0
                  ? ((totalGameweekCorrect / totalGameweekPredictions) * 100).toFixed(0)
                  : 0}
                %
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Gameweek Table */}
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <TrendingUpIcon sx={{ color: '#1976d2' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Gameweek Performance
            </Typography>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gameweek</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    Points
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    Predictions
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    Correct
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    Accuracy
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    Exact Scores
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.map((gw) => (
                  <TableRow key={gw.gameweek} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Gameweek {gw.gameweek}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                      {gw.gameweekPoints || 0}
                    </TableCell>
                    <TableCell align="right">{gw.gameweekPredictions || 0}</TableCell>
                    <TableCell align="right">
                      <Stack sx={{ alignItems: 'flex-end' }}>
                        <Typography>{gw.gameweekCorrect || 0}</Typography>
                        {gw.gameweekPredictions > 0 && (
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            ({((gw.gameweekCorrect / gw.gameweekPredictions) * 100).toFixed(0)}%)
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {gw.gameweekPredictions > 0
                        ? ((gw.gameweekCorrect / gw.gameweekPredictions) * 100).toFixed(0)
                        : 0}
                      %
                    </TableCell>
                    <TableCell align="right">{gw.gameweekExactScores || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GameweekStatsPage;
