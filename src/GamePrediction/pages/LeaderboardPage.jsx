// src/GamePrediction/pages/LeaderboardPage.jsx
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Leaderboard from '../components/Leaderboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const LeaderboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <EmojiEventsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Leaderboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Leaderboard topN={50} enableRealtime={true} />
      </Container>
    </Box>
  );
};

export default LeaderboardPage;