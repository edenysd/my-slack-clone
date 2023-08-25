import moment from "moment";

const fakeChannelMessagesData = [
  {
    id: 0,
    from: 1,
    to: 1,
    text: "Good morning!!!",
    timestamp: moment("2023-08-24T22:04:09.396Z"),
  },
  {
    id: 1,
    from: 0,
    to: 1,
    text: "I can't go too, sorry",
    timestamp: moment("2023-08-24T23:04:47.220Z"),
  },
  {
    id: 2,
    from: 1,
    to: 1,
    text: "Ohhh, I feel bad because my dog died 😭. I can't go",
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
    to: 1,
    text: "Hello",
    timestamp: moment("2023-08-24T22:04:09.396Z"),
  },
  {
    id: 5,
    from: 2,
    to: 2,
    text: "Do you want to party? 🥳🥳🥳🥳",
    timestamp: moment("2023-08-24T23:04:09.396Z"),
  },
  {
    id: 6,
    from: 4,
    to: 2,
    text: "Ugghh",
    timestamp: moment("2023-08-24T23:04:19.396Z"),
  },
  {
    id: 7,
    from: 2,
    to: 2,
    text: "PLEASE 🥺🥺🥺🥺🥺🥺🥺🥺!!",
    timestamp: moment("2023-08-24T23:04:29.396Z"),
  },
  {
    id: 8,
    from: 3,
    to: 0,
    text: "Hello team, I need all your reports soon.",
    timestamp: moment("2023-08-24T23:04:29.396Z"),
  },
  {
    id: 9,
    from: 1,
    to: 0,
    text: "✅ Its ready",
    timestamp: moment("2023-08-24T23:05:01.396Z"),
  },
  {
    id: 10,
    from: 2,
    to: 0,
    text: "✅",
    timestamp: moment("2023-08-24T23:05:02.396Z"),
  },
  {
    id: 11,
    from: 4,
    to: 0,
    text: "✅",
    timestamp: moment("2023-08-24T23:05:03.396Z"),
  },
  {
    id: 12,
    from: 5,
    to: 0,
    text: "✅ Perfect",
    timestamp: moment("2023-08-24T23:05:04.396Z"),
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
