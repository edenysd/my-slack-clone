import { create } from "zustand";
import {
  mockAddPrivateMessage,
  mockEditPrivateMessage,
  mockPrivateMessagesData,
  mockRemovePrivateMessage,
} from "../api/privateMessage";
import { sortMessagesByTimestamp } from "../utils/messageUtils";

const useMessageStore = create((set, get) => ({
  loadingPrivateMessages: false,
  privateMessages: [],
  fetchAllPrivateMessages: async () => {
    set({ loadingPrivateMessages: true });
    const messages = await mockPrivateMessagesData();
    set({ privateMessages: messages, loadingPrivateMessages: false });
  },
  filterAllMessagesFromPrivateConversation: ({ from, to }) => {
    const filteredMessages = get().privateMessages.filter((message) => {
      return (
        (message.from == from && message.to == to) ||
        (message.from == to && message.to == from)
      );
    });
    return sortMessagesByTimestamp(filteredMessages);
  },
  sendNewPrivateMessage: ({ from, to, text }) => {
    mockAddPrivateMessage({ from, to, text }).then(() => {
      get().fetchAllPrivateMessages();
    });
  },
  removePrivateMessage: (id) => {
    mockRemovePrivateMessage(id).then(() => {
      get().fetchAllPrivateMessages();
    });
  },
  editPrivateMessage: (id, newText) => {
    mockEditPrivateMessage(id, newText).then(() => {
      get().fetchAllPrivateMessages();
    });
  },
}));

export default useMessageStore;
