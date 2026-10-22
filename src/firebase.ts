import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { Task, Bid, UserProfile } from './types';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific database ID from config
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection as required by Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network restricted.');
    }
    return false;
  }
}

// Google Sign In
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}

// Sign Out
export async function logoutUser() {
  await signOut(auth);
}

// Real-time listener for tasks
export function subscribeToTasks(
  onTasksUpdate: (tasks: Task[]) => void,
  onError?: (err: Error) => void
) {
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const liveTasks: Task[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        liveTasks.push({
          id: docSnap.id,
          orderNumber: data.orderNumber || `LH-${docSnap.id.slice(-4)}`,
          title: data.title,
          urduTitle: data.urduTitle,
          category: data.category,
          city: data.city,
          area: data.area,
          description: data.description,
          budgetPKR: data.budgetPKR,
          isFixedBudget: data.isFixedBudget ?? true,
          isFeatured: data.isFeatured ?? false,
          urgency: data.urgency || 'Urgent (Aaj hi)',
          postedBy: data.postedBy,
          postedByPhone: data.postedByPhone,
          postedByCnic: data.postedByCnic,
          postedAt: data.postedAt || 'Recently',
          status: data.status || 'open',
          acceptedBidId: data.acceptedBidId,
          employerRemarks: data.employerRemarks,
          employerRating: data.employerRating,
          workerRemarks: data.workerRemarks,
          workerRating: data.workerRating,
          bids: Array.isArray(data.bids) ? data.bids : [],
        });
      });
      onTasksUpdate(liveTasks);
    },
    (error) => {
      console.warn('Firestore tasks listener fallback:', error.message);
      if (onError) onError(error);
    }
  );
}

// Save or sync task to Firestore
export async function saveTaskToFirestore(task: Task) {
  try {
    const taskRef = doc(db, 'tasks', task.id);
    await setDoc(taskRef, {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Could not sync task to Firestore:', err);
  }
}

// Add a bid to task in Firestore
export async function addBidToFirestore(taskId: string, newBid: Bid, currentBids: Bid[]) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    const updatedBids = [...currentBids, newBid];
    await updateDoc(taskRef, {
      bids: updatedBids,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Could not add bid to Firestore:', err);
  }
}

// Update task completion and mutual remarks
export async function completeTaskInFirestore(
  taskId: string,
  employerRemarks: string,
  employerRating: number,
  workerRemarks: string,
  workerRating: number
) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      status: 'completed',
      employerRemarks,
      employerRating,
      workerRemarks,
      workerRating,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Could not complete task in Firestore:', err);
  }
}

// Save or sync user profile
export async function syncUserProfileToFirestore(userProfile: Partial<UserProfile> & { id: string }) {
  try {
    const userRef = doc(db, 'users', userProfile.id);
    await setDoc(
      userRef,
      {
        ...userProfile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync user profile to Firestore:', err);
  }
}
