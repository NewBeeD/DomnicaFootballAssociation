// src/GamePrediction/pages/PredictionGameDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import SoccerIcon from '@mui/icons-material/SportsFootball';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import individual components
import PredictionPage from './PredictionPage';
import MyPredictionsPage from './MyPredictionsPage';
import LeaderboardPage from './LeaderboardPage';
import { useUserLeaderboardPosition } from '../hooks/useLeaderboard.jsx';

const PredictionGameDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [userPosition, setUserPosition] = useState(null);

  // Monitor auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's leaderboard position for stats
  const { position: leaderboardPosition } = useUserLeaderboardPosition(
    currentUser?.uid || null
  );

  useEffect(() => {
    if (leaderboardPosition) {
      setUserPosition(leaderboardPosition);
    }
  }, [leaderboardPosition]);

  if (!currentUser) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">Please log in to access the Prediction Game.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <SoccerIcon sx={{ mr: 2, fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              ⚽ Prediction Game
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Make predictions • Track results • Climb the ranks
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* Spacing */}

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* User Stats Card */}
        {userPosition && (
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Your Rank
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    #{userPosition.rank || '-'}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Total Points
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {userPosition.totalPoints || 0}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Predictions
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {userPosition.totalPredictions || 0}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Correct
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {userPosition.correctPredictions || 0}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, backgroundColor: 'white', borderRadius: '8px 8px 0 0' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            <Tab 
              icon={<SoccerIcon sx={{ mr: 1 }} />}
              iconPosition="start"
              label="Make Predictions" 
            />
            <Tab 
              icon={<AssignmentIcon sx={{ mr: 1 }} />}
              iconPosition="start"
              label="My Predictions" 
            />
            <Tab 
              icon={<EmojiEventsIcon sx={{ mr: 1 }} />}
              iconPosition="start"
              label="Leaderboard" 
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ backgroundColor: 'white', borderRadius: '0 0 8px 8px', p: 3 }}>
          {/* Make Predictions Tab */}
          {tabValue === 0 && (
            <Box>
              <PredictionPage />
            </Box>
          )}

          {/* My Predictions Tab */}
          {tabValue === 1 && (
            <Box>
              <MyPredictionsPage />
            </Box>
          )}

          {/* Leaderboard Tab */}
          {tabValue === 2 && (
            <Box>
              <LeaderboardPage />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PredictionGameDashboard;
