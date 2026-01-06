// src/GamePrediction/components/MatchCard.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  Chip,
  Avatar,
  Grid,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatScore, formatTimeRemaining, hasTimePasssed } from '../utils/pointsCalculator';
import SoccerIcon from '@mui/icons-material/SportsFootball';
import TimerIcon from '@mui/icons-material/Timer';

const MatchCard = ({ match, prediction, onEdit, onDelete }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isKickoff, setIsKickoff] = useState(false);

  useEffect(() => {
    if (!match?.scheduledTime) return;

    const updateTime = () => {
      setTimeRemaining(formatTimeRemaining(match.scheduledTime));
      setIsKickoff(hasTimePasssed(match.scheduledTime));
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, [match]);

  if (!match) return null;

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        borderLeft: prediction ? '4px solid #667eea' : 'none',
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SoccerIcon sx={{ color: '#667eea' }} />
            <Typography variant="h6">
              {match.homeTeamName} vs {match.awayTeamName}
            </Typography>
            {/* Admin Edit/Delete Buttons */}
            {(onEdit || onDelete) && (
              <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                {onEdit && (
                  <Tooltip title="Edit Match">
                    <IconButton size="small" onClick={() => onEdit(match)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title="Delete Match">
                    <IconButton size="small" onClick={() => onDelete(match.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </Box>
        }
        subheader={
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TimerIcon sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">
                {timeRemaining} {isKickoff ? '- Match started' : '- until kickoff'}
              </Typography>
            </Stack>
            <Chip
              label={match.status}
              size="small"
              color={match.status === 'FINISHED' ? 'success' : 'warning'}
              variant="outlined"
            />
          </Stack>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {/* Score Section */}
          <Grid item xs={12}>
            {match.status === 'FINISHED' && match.actualScore ? (
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Final Score
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {formatScore(match.actualScore)}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Match in progress...
              </Typography>
            )}
          </Grid>

          {/* User Prediction */}
          {prediction && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Your Prediction
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="textSecondary">
                    Prediction
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {formatScore(prediction.predictedScore)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="textSecondary">
                    Outcome
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {prediction.predictedOutcome === 'HOME_WIN'
                      ? `${match.homeTeamName} Win`
                      : prediction.predictedOutcome === 'AWAY_WIN'
                      ? `${match.awayTeamName} Win`
                      : 'Draw'}
                  </Typography>
                </Box>
              </Grid>

              {prediction.points > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ p: 1, backgroundColor: '#e8f5e9', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="textSecondary">
                      Points Earned
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#2e7d32',
                      }}
                    >
                      +{prediction.points} pts
                    </Typography>
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MatchCard;