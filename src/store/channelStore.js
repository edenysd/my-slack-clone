import { create } from "zustand";
import { mockAddChannel, mockChannelsData } from "../api/channel";

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
}));

export default useChannelStore;
