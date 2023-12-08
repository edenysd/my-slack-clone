import { create } from "zustand";
import {
  mockAddChannel,
  mockChannelsData,
  mockRemoveChannel,
} from "../api/channel";

const useChannelStore = create((set, get) => ({
  loadingChannelsData: false,
  channels: [],
  fetchAllChannels: () => {
    set({ loadingChannelsData: true });
    mockChannelsData().then((channelsData) => {
      set({ channels: channelsData, loadingChannelsData: false });
    });
  },
  createChannel: (channel) => {
    mockAddChannel(channel).then(() => get().fetchAllChannels());
  },
  getChannelById: (id) => {
    return get().channels.find((channel) => channel.id == id);
  },
  removeChannelById: (id) => {
    mockRemoveChannel(id).then(() => {
      get().fetchAllChannels();
    });
  },
}));

export default useChannelStore;
