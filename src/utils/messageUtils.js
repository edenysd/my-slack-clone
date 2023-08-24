export const sortMessagesByTimestamp = (messages) =>
  messages.sort((d1, d2) => d2.timestamp.unix() - d1.timestamp.unix());
