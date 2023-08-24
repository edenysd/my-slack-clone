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
    timestamp: moment("2023-08-24T22:04:09.396Z"),
  },
  {
    id: 1,
    from: 0,
    to: 1,
    text: "I'm sorry very much",
    timestamp: moment("2023-08-24T23:04:47.220Z"),
  },
  {
    id: 2,
    from: 1,
    to: 0,
    text: "Ohhh, I feel bad because my dog died 😭.",
    timestamp: moment("2023-08-24T23:04:09.396Z"),
  },
  {
    id: 3,
    from: 0,
    to: 1,
    text: "Hello. How are you doing?",
    timestamp: moment("2023-08-24T23:02:28.608Z"),
  },
  {
    id: 4,
    from: 2,
    to: 0,
    text: "Hello",
    timestamp: moment("2023-08-24T22:04:09.396Z"),
  },
  {
    id: 5,
    from: 0,
    to: 2,
    text: "How are you?",
    timestamp: moment("2023-08-24T23:02:28.608Z"),
  },
  {
    id: 6,
    from: 2,
    to: 0,
    text: "I'm Rodolfo, from the party 🥳🥳🥳🥳",
    timestamp: moment("2023-08-24T23:04:09.396Z"),
  },
  {
    id: 7,
    from: 0,
    to: 2,
    text: "I don't remember any party",
    timestamp: moment("2023-08-24T23:04:47.220Z"),
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
export const mockRemovePrivateMessage = async (id) => {
  const messageIndex = fakePrivateMessagesData.findIndex(
    (message) => message.id == id
  );

  fakePrivateMessagesData.splice(messageIndex, 1);
};

export const mockEditPrivateMessage = async (id, newText) => {
  const message = fakePrivateMessagesData.find((message) => message.id == id);
  message.text = newText;
};
