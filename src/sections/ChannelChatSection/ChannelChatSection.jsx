import useUserStore from "../../store/userStore";
import ChatTextField from "../../components/ChatTextField";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WavingHand } from "@mui/icons-material";
import ChatMessage from "../../components/ChatMessage";
import useChannelStore from "../../store/channelStore";
import useChannelMessageStore from "../../store/channelMessageStore";
import { IconButton } from "@mui/material";

const ChannelChatSection = () => {
  const getChannelById = useChannelStore((state) => state.getChannelById);
  const getUserById = useUserStore((state) => state.getUserById);
  const channelMessageStore = useChannelMessageStore();
  const channelMessages = useChannelMessageStore(
    (state) => state.channelMessages
  );

  const [targetChannel, setTargetChannelUser] = useState({});
  const currentUser = useUserStore((state) => state.currentUser);
  const [currentChannelMessages, setCurrentChannelMessages] = useState([]);

  const params = useParams();

  const sendMessage = useCallback(
    (text) => {
      channelMessageStore.sendNewChannelMessage({
        from: currentUser.id,
        to: targetChannel.id,
        text,
      });
    },
    [currentUser.id, channelMessageStore, targetChannel.id]
  );

  const sendHiMessage = useCallback(() => {
    sendMessage("👋");
  }, [sendMessage]);

  useEffect(() => {
    setTargetChannelUser(getChannelById(params.channelId));
  }, [params, getChannelById]);

  useEffect(() => {
    const getData = async () => {
      await channelMessageStore.fetchAllChannelMessages();
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, targetChannel.id]);

  useEffect(() => {
    setCurrentChannelMessages(
      channelMessageStore.filterAllMessagesFromChannelConversation({
        to: targetChannel.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelMessages, currentUser.id, targetChannel.id]);

  return (
    <main className="flex flex-col-reverse text-black w-full overflow-auto min-h-full bg-white py-16 sm:py-16">
      <div className=" px-6 lg:px-8 ">
        <ChatTextField
          className="px-6 lg:px-8"
          placeholder={`Send a message to ${targetChannel?.username}`}
          submitMessage={sendMessage}
        />
      </div>
      <div className="overflow-y-auto h-full flex flex-col-reverse pt-3">
        {currentChannelMessages.length ? (
          currentChannelMessages.map((message) => (
            <ChatMessage
              className={"px-6 lg:px-8"}
              key={message.id}
              user={getUserById(message.from)}
              timestamp={message.timestamp}
              text={message.text}
              removable={message.from == currentUser.id}
              editable={message.from == currentUser.id}
              onRemove={() =>
                channelMessageStore.removeChannelMessage(message.id)
              }
              onEdit={(newMessage) =>
                channelMessageStore.editChannelMessage(message.id, newMessage)
              }
            />
          ))
        ) : (
          <div className="h-full w-full justify-center flex flex-col items-center">
            <div className="font-semibold text-3xl flex flex-col text-black items-center whitespace-normal">
              <span className="mb-4">
                Say Hi to <span className="text-fuchsia-800">all</span> in
              </span>
              <div className="flex flex-col text-fuchsia-800 items-center mb-4">
                #{targetChannel.name}
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

export default ChannelChatSection;
