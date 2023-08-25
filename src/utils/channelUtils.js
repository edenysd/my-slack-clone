export const formatNewChannelName = (name) => {
  return name.trim().replace(/[^a-zA-Z0-9]/g, "-");
};
