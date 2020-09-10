import React, { createContext, useState } from 'react';
import { ChannelType } from './Constants'

const ConfigContext = createContext({
  state: { isSocketMode: Boolean, channelType: String },
  actions: {
    setIsSocketMode: () => {},
    setChannelType: () => {},
  }
});

const ConfigProvider = ({ children }) => {
  const [isSocketMode, setIsSocketMode] = useState(true);
  const [channelType, setChannelType] = useState(ChannelType.One);

  const value = {
    state: { isSocketMode, channelType },
    actions: { setIsSocketMode, setChannelType }
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

const { Consumer: ConfigConsumer } = ConfigContext;

export { ConfigProvider, ConfigConsumer };

export default ConfigContext;