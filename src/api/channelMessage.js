import moment from "moment";

const fakeChannelMessagesData = [
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

export const mockChannelMessagesData = async () => [...fakeChannelMessagesData];

export const mockAddChannelMessage = async ({ from, to, text }) => {
  const maxId = fakeChannelMessagesData.reduce(
    (curMaxId, curChannel) => Math.max(curMaxId, curChannel.id),
    0
  );
  fakeChannelMessagesData.push({
    id: maxId + 1,
    from,
    to,
    text,
    timestamp: moment(),
  });
};
export const mockRemoveChannelMessage = async (id) => {
  const messageIndex = fakeChannelMessagesData.findIndex(
    (message) => message.id == id
  );

  fakeChannelMessagesData.splice(messageIndex, 1);
};

export const mockEditChannelMessage = async (id, newText) => {
  const message = fakeChannelMessagesData.find((message) => message.id == id);
  message.text = newText;
};
