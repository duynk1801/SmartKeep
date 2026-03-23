/**
 * WakeOnLanService
 *
 * Sends Wake-on-LAN magic packets to wake devices over the local network.
 * This is a JS implementation; can be replaced with an Expo Module (native) for reliability.
 */

interface WakeOnLanOptions {
  macAddress: string;
  broadcastAddress?: string;
  port?: number;
}

interface WakeOnLanResult {
  success: boolean;
  macAddress: string;
  timestamp: number;
  error?: string;
}

/**
 * Constructs a WOL magic packet from a MAC address.
 * Format: 6 bytes of 0xFF followed by 16 repetitions of the target MAC.
 */
function buildMagicPacket(macAddress: string): Uint8Array {
  const macBytes = macAddress
    .replace(/[:\-]/g, '')
    .match(/.{2}/g)
    ?.map((hex) => parseInt(hex, 16));

  if (!macBytes || macBytes.length !== 6) {
    throw new Error(`Invalid MAC address: ${macAddress}`);
  }

  const packet = new Uint8Array(102);
  // First 6 bytes: 0xFF
  for (let i = 0; i < 6; i++) {
    packet[i] = 0xff;
  }
  // Repeat MAC 16 times
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 6; j++) {
      packet[6 + i * 6 + j] = macBytes[j];
    }
  }

  return packet;
}

export const WakeOnLanService = {
  /**
   * Sends a Wake-on-LAN magic packet.
   *
   * NOTE: Actual UDP broadcast requires a native module.
   * This builds the packet; sending should be delegated to an Expo Module.
   */
  async wake(options: WakeOnLanOptions): Promise<WakeOnLanResult> {
    const { macAddress } = options;
    const timestamp = Date.now();

    try {
      const _packet = buildMagicPacket(macAddress);

      // TODO: Implement native UDP broadcast via Expo Module
      // For now, this is a placeholder that validates the MAC and builds the packet.
      console.log(`[WOL] Magic packet built for ${macAddress} (${_packet.length} bytes)`);

      return { success: true, macAddress, timestamp };
    } catch (err) {
      return {
        success: false,
        macAddress,
        timestamp,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  },

  validateMacAddress(macAddress: string): boolean {
    return /^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$/.test(macAddress);
  },
} as const;
