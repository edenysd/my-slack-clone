import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ChatTextField = ({ placeholder, submitMessage = () => {} }) => {
  const [message, setMessage] = useState("");
  const location = useLocation();

  const handleSendMessage = () => {
    submitMessage(message);
    setMessage("");
  };

  const handleChangeMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  useEffect(() => {
    setMessage("");
  }, [location.pathname]);

  return (
    <TextField
      multiline
      value={message}
      onChange={handleChangeMessage}
      fullWidth
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key == "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSendMessage} color="success">
            <Send />
          </IconButton>
        ),
      }}
    />
  );
};

ChatTextField.propTypes = {
  placeholder: PropTypes.string,
  submitMessage: PropTypes.func,
};

export default ChatTextField;
