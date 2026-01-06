// src/GamePrediction/hooks/useLeaderboard.js
/**
 * Custom hook for fetching leaderboard
 */

import { useEffect, useState, useCallback } from 'react';
import {
  subscribeTopLeaderboardUsers,
  getUserLeaderboardPosition,
} from '../services/leaderboardService';

  const { enableRealtime = false, refetchInterval = 5 * 60 * 1000 } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;
    setLoading(true);
    setError(null);
    if (enableRealtime) {
      unsubscribe = subscribeTopLeaderboardUsers(topN, (leaderboardData) => {
        setData(leaderboardData);
        setLoading(false);
      });
    } else {
      // fallback to polling if not realtime
      const fetch = async () => {
        try {
          setLoading(true);
          setError(null);
          const { getTopLeaderboardUsers } = await import('../services/leaderboardService');
          const leaderboardData = await getTopLeaderboardUsers(topN);
          setData(leaderboardData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetch();
      const interval = setInterval(fetch, refetchInterval);
      unsubscribe = () => clearInterval(interval);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [topN, enableRealtime, refetchInterval]);

  return { data, loading, error };
};

export const useUserLeaderboardPosition = (userId) => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setPosition(null);
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const userPosition = await getUserLeaderboardPosition(userId);
        setPosition(userPosition);
      } catch (err) {
        console.error('Error fetching user position:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();

    const interval = setInterval(fetch, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userId]);

  return { position, loading, error };
};