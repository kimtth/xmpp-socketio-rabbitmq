import React, { createContext, useState } from 'react';
import { ChannelType } from './Constants'

const ConfigContext = createContext({
  state: { isSocketMode: Boolean, isXMPP: Boolean },
  actions: {
    setIsSocketMode: () => {},
    setIsXMPP: () => {},
  }
});

const ConfigProvider = ({ children }) => {
  const [isSocketMode, setIsSocketMode] = useState(true);
  const [isXMPP, setIsXMPP] = useState(false);

  const value = {
    state: { isSocketMode, isXMPP },
    actions: { setIsSocketMode, setIsXMPP}
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

const { Consumer: ConfigConsumer } = ConfigContext;

export { ConfigProvider, ConfigConsumer };

export default ConfigContext;