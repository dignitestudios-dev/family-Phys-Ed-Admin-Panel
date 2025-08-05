import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// Create a new support chat between admin and user if not exists
export async function createOrGetSupportChat(adminUid: string, userProfile: any) {
  // Chat ID: sorted uids joined by _
  const chatId = [adminUid, userProfile.uid].sort().join("_");
  const chatRef = doc(db, "support_chats", chatId);
  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) {
    // Create new chat doc
    await setDoc(chatRef, {
      members: [adminUid, userProfile.uid],
      created_at: serverTimestamp(),
      last_msg: "",
      unseen_counts: {
        [adminUid]: 0,
        [userProfile.uid]: 0,
      },
      is_deleted: {
        [adminUid]: false,
        [userProfile.uid]: false,
      },
      profile: userProfile, // for admin's view
    });
  } else {
    // If chat exists but was deleted for admin, restore it
    if (chatSnap.data().is_deleted?.[adminUid]) {
      await updateDoc(chatRef, {
        ["is_deleted." + adminUid]: false,
      });
    }
  }
  return chatId;
}
