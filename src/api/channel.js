import { formatNewChannelName } from "../utils/channelUtils";

const fakeChannelsData = [
  {
    id: 0,
    name: "work",
  },
  {
    id: 2,
    name: "funny",
  },
  {
    id: 3,
    name: "memes",
  },
  {
    id: 1,
    name: "frank-party",
  },
  {
    id: 4,
    name: "family",
  },
];

export const mockChannelsData = async () => [...fakeChannelsData];

export const mockAddChannel = async (name) => {
  const maxId = fakeChannelsData.reduce(
    (curMaxId, curChannel) => Math.max(curMaxId, curChannel.id),
    0
  );
  fakeChannelsData.push({ id: maxId + 1, name: formatNewChannelName(name) });
};

export const mockRemoveChannel = async (id) => {
  const messageIndex = fakeChannelsData.findIndex(
    (message) => message.id == id
  );

  fakeChannelsData.splice(messageIndex, 1);
};
