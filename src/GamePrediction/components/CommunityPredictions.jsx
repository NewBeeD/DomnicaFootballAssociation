// src/GamePrediction/components/CommunityPredictions.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Stack,
  LinearProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getMatchCommunityStats, getPredictionAccuracyRate } from '../services/communityStatsService';

const CommunityPredictions = ({ matchId, match }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [stats, setStats] = useState(null);
  const [accuracyRate, setAccuracyRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchId) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getMatchCommunityStats(matchId);
        const accuracy = await getPredictionAccuracyRate();
        setStats(data);
        setAccuracyRate(accuracy);
        setError(null);
      } catch (err) {
        setError('Failed to load community predictions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [matchId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error || !stats) {
    return null;
  }

  if (stats.totalPredictions === 0) {
    return (
      <Card sx={{ mt: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            No community predictions yet for this match.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Find the most predicted outcome
  const outcomes = [
    { key: 'HOME_WIN', label: `${match?.homeTeamName} Win`, emoji: '🏠' },
    { key: 'AWAY_WIN', label: `${match?.awayTeamName} Win`, emoji: '✈️' },
    { key: 'DRAW', label: 'Draw', emoji: '🤝' },
  ];

  const outcomesData = outcomes.map((outcome) => ({
    ...outcome,
    ...stats.outcomes[outcome.key],
  }));

  const mostPredicted = outcomesData.reduce((prev, current) =>
    current.count > prev.count ? current : prev
  );

  // Get confidence color based on score
  const getConfidenceColor = (score) => {
    if (score >= 70) return '#4caf50'; // Green - High confidence
    if (score >= 50) return '#ff9800'; // Orange - Medium confidence
    return '#f44336'; // Red - Low confidence
  };

  // Get bias color and direction
  const getBiasLabel = (bias) => {
    if (bias > 0) return `${bias}% Home Bias 🏠`;
    if (bias < 0) return `${Math.abs(bias)}% Away Bias ✈️`;
    return 'No Bias 🤝';
  };

  return (
    <Card sx={{ mt: 2, backgroundColor: '#f9f9f9', borderLeft: '4px solid #667eea' }}>
      <CardContent>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
          <EmojiEventsIcon sx={{ color: '#667eea' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            🌍 Community Predictions & Analytics ({stats.totalPredictions} {stats.totalPredictions === 1 ? 'vote' : 'votes'})
          </Typography>
        </Stack>

        {/* MAIN PREDICTION OUTCOMES */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {outcomesData.map((outcome) => (
            <Grid item xs={12} sm={4} key={outcome.key}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: outcome.key === mostPredicted.key ? '#e3f2fd' : '#fff',
                  border: outcome.key === mostPredicted.key ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  borderRadius: 1,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {outcome.emoji}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {outcome.label}
                </Typography>

                {/* Percentage Bar */}
                <Box sx={{ mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(outcome.percentage)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          outcome.key === 'HOME_WIN'
                            ? '#1976d2'
                            : outcome.key === 'AWAY_WIN'
                            ? '#f44336'
                            : '#ff9800',
                      },
                    }}
                  />
                </Box>

                {/* Percentage and Count */}
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {outcome.percentage}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    ({outcome.count})
                  </Typography>
                </Stack>

                {/* Most Predicted Badge */}
                {outcome.key === mostPredicted.key && (
                  <Chip
                    label="Most Predicted 🔥"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ANALYTICS SECTION */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f7ff', borderRadius: 1, border: '1px solid #e3f2fd' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon fontSize="small" /> Key Analytics
          </Typography>

          <Grid container spacing={2}>
            {/* 1. Confidence Score */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', display: 'block' }}>
                  Community Unity
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `conic-gradient(${getConfidenceColor(stats.confidenceScore)} 0deg ${stats.confidenceScore * 3.6}deg, #e0e0e0 ${stats.confidenceScore * 3.6}deg)`,
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {stats.confidenceScore}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {stats.confidenceScore >= 70 ? '🟢 High Unity' : stats.confidenceScore >= 50 ? '🟡 Moderate' : '🔴 Divided'}
                </Typography>
              </Box>
            </Grid>

            {/* 2. Home/Away Bias */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', display: 'block' }}>
                  Prediction Bias
                </Typography>
                <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: stats.homeAwayBias > 0 ? '#1976d2' : stats.homeAwayBias < 0 ? '#f44336' : '#ff9800' }}>
                    {getBiasLabel(stats.homeAwayBias)}
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                  vs neutral
                </Typography>
              </Box>
            </Grid>

            {/* 3. Historical Accuracy */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', display: 'block' }}>
                  Historical Accuracy
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `conic-gradient(#4caf50 0deg ${(accuracyRate?.accuracy || 0) * 3.6}deg, #e0e0e0 ${(accuracyRate?.accuracy || 0) * 3.6}deg)`,
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {accuracyRate?.accuracy || 0}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {accuracyRate?.sampleSize || 0} past matches
                </Typography>
              </Box>
            </Grid>

            {/* 4. Consensus Strength */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', display: 'block' }}>
                  Consensus Strength
                </Typography>
                <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {mostPredicted.percentage}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                    community agrees
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ADDITIONAL INSIGHTS */}
        {stats.scoreDistribution && stats.scoreDistribution.length > 0 && (
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                📊 Top Predicted Scorelines
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                {stats.scoreDistribution.map((scoreline, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: 'center',
                      mb: 2,
                      p: 1.5,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: 50, textAlign: 'center' }}>
                      {scoreline.score}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={parseFloat(scoreline.percentage)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#667eea',
                          },
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ minWidth: 80, textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {scoreline.percentage}%
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        ({scoreline.count})
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Summary Text */}
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          {mostPredicted.percentage}% of predictors think <strong>{mostPredicted.label}</strong> will happen
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommunityPredictions;
