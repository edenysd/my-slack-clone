import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Add,
  ExpandLess,
  ExpandMore,
  Home,
  KeyboardReturn,
  Menu,
  Remove,
} from "@mui/icons-material";

import CreateChannelDialog from "../components/CreateChannelDialog";
import useChannelStore from "../store/channelStore";
import useUserStore from "../store/userStore";
import { getFullName } from "../utils/userUtils";

const drawerWidth = 280;

const AdministrationListElements = () => {
  return (
    <>
      <Link to={"/app"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ mr: 1, minWidth: "24px" }}>
              <Home sx={{ color: "#a0a4ff" }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} sx={{ color: "#a0a4ff" }} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ mr: 1, minWidth: "24px" }}>
              <KeyboardReturn color="error" />
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              sx={{ "&": { color: "#f44336" } }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
};

const DrawerContent = () => {
  const [openChannel, setOpenChannel] = useState(true);
  const [openPrivates, setOpenPrivates] = useState(true);
  const [openCreateChannelDialog, setOpenCreateChannelDialog] = useState(false);

  const channelStore = useChannelStore();
  const fetchAllChannels = useChannelStore((state) => state.fetchAllChannels);
  const userStore = useUserStore();
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);

  const params = useParams();

  const handleClickChannels = useCallback(() => {
    setOpenChannel(!openChannel);
  }, [openChannel]);

  const handleClickPrivates = useCallback(() => {
    setOpenPrivates(!openPrivates);
  }, [openPrivates]);

  const handleOpenAddChannelDialog = useCallback((e) => {
    setOpenCreateChannelDialog(true);
    e.stopPropagation();
  }, []);

  useEffect(() => {
    fetchAllChannels();
    fetchAllUsers();
  }, [fetchAllChannels, fetchAllUsers]);

  return (
    <div className="overflow-y-auto overflow-x-hidden">
      <Toolbar
        className="flex justify-between"
        sx={{ "&": { paddingLeft: "20px", paddingRight: "16px" } }}
      >
        <h1 className="text-2xl">Slack Clone</h1>
      </Toolbar>

      <Divider />

      <ListItemButton onClick={handleClickChannels}>
        <ListItemIcon sx={{ mr: 1, minWidth: "24px" }}>
          {openChannel ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText primary="Channels" />
        <IconButton
          onClick={handleOpenAddChannelDialog}
          sx={{ height: "30px", width: "30px" }}
        >
          <Add />
        </IconButton>
      </ListItemButton>
      <Collapse in={openChannel} timeout="auto" unmountOnExit>
        <List disablePadding>
          {!channelStore.loadingChannelsData
            ? channelStore.channels.map((channel) => (
                <Link key={channel.id} to={`/app/channel/${channel.id}`}>
                  <ListItem className="group" disablePadding>
                    <ListItemButton
                      selected={params.channelId == channel.id}
                      sx={{ pl: 3, height: "36px" }}
                    >
                      <ListItemIcon
                        className="text-xl justify-center"
                        sx={{ mr: 1, minWidth: "24px" }}
                      >
                        #
                      </ListItemIcon>
                      <ListItemText
                        primary={channel.name}
                        sx={{ color: "#FFF" }}
                      />
                      <IconButton
                        className="opacity-0 group-hover:opacity-100"
                        sx={{ width: "30px", height: "30px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          channelStore.removeChannelById(channel.id);
                        }}
                      >
                        <Remove />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))
            : null}
        </List>
      </Collapse>

      <Divider />

      <ListItemButton onClick={handleClickPrivates}>
        <ListItemIcon sx={{ mr: 1, minWidth: "24px" }}>
          {openPrivates ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText primary="Direct messages" />
      </ListItemButton>
      <Collapse in={openPrivates} timeout="auto" unmountOnExit>
        <List disablePadding>
          {!userStore.loadingUsersData
            ? userStore.users.map((user) => (
                <Link key={user.id} to={`/app/private/${user.id}`}>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{ pl: 3, height: "36px" }}
                      selected={params.userId == user.id}
                    >
                      <Avatar
                        sx={{ mr: 1, maxWidth: "24px", maxHeight: "24px" }}
                        src={user.avatar}
                        variant="rounded"
                      />
                      <ListItemText
                        sx={{ color: "#FFF" }}
                        primary={getFullName(user)}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))
            : null}
        </List>
      </Collapse>

      <Divider />

      <AdministrationListElements />

      <CreateChannelDialog
        open={openCreateChannelDialog}
        handleClose={() => setOpenCreateChannelDialog(false)}
      />
    </div>
  );
};

const ChatLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box className="h-screen" sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block" },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            Slack Clone
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#541554",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#541554",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
      {children}
    </Box>
  );
};

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatLayout;
