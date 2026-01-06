// src/GamePrediction/components/PredictionForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { validatePrediction } from '../utils/predictionValidators';
import { usePredictionMutation } from '../hooks/usePredictionMutation';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const PredictionForm = ({ match, onSubmitSuccess }) => {
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [predictedOutcome, setPredictedOutcome] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [kickoffPassed, setKickoffPassed] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { submit, loading } = usePredictionMutation();

  // Monitor auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Check kickoff time
  useEffect(() => {
    if (!match?.scheduledTime) return;

    const checkKickoff = () => {
      const kickoffTime = new Date(match.scheduledTime.seconds * 1000);
      setKickoffPassed(new Date() >= kickoffTime);
    };

    checkKickoff();
    const timer = setInterval(checkKickoff, 60000);

    return () => clearInterval(timer);
  }, [match]);

  // Derive outcome from scores
  useEffect(() => {
    if (homeScore === '' || awayScore === '') {
      setPredictedOutcome('');
      return;
    }

    const home = parseInt(homeScore, 10);
    const away = parseInt(awayScore, 10);

    if (home > away) {
      setPredictedOutcome('HOME_WIN');
    } else if (home < away) {
      setPredictedOutcome('AWAY_WIN');
    } else {
      setPredictedOutcome('DRAW');
    }
  }, [homeScore, awayScore]);

  const validateForm = () => {
    const newErrors = {};

    if (homeScore === '') {
      newErrors.homeScore = 'Home score is required';
    } else {
      const home = parseInt(homeScore, 10);
      if (home < 0 || home > 20) {
        newErrors.homeScore = 'Score must be 0-20';
      }
    }

    if (awayScore === '') {
      newErrors.awayScore = 'Away score is required';
    } else {
      const away = parseInt(awayScore, 10);
      if (away < 0 || away > 20) {
        newErrors.awayScore = 'Score must be 0-20';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // In src/GamePrediction/components/PredictionForm.jsx - line ~125
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      enqueueSnackbar('Please fix form errors', { variant: 'warning' });
      return;
    }

    if (!currentUser) {
      enqueueSnackbar('Please log in to make a prediction', { variant: 'error' });
      return;
    }

    // ✅ Use match.id or match.matchId
    if (!match?.id && !match?.matchId) {
      enqueueSnackbar('Match data is invalid', { variant: 'error' });
      return;
    }

    try {
      await submit(currentUser.uid, match.id || match.matchId, {
        predictedOutcome,
        predictedScore: {
          home: parseInt(homeScore, 10),
          away: parseInt(awayScore, 10),
        },
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };

  const handleClear = () => {
    setHomeScore('');
    setAwayScore('');
    setPredictedOutcome('');
    setErrors({});
  };

  if (!match) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Match data not available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardHeader
        title={`${match.homeTeamName || 'Home'} vs ${match.awayTeamName || 'Away'}`}
        subheader={
          match.scheduledTime && (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              {new Date(match.scheduledTime.seconds * 1000).toLocaleString()}
            </Typography>
          )
        }
        sx={{ textAlign: 'center' }}
      />

      {kickoffPassed && (
        <Alert severity="error" sx={{ mx: 2, mt: 2 }}>
          ⏰ Kickoff time has passed. Predictions closed.
        </Alert>
      )}

      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                📊 Predict the Final Score
              </Typography>

              <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Home Score"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    inputProps={{ min: 0, max: 20 }}
                    error={!!errors.homeScore}
                    helperText={errors.homeScore}
                    disabled={kickoffPassed || loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', opacity: 0.8 }}>
                    VS
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Away Score"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    inputProps={{ min: 0, max: 20 }}
                    error={!!errors.awayScore}
                    helperText={errors.awayScore}
                    disabled={kickoffPassed || loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />

            {predictedOutcome && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                  Predicted Outcome
                </Typography>
                <Chip
                  icon={<EmojiEventsIcon />}
                  label={
                    predictedOutcome === 'HOME_WIN'
                      ? `${match.homeTeamName} Win`
                      : predictedOutcome === 'AWAY_WIN'
                      ? `${match.awayTeamName} Win`
                      : 'Draw'
                  }
                  color={
                    predictedOutcome === 'HOME_WIN' || predictedOutcome === 'AWAY_WIN'
                      ? 'success'
                      : 'warning'
                  }
                  variant="filled"
                  sx={{
                    fontSize: '1rem',
                    height: 'auto',
                    py: 2,
                  }}
                />
              </Paper>
            )}

            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Correct Outcome
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    +3 pts
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Exact Score
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    +5 pts
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>

          <CardActions sx={{ justifyContent: 'flex-end', gap: 1, pt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClear}
              disabled={loading || kickoffPassed}
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Clear
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading || kickoffPassed || !currentUser}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Saving...
                </>
              ) : (
                'Submit Prediction'
              )}
            </Button>
          </CardActions>

          {!currentUser && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Please log in to make a prediction
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;





