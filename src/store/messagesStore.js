import { create } from "zustand";
import {
  mockAddPrivateMessage,
  mockPrivateMessagesData,
} from "../api/messages";

const useMessageStore = create((set, get) => ({
  loadingPrivateMessages: false,
  privateMessages: [],
  fetchAllPrivateMessages: () => {
    set({ loadingPrivateMessages: true });
    mockPrivateMessagesData().then((messages) => {
      set({ privateMessages: messages, loadingPrivateMessages: false });
      console.log(messages);
    });
  },
  getAllMessagesFromPrivateConversation: ({ from, to }) => {
    return get().privateMessages.find((message) => {
      return (
        (message.from == from && message.to == to) ||
        (message.from == to && message.to == from)
      );
    });
  },
  setNewPrivateMessage: ({ from, to, text }) => {
    mockAddPrivateMessage({ from, to, text }).then(() => {
      get().fetchAllPrivateMessages();
    });
  },
}));

export default useMessageStore;
