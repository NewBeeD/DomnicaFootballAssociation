// src/GamePrediction/services/leaderboardService.js
/**
 * Firestore service for leaderboard
 */

import {
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
  limit,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

/**
 * Get top leaderboard users
 */
export const getTopLeaderboardUsers = async (topN = 50) => {
  /**
   * Get top leaderboard users
   */
  export const getTopLeaderboardUsers = async (topN = 50) => {
    try {
      const q = query(
        collection(db, 'leaderboard', 'current', 'entries'),
        orderBy('rank', 'asc'),
        limit(topN)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  };

/**
 * Get user's leaderboard position
 */
export const getUserLeaderboardPosition = async (userId) => {
  try {
    const docSnapshot = await getDoc(
      doc(db, 'leaderboard', 'current', 'entries', userId)
    );

    if (!docSnapshot.exists()) {
      return null;
    }

    return {
      userId: docSnapshot.id,
      ...docSnapshot.data(),
    };
  } catch (error) {
    console.error('Error fetching user position:', error);
    throw error;
  }
};