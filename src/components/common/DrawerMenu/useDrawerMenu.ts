import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Home, Monitor, PlusSquare, Power, Settings } from 'lucide-react-native';

import { InventoryEntryType, ProductType, ScreenName } from '@/src/constants/enums';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { useSettingsStore } from '@/src/store/settingsStore';

import type { InventoryGroup } from '@/src/components/features/GroupDetail';
import type { PrimaryMenuScreen } from '@/src/store/settingsStore';

import { DRAWER_WIDTH } from './styles';

export interface MenuItem {
  key: string;
  label: string;
  Icon: typeof Home;
  badgeCount?: number;
}

export interface UseDrawerMenuProps {
  visible: boolean;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const useDrawerMenu = ({ visible, onNavigate, onLogout, onClose }: UseDrawerMenuProps) => {
  const { t } = useTranslation();
  const primaryMenuOrder = useSettingsStore((s) => s.primaryMenuOrder);
  const setPrimaryMenuOrder = useSettingsStore((s) => s.setPrimaryMenuOrder);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  // Reactively fetch groups to render as primary menu items
  const entries = useInventoryStore((s) => s.entries);
  const groups = useMemo(
    () => entries.filter((e): e is InventoryGroup => e.type === InventoryEntryType.GROUP),
    [entries],
  );

  const orderedPrimaryItems = useMemo(() => {
    const lookup: Record<string, MenuItem> = {
      [ScreenName.HOME]: { key: ScreenName.HOME, label: t('drawer.home'), Icon: Home },
    };

    // Add all groups to lookup with their item count as badge
    groups.forEach((g) => {
      lookup[g.id] = {
        key: g.id,
        label: g.name,
        Icon: g.product_type === ProductType.SMART_DEVICE ? Power : Monitor,
        badgeCount: g.items.length > 0 ? g.items.length : undefined,
      };
    });

    // Determine order: primaryMenuOrder matches -> append remaining groups not in order
    const ordered: MenuItem[] = primaryMenuOrder.map((key) => lookup[key]).filter(Boolean);
    const orderedKeys = new Set(ordered.map((item) => item.key));

    groups.forEach((g) => {
      if (!orderedKeys.has(g.id)) {
        ordered.push(lookup[g.id]);
      }
    });

    return ordered;
  }, [t, groups, primaryMenuOrder]);

  const [primaryItems, setPrimaryItems] = useState<MenuItem[]>(orderedPrimaryItems);
  const itemsRef = useRef(primaryItems);

  // Sync from store → local ONLY when menu opens
  useEffect(() => {
    if (visible) {
      setPrimaryItems(orderedPrimaryItems);
      itemsRef.current = orderedPrimaryItems;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const utilityItems: MenuItem[] = useMemo(
    () => [
      { key: ScreenName.ADD_DEVICES, label: t('drawer.addDevices'), Icon: PlusSquare },
      { key: ScreenName.SETTINGS, label: t('drawer.settings'), Icon: Settings },
    ],
    [t],
  );

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : DRAWER_WIDTH,
      useNativeDriver: true,
      friction: 10,
      tension: 50,
    }).start();
  }, [visible, slideAnim]);

  const persistOrder = useCallback(() => {
    const localOrder = itemsRef.current.map((i) => i.key as PrimaryMenuScreen);
    if (localOrder.join(',') !== primaryMenuOrder.join(',')) {
      setPrimaryMenuOrder(localOrder);
    }
  }, [primaryMenuOrder, setPrimaryMenuOrder]);

  const handleNavigate = useCallback(
    (screen: string) => {
      persistOrder();
      onNavigate(screen);
    },
    [persistOrder, onNavigate],
  );

  const handleClose = useCallback(() => {
    persistOrder();
    onClose();
  }, [persistOrder, onClose]);

  const handleLogout = useCallback(() => {
    persistOrder();
    onLogout();
  }, [persistOrder, onLogout]);

  const handleDragEnd = useCallback(({ data }: { data: MenuItem[] }) => {
    const oldKeys = itemsRef.current.map((i) => i.key).join(',');
    const newKeys = data.map((i) => i.key).join(',');
    if (oldKeys === newKeys) return;
    itemsRef.current = data;
    setPrimaryItems(data);
  }, []);

  return {
    primaryItems,
    utilityItems,
    slideAnim,
    handleNavigate,
    handleClose,
    handleLogout,
    handleDragEnd,
  };
};
