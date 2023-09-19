import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [arbitrum],
  [
    alchemyProvider({ apiKey: "jNURNeKZIAOXiHnmvE-qyQwYsGZV3gpy" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ClipsToken",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      coolMode
      theme={darkTheme({
        accentColor: "#7749E7",
        accentColorForeground: "white",
        borderRadius: "large",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <Router>
        <App />
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
);
