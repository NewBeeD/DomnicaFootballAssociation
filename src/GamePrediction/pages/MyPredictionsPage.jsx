// src/GamePrediction/pages/MyPredictionsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { usePredictions } from '../hooks/usePrediction';
import { useMatches } from '../hooks/useMatches';
import MatchCard from '../components/MatchCard';
import MatchResultsView from '../components/MatchResultsView';
import UserStatsCard from '../components/UserStatsCard';
import AssignmentIcon from '@mui/icons-material/Assignment';

const MyPredictionsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return () => unsubscribe();
  }, []);

  const { predictions, loading: predictionsLoading } = usePredictions(currentUser?.uid);
  const { matches: finishedMatches } = useMatches('FINISHED');

  if (!currentUser) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">Please log in to view your predictions.</Alert>
      </Container>
    );
  }

  if (predictionsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Create match map for quick lookup
  const matchMap = finishedMatches.reduce((acc, match) => {
    acc[match.id] = match;
    return acc;
  }, {});

  const unscoredPredictions = predictions.filter((p) => p.points === 0);
  const scoredPredictions = predictions.filter((p) => p.points > 0);

  return (
    <>
      <AppBar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <AssignmentIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Predictions
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Your Statistics
          </Typography>
          <UserStatsCard userId={currentUser.uid} />
        </Box>

        {/* Tabs */}
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label={`Pending (${unscoredPredictions.length})`} />
          <Tab label={`Scored (${scoredPredictions.length})`} />
        </Tabs>

        {/* Pending Predictions */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {unscoredPredictions.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info">No pending predictions</Alert>
              </Grid>
            ) : (
              unscoredPredictions.map((pred) => (
                <Grid item xs={12} md={6} lg={4} key={pred.docId}>
                  <MatchCard match={matchMap[pred.matchId]} prediction={pred} />
                </Grid>
              ))
            )}
          </Grid>
        )}

        {/* Scored Predictions */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            {scoredPredictions.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info">No scored predictions yet</Alert>
              </Grid>
            ) : (
              scoredPredictions.map((pred) => (
                <Grid item xs={12} md={6} lg={4} key={pred.docId}>
                  <Box>
                    <MatchCard match={matchMap[pred.matchId]} prediction={pred} />
                    <Box sx={{ mt: 2 }}>
                      <MatchResultsView prediction={pred} match={matchMap[pred.matchId]} />
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MyPredictionsPage;