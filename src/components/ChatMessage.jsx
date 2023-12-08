import PropTypes from "prop-types";
import { Avatar, Box, IconButton } from "@mui/material";
import { getFullName } from "../utils/userUtils";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import ChatEditMessage from "./ChatEditMessage";

const ChatMessage = ({
  user,
  timestamp,
  text,
  removable,
  editable,
  onEdit,
  onRemove,
  className,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  return !isEditMode ? (
    <Box
      className={"flex group items-start w-full hover:bg-gray-200 " + className}
    >
      <Avatar
        className="mt-2"
        variant="rounded"
        src={user.avatar}
        sx={{ width: "54px", height: "54px" }}
      />
      <div
        className="flex flex-col ml-3 w-full overflow-auto"
        style={{ minHeight: "90px" }}
      >
        <div className="flex items-center justify-between">
          <span>
            <span className="font-bold text-base mr-2">
              {getFullName(user)}
            </span>
            <span className="text-gray-500 text-sm">
              {timestamp.calendar()}
            </span>
          </span>
          <span
            className="group-hover:opacity-100 opacity-0 transition-all"
            style={{ minHeight: "32px" }}
          >
            {editable ? (
              <IconButton
                sx={{ width: "32px", height: "32px" }}
                onClick={() => setEditMode(true)}
              >
                <Edit color="primary" sx={{ width: "24px", height: "24px" }} />
              </IconButton>
            ) : null}
            {removable ? (
              <IconButton
                sx={{ width: "32px", height: "32px" }}
                onClick={onRemove}
              >
                <Delete color="error" sx={{ width: "24px", height: "24px" }} />
              </IconButton>
            ) : null}
          </span>
        </div>
        <div className="pr-2">
          <p className="text-gray-700 whitespace-break-spaces break-words">
            {text}
          </p>
        </div>
      </div>
    </Box>
  ) : (
    <ChatEditMessage
      messageToEdit={text}
      onCancelEdition={() => setEditMode(false)}
      onEditMessage={onEdit}
    />
  );
};

ChatMessage.propTypes = {
  user: PropTypes.object,
  timestamp: PropTypes.object,
  text: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  removable: PropTypes.bool,
  editable: PropTypes.bool,
  className: PropTypes.string,
};

export default ChatMessage;
