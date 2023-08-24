import moment from "moment";

const fakeChannelsMessagesData = [
  {
    id: 0,
    from: 1,
    to: 2,
    text: "Hiii!!! Good morning all!!!",
    timestamp: moment().subtract(6, "days"),
  },
  {
    id: 0,
    from: 1,
    to: 2,
    text: "Hi friends!",
    timestamp: moment().subtract(6, "days"),
  },
  {
    id: 0,
    from: 1,
    to: 2,
    text: "Hiii!!! Good morning all!!!",
    timestamp: moment().subtract(6, "days"),
  },
  {
    id: 0,
    from: 1,
    to: 2,
    text: "Hiii!!! Good morning all!!!",
    timestamp: moment().subtract(6, "days"),
  },
  {
    id: 0,
    from: 1,
    to: 2,
    text: "Hiii!!! Good morning all!!!",
    timestamp: moment().subtract(6, "days"),
  },
];

export const mockChannelsMessagesData = async () => [
  ...fakeChannelsMessagesData,
];

export const mockAddChannelMessage = async ({ from, to, text, timestamp }) => {
  const maxId = fakeChannelsMessagesData.reduce(
    (curMaxId, curChannel) => Math.max(curMaxId, curChannel.id),
    0
  );
  fakeChannelsMessagesData.push({ id: maxId + 1, from, to, text, timestamp });
};

const fakePrivateMessagesData = [
  {
    id: 0,
    from: 1,
    to: 0,
    text: "Hiii!!! Good morning my friend!!!",
    timestamp: moment().subtract(6, "days"),
  },
];

export const mockPrivateMessagesData = async () => [...fakePrivateMessagesData];

export const mockAddPrivateMessage = async ({ from, to, text }) => {
  const maxId = fakePrivateMessagesData.reduce(
    (curMaxId, curChannel) => Math.max(curMaxId, curChannel.id),
    0
  );
  fakePrivateMessagesData.push({
    id: maxId + 1,
    from,
    to,
    text,
    timestamp: moment(),
  });
};
