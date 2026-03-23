import { useState, useCallback, useEffect } from 'react';
import * as Network from 'expo-network';

import type { WiFiNetwork } from '@/src/types';

/**
 * useWiFi — Network state and WiFi information.
 *
 * Uses expo-network to retrieve current connection details.
 */
export function useWiFi() {
  const [currentNetwork, setCurrentNetwork] = useState<WiFiNetwork | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshNetworkState = useCallback(async () => {
    setIsLoading(true);
    try {
      const networkState = await Network.getNetworkStateAsync();
      const ip = await Network.getIpAddressAsync();

      setIsConnected(networkState.isConnected ?? false);
      setIpAddress(ip);

      if (networkState.type === Network.NetworkStateType.WIFI) {
        setCurrentNetwork({
          ssid: 'Connected WiFi', // expo-network doesn't expose SSID directly
          bssid: '',
          signalStrength: 0,
          isSecured: true,
        });
      } else {
        setCurrentNetwork(null);
      }
    } catch {
      setIsConnected(false);
      setCurrentNetwork(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNetworkState();
  }, [refreshNetworkState]);

  return {
    currentNetwork,
    ipAddress,
    isConnected,
    isLoading,
    refreshNetworkState,
  } as const;
}
