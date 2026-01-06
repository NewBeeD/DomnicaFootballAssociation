// src/GamePrediction/components/Leaderboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Avatar,
  Container,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useLeaderboard, useUserLeaderboardPosition } from '../hooks/useLeaderboard.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

/**
 * Leaderboard Component
 * Displays top 50 users ranked by total prediction points
 * Highlights current logged-in user
 * Mobile-responsive with efficient Firestore reads
 */
const Leaderboard = ({ topN = 50, enableRealtime = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [currentUser, setCurrentUser] = useState(null);

  // Monitor auth state
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch leaderboard data
  const { data: leaderboardData, loading, error, lastUpdated } = useLeaderboard(topN, {
    enableRealtime,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch current user's position
  const { position: userPosition } = useUserLeaderboardPosition(
    currentUser?.uid || null
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load leaderboard: {error}
      </Alert>
    );
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No leaderboard data available yet
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <TrophyIcon sx={{ fontSize: 40, color: '#ffd700' }} />
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Score Prediction Leaderboard
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Top {leaderboardData.length} Players by Total Points
            </Typography>
          </Box>
        </Stack>

        {/* Last Updated */}
        {lastUpdated && (
          <Typography variant="caption" color="textSecondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}
      </Box>

      {/* User's Current Position (if logged in and ranked) */}
      {currentUser && userPosition && (
        <UserPositionCard userPosition={userPosition} theme={theme} />
      )}

      {/* Main Leaderboard Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflow: isMobile ? 'auto' : 'visible',
        }}
      >
        <Table stickyHeader sx={{ minWidth: isMobile ? 300 : 750 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 'bold',
                  width: isMobile ? '60px' : '80px',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                Rank
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 'bold',
                  flex: 1,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                Player
              </TableCell>

              {!isMobile && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  Predictions
                </TableCell>
              )}

              <TableCell
                align="right"
                sx={{
                  fontWeight: 'bold',
                  width: isMobile ? '80px' : '120px',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                Points
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leaderboardData.map((user, index) => {
              const isCurrentUser = currentUser && user.userId === currentUser.uid;
              const isMedal = index < 3;

              return (
                <TableRow
                  key={user.userId}
                  sx={{
                    backgroundColor: isCurrentUser
                      ? 'rgba(102, 126, 234, 0.1)' // Highlighted current user
                      : isMedal
                      ? 'rgba(255, 215, 0, 0.05)'
                      : 'inherit',
                    borderLeft: isCurrentUser ? `4px solid #667eea` : 'none',
                    '&:hover': {
                      backgroundColor: isCurrentUser
                        ? 'rgba(102, 126, 234, 0.15)'
                        : 'rgba(0, 0, 0, 0.04)',
                    },
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {/* Rank Cell */}
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {isMedal ? (
                        <MedalIcon rank={index + 1} />
                      ) : (
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          #{user.rank || index + 1}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  {/* Player Name Cell */}
                  <TableCell
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 2,
                      fontSize: isMobile ? '0.875rem' : '1rem',
                    }}
                  >
                    {/* Avatar */}
                    <Avatar
                      src={user.profilePicture}
                      alt={user.displayName}
                      sx={{
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40,
                        backgroundColor: '#667eea',
                      }}
                    >
                      {user.displayName?.charAt(0) || 'U'}
                    </Avatar>

                    {/* Name and Stats */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant={isMobile ? 'body2' : 'body1'}
                          sx={{
                            fontWeight: isCurrentUser ? 'bold' : 'normal',
                            color: isCurrentUser ? '#667eea' : 'inherit',
                          }}
                        >
                          {user.displayName || 'Unknown Player'}
                        </Typography>
                        {isCurrentUser && (
                          <Chip
                            label="You"
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                      {!isMobile && (
                        <Typography variant="caption" color="textSecondary">
                          {user.correctPredictions || 0} correct
                          {user.exactScorePredictions > 0 &&
                            ` • ${user.exactScorePredictions} exact`}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  {/* Predictions Cell (Desktop only) */}
                  {!isMobile && (
                    <TableCell align="center">
                      <Typography variant="body2" color="textSecondary">
                        {user.totalPredictions || 0}
                      </Typography>
                    </TableCell>
                  )}

                  {/* Points Cell */}
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <TrendingIcon
                        sx={{
                          fontSize: isMobile ? '1rem' : '1.2rem',
                          color: '#667eea',
                        }}
                      />
                      <Typography
                        variant={isMobile ? 'body2' : 'body1'}
                        sx={{
                          fontWeight: 'bold',
                          color: '#667eea',
                          fontSize: isMobile ? '1rem' : '1.1rem',
                        }}
                      >
                        {user.totalPoints || 0}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Info */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          📊 Leaderboard updates every 5 minutes
        </Typography>
      </Box>

      {/* Not Ranked Info */}
      {currentUser && !userPosition && (
        <Alert severity="info" sx={{ mt: 3 }}>
          📈 You're not on the leaderboard yet. Make predictions to climb the ranks!
        </Alert>
      )}
    </Container>
  );
};

/**
 * Medal Icon Component for Top 3
 */
function MedalIcon({ rank }) {
  const medals = {
    1: { emoji: '🥇', color: '#ffd700', label: '1st' },
    2: { emoji: '🥈', color: '#c0c0c0', label: '2nd' },
    3: { emoji: '🥉', color: '#cd7f32', label: '3rd' },
  };

  const medal = medals[rank];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Typography sx={{ fontSize: '1.5rem' }}>{medal.emoji}</Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 'bold',
          color: medal.color,
          fontSize: '0.75rem',
        }}
      >
        {medal.label}
      </Typography>
    </Box>
  );
}

/**
 * User Position Card Component
 * Shows current user's rank and stats
 */
function UserPositionCard({ userPosition, theme }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        mb: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
            gap: 2,
            textAlign: 'center',
          }}
        >
          {/* Your Rank */}
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Your Rank
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '2rem' : '2.5rem',
              }}
            >
              #{userPosition.rank || '-'}
            </Typography>
          </Box>

          {/* Your Points */}
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Your Points
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '2rem' : '2.5rem',
              }}
            >
              {userPosition.totalPoints || 0}
            </Typography>
          </Box>

          {/* Predictions */}
          {!isMobile && (
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Predictions
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {userPosition.totalPredictions || 0}
              </Typography>
            </Box>
          )}

          {/* Accuracy */}
          {!isMobile && (
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Correct
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {userPosition.correctPredictions || 0}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default Leaderboard;