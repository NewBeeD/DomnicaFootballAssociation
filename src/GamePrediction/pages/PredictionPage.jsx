// src/GamePrediction/pages/PredictionPage.jsx
import React from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import MatchCard from '../components/MatchCard';
import { useMatches } from '../hooks/useMatches';
import { usePredictions } from '../hooks/usePrediction';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import SoccerIcon from '@mui/icons-material/SportsFootball';
import { useState, useEffect } from 'react';

import NavBar from '../../components/homePage/NavBar';

const PredictionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return () => unsubscribe();
  }, []);

  const { matches, loading: matchesLoading } = useMatches('UPCOMING');
  const { predictions } = usePredictions(currentUser?.uid);

  // Create map of predictions by matchId for quick lookup
  const predictionsByMatch = predictions.reduce((acc, pred) => {
    acc[pred.matchId] = pred;
    return acc;
  }, {});

  if (matchesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">No upcoming matches available for predictions.</Alert>
      </Container>
    );
  }

  return (
    <>

      <NavBar />
      {/* <AppBar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', marginTop: {xs: '74px'} }} position="fixed"  >
        <Toolbar>
          <SoccerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Score Prediction Game
          </Typography>
        </Toolbar>
      </AppBar> */}

      <Toolbar /> {/* Spacing for fixed AppBar */}

      <Container maxWidth="lg" sx={{ py: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            ⚽ Upcoming Matches
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Predict match results and earn points! Correct outcome: +3 pts, Exact score: +5 pts
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {matches.map((match) => (
            <Grid item xs={12} md={6} lg={4} key={match.id}>
              <PredictionForm
                match={match}
                onSubmitSuccess={() => {
                  // Optionally refresh predictions
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PredictionPage;