import useUserStore from "../../store/userStore";
import ChatTextField from "../../components/ChatTextField";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePrivateMessageStore from "../../store/privateMessageStore";
import { Avatar, IconButton } from "@mui/material";
import { WavingHand } from "@mui/icons-material";
import ChatMessage from "../../components/ChatMessage";

const UserChatSection = () => {
  const getUserById = useUserStore((state) => state.getUserById);
  const privateMessageStore = usePrivateMessageStore();
  const privateMessages = usePrivateMessageStore(
    (state) => state.privateMessages
  );

  const [targetUser, setTargetUser] = useState({});
  const currentUser = useUserStore((state) => state.currentUser);
  const [currentPrivateMessages, setCurrentPrivateMessages] = useState([]);

  const params = useParams();

  const sendMessage = useCallback(
    (text) => {
      privateMessageStore.sendNewPrivateMessage({
        from: currentUser.id,
        to: targetUser.id,
        text,
      });
    },
    [currentUser.id, privateMessageStore, targetUser.id]
  );

  const sendHiMessage = useCallback(() => {
    sendMessage("👋");
  }, [sendMessage]);

  useEffect(() => {
    setTargetUser(getUserById(params.userId));
  }, [params, getUserById]);

  useEffect(() => {
    const getData = async () => {
      await privateMessageStore.fetchAllPrivateMessages();
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, targetUser.id]);

  useEffect(() => {
    setCurrentPrivateMessages(
      privateMessageStore.filterAllMessagesFromPrivateConversation({
        from: currentUser.id,
        to: targetUser.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateMessages, currentUser.id, targetUser.id]);

  return (
    <main className="flex flex-col-reverse text-black w-full min-h-full bg-white py-16 sm:py-16">
      <div className=" px-6 lg:px-8 ">
        <ChatTextField
          className="px-6 lg:px-8"
          placeholder={`Send a message to ${targetUser?.username}`}
          submitMessage={sendMessage}
        />
      </div>
      <div className="overflow-auto h-full px-6 lg:px-8 flex flex-col-reverse pt-3">
        {currentPrivateMessages.length ? (
          currentPrivateMessages.map((message) => (
            <ChatMessage
              key={message.id}
              user={getUserById(message.from)}
              timestamp={message.timestamp}
              text={message.text}
              removable={message.from == currentUser.id}
              editable={message.from == currentUser.id}
              onRemove={() =>
                privateMessageStore.removePrivateMessage(message.id)
              }
              onEdit={(newMessage) =>
                privateMessageStore.editPrivateMessage(message.id, newMessage)
              }
            />
          ))
        ) : (
          <div className="h-full w-full justify-center flex flex-col items-center">
            <div className="font-semibold text-3xl flex flex-col text-black items-center whitespace-normal">
              <span className="mb-4">Say Hi to </span>
              <div className="flex flex-col items-center mb-4">
                <Avatar
                  variant="rounded"
                  src={targetUser.avatar}
                  sx={{ width: "64px", height: "64px" }}
                />
                <span className="text-fuchsia-800 text-2xl">
                  {targetUser.username}
                </span>
              </div>
              <span>
                <IconButton
                  color="success"
                  sx={{ width: "46px", height: "46px" }}
                  onClick={sendHiMessage}
                >
                  <WavingHand sx={{ width: "36px", height: "36px" }} />
                </IconButton>
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserChatSection;
