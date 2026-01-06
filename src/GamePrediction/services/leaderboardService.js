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
import { getAuth } from 'firebase/auth';

/**
 * Get top leaderboard users
 */
export const getTopLeaderboardUsers = async (topN = 50) => {
  try {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('totalPoints', 'desc'),
      limit(topN)
    );

    const snapshot = await getDocs(q);
    const auth = getAuth();
    
    // Enrich with display names from auth if missing
    const users = await Promise.all(
      snapshot.docs.map(async (doc, index) => {
        const userData = doc.data();
        let displayName = userData.displayName;

        // If displayName is missing, try to get from auth
        if (!displayName && auth.currentUser?.uid === doc.id) {
          displayName = auth.currentUser.displayName || auth.currentUser.email;
        }

        return {
          userId: doc.id,
          rank: index + 1,
          displayName: displayName || 'Unknown Player',
          ...userData,
        };
      })
    );

    return users;
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
      doc(db, 'leaderboard', userId)
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