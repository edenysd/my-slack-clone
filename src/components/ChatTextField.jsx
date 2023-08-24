import { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";

const localTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const ChatTextField = ({ placeholder, submitMessage = () => {} }) => {
  const [message, setMessage] = useState(null);

  const handleSendMessage = () => {
    submitMessage(message);
    setMessage("");
  };

  const handleChangeMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <ThemeProvider theme={localTheme}>
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
            <IconButton onClick={handleSendMessage}>
              <Send />
            </IconButton>
          ),
        }}
      />
    </ThemeProvider>
  );
};

ChatTextField.propTypes = {
  placeholder: PropTypes.string,
  submitMessage: PropTypes.func,
};

export default ChatTextField;
