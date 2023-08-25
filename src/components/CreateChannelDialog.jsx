import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import useChannelStore from "../store/channelStore";

const CreateChannelDialog = ({ open, handleClose }) => {
  const channelStore = useChannelStore();

  const [error, setError] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const handleChangeChannelName = useCallback(
    (e) => {
      if (e.target.value.length > 20) return;

      setNewChannelName(e.target.value);
      if (e.target.value && error) setError(false);
    },
    [error]
  );

  const handleCreation = useCallback(() => {
    setError(!newChannelName);
    if (!newChannelName) return;

    channelStore.createChannel(newChannelName);
    handleClose();
  }, [newChannelName, channelStore, handleClose]);

  useEffect(() => {
    setError(false);
    setNewChannelName("");
  }, [open]);

  useEffect(() => {});

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new channel</DialogTitle>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleCreation();
        }}
        sx={{ mt: 3 }}
      >
        <Grid item xs={12} gap={2} p={1}>
          <TextField
            required
            value={newChannelName}
            onChange={handleChangeChannelName}
            fullWidth
            label="Channel Name"
            error={error}
            helperText={error ? "Required field" : ""}
          />
        </Grid>
      </Box>
      <div className="flex flex-row justify-center p-2">
        <IconButton onClick={handleCreation}>
          <Add />
        </IconButton>
      </div>
    </Dialog>
  );
};

CreateChannelDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CreateChannelDialog;
