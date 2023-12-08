import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, TextField } from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const ChatEditMessage = ({
  messageToEdit,
  onEditMessage = () => {},
  onCancelEdition = () => {},
}) => {
  const [message, setMessage] = useState(messageToEdit);

  const handleSendMessage = () => {
    onEditMessage(message);
    onCancelEdition();
    setMessage("");
  };

  const handleChangeMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <TextField
      sx={{ marginBottom: "20px" }}
      multiline
      value={message}
      onChange={handleChangeMessage}
      fullWidth
      onKeyDown={(e) => {
        if (e.key == "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      InputProps={{
        endAdornment: (
          <>
            <IconButton onClick={handleSendMessage} color="success">
              <Send />
            </IconButton>
            <IconButton onClick={onCancelEdition} color="error">
              <Close />
            </IconButton>
          </>
        ),
      }}
    />
  );
};

ChatEditMessage.propTypes = {
  messageToEdit: PropTypes.string,
  onEditMessage: PropTypes.func,
  onCancelEdition: PropTypes.func,
};

export default ChatEditMessage;
