import { create } from "zustand";
import {
  mockAddChannelMessage,
  mockEditChannelMessage,
  mockChannelMessagesData,
  mockRemoveChannelMessage,
} from "../api/channelMessage";
import { sortMessagesByTimestamp } from "../utils/messageUtils";

const useMessageStore = create((set, get) => ({
  loadingChannelMessages: false,
  channelMessages: [],
  fetchAllchannelMessages: async () => {
    set({ loadingChannelMessages: true });
    const messages = await mockChannelMessagesData();
    set({ channelMessages: messages, loadingChannelMessages: false });
  },
  filterAllMessagesChannelConversation: ({ to }) => {
    const filteredMessages = get().channelMessages.filter((message) => {
      return message.to == to;
    });
    return sortMessagesByTimestamp(filteredMessages);
  },
  sendNewChannelMessage: ({ from, to, text }) => {
    mockAddChannelMessage({ from, to, text }).then(() => {
      get().fetchAllchannelMessages();
    });
  },
  removeChannelMessage: (id) => {
    mockRemoveChannelMessage(id).then(() => {
      get().fetchAllchannelMessages();
    });
  },
  editChannelMessage: (id, newText) => {
    mockEditChannelMessage(id, newText).then(() => {
      get().fetchAllchannelMessages();
    });
  },
}));

export default useMessageStore;
