import { create } from "zustand";
import {
  mockAddChannelMessage,
  mockEditChannelMessage,
  mockChannelMessagesData,
  mockRemoveChannelMessage,
} from "../api/channelMessage";
import { sortMessagesByTimestamp } from "../utils/messageUtils";

const useChannelMessageStore = create((set, get) => ({
  loadingChannelMessages: false,
  channelMessages: [],
  fetchAllChannelMessages: async () => {
    set({ loadingChannelMessages: true });
    const messages = await mockChannelMessagesData();
    set({ channelMessages: messages, loadingChannelMessages: false });
  },
  filterAllMessagesFromChannelConversation: ({ to }) => {
    const filteredMessages = get().channelMessages.filter((message) => {
      return message.to == to;
    });
    return sortMessagesByTimestamp(filteredMessages);
  },
  sendNewChannelMessage: ({ from, to, text }) => {
    if (text)
      mockAddChannelMessage({ from, to, text }).then(() => {
        get().fetchAllChannelMessages();
      });
  },
  removeChannelMessage: (id) => {
    mockRemoveChannelMessage(id).then(() => {
      get().fetchAllChannelMessages();
    });
  },
  editChannelMessage: (id, newText) => {
    if (newText)
      mockEditChannelMessage(id, newText).then(() => {
        get().fetchAllChannelMessages();
      });
  },
}));

export default useChannelMessageStore;
