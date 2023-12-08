import moment from "moment";
import { formatNewChannelName } from "./channelUtils";

test("Check channel name @ transform to -", () => {
  expect(formatNewChannelName("a@aaaaaaaaaaa")).toBe("a-aaaaaaaaaaa");
});

test("Check channel name spaces transform to -", () => {
  expect(formatNewChannelName("12312312 12312   123")).toBe(
    "12312312-12312---123"
  );
});

test("Check channel name trim", () => {
  expect(formatNewChannelName(" hiii         ")).toBe("hiii");
});

import { sortMessagesByTimestamp } from "./messageUtils";

test("Messages sorted by year", () => {
  const messages = [
    {
      id: 0,
      from: 1,
      to: 1,
      text: "Good morning!!!",
      timestamp: moment("2023-08-24T22:04:09.396Z"),
    },
    {
      id: 1,
      from: 1,
      to: 1,
      text: "Good morning!!!",
      timestamp: moment("2025-08-24T22:04:09.396Z"),
    },
  ];

  const orderedIds = sortMessagesByTimestamp(messages).map(
    (message) => message.id
  );

  expect(orderedIds).toStrictEqual([1, 0]);
});

import { getFullName } from "./userUtils";

test("User full name never goes out of 20 chars", () => {
  const testUser1 = {
    firstName: "Caaaaaaarloooooooooossss",
    lastName: "Rodriguez",
  };

  expect(getFullName(testUser1).length).toBeLessThanOrEqual(20);

  const testUser2 = {
    firstName: "Caoooossss",
    lastName: "Caaaaaaarloooooooooossss",
  };
  expect(getFullName(testUser2).length).toBeLessThanOrEqual(20);
});
