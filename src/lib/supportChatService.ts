import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  serverTimestamp,
  getDoc,
  writeBatch,
} from "firebase/firestore";

// Listen to all support chats for admin (all users who ever messaged admin)
export function listenSupportChats(adminUid: string, callback: any) {
  const q = query(collection(db, "support_chats"));
  return onSnapshot(q, async (snapshot) => {
    const chats = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        // Get the other user profile
        const otherUid = (data.members || []).find(
          (uid: string) => uid !== adminUid
        );
        let profile = null;
        if (otherUid) {
          const userDoc = await getDoc(doc(db, "users", otherUid));
          profile = userDoc.exists() ? userDoc.data() : null;
        }
        return {
          id: docSnap.id,
          ...data,
          profile,
        };
      })
    );
    callback(chats);
  });
}

// Listen to messages in a support chat
export function listenSupportChatMessages(chatId: string, callback: any) {
  const q = query(
    collection(db, "support_chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
}

// Send a message in support chat
export async function sendSupportMessage(
  chatId: string,
  message: any,
  receiverUid: string,
  senderUid: string
) {
  const messagesRef = collection(db, "support_chats", chatId, "messages");
  await addDoc(messagesRef, {
    ...message,
    timestamp: serverTimestamp(),
    isSeen: false,
    uid: senderUid,
  });
  // Update last_msg, created_at, unseen_counts
  const chatDoc = doc(db, "support_chats", chatId);
  // Unseen counts logic: recalculate unseen for receiver and sender
  const msgSnap = await getDocs(
    query(
      messagesRef,
      where("uid", "==", receiverUid),
      where("isSeen", "==", false)
    )
  );
  const senderSnap = await getDocs(
    query(
      messagesRef,
      where("uid", "==", senderUid),
      where("isSeen", "==", false)
    )
  );
  await updateDoc(chatDoc, {
    last_msg: message.msg,
    created_at: serverTimestamp(),
    ["unseen_counts." + receiverUid]: msgSnap.size,
    ["unseen_counts." + senderUid]: senderSnap.size,
  });
}

// Mark all messages as seen for admin
export async function updateSupportSeenStatus(
  chatId: string,
  adminUid: string
) {
  const messagesRef = collection(db, "support_chats", chatId, "messages");
  const q = query(
    messagesRef,
    where("uid", "==", adminUid),
    where("isSeen", "==", false)
  );
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((docSnap) => {
    batch.update(docSnap.ref, { isSeen: true });
  });
  await batch.commit();
  const chatDoc = doc(db, "support_chats", chatId);
  await updateDoc(chatDoc, {
    ["unseen_counts." + adminUid]: 0,
  });
}
