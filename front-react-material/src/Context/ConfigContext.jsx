import React, { createContext, useState } from 'react';
import { MessageMode, ChannelType } from './Constants';

const ConfigContext = createContext({
  state: { messageMode: String, channelType: String },
  actions: {
    setMessageMode: () => {},
    setChannelType: () => {},
  }
});

const ConfigProvider = ({ children }) => {
  const [messageMode, setMessageMode] = useState(MessageMode.SocketHost);
  const [channelType, setChannelType] = useState(ChannelType.One);

  const value = {
    state: { messageMode, channelType },
    actions: { setMessageMode, setChannelType }
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

const { Consumer: ConfigConsumer } = ConfigContext;

export { ConfigProvider, ConfigConsumer };

export default ConfigContext;