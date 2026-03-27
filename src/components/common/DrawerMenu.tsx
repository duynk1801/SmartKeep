import { GripVertical, Home, LogOut, Monitor, PlusSquare, Power, Settings, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import DraggableFlatList, { ScaleDecorator, type RenderItemParams } from 'react-native-draggable-flatlist';

import { InventoryEntryType, ProductType, ScreenName } from '@/src/constants/enums';
import { SCREEN_WIDTH } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { BlurView } from 'expo-blur';

import type { InventoryGroup } from '@/src/components/features/GroupDetail';
import { useInventoryStore } from '@/src/store/inventoryStore';
import type { PrimaryMenuScreen } from '@/src/store/settingsStore';
import { useSettingsStore } from '@/src/store/settingsStore';

interface DrawerMenuProps {
  visible: boolean;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  Icon: typeof Home;
  badgeCount?: number;
}

const DRAWER_WIDTH = SCREEN_WIDTH * 0.78;

interface PrimaryDrawerItemProps {
  item: MenuItem;
  isSelected: boolean;
  isActive: boolean;
  styles: ReturnType<typeof createStyles>;
  primaryColor: string;
  textSecondary: string;
  textTertiary: string;
  textColor: string;
  onPress: (screen: string) => void;
  onDrag: () => void;
}

const PrimaryDrawerItem = React.memo(function PrimaryDrawerItem({
  item,
  isSelected,
  isActive,
  styles,
  primaryColor,
  textSecondary,
  textTertiary,
  textColor,
  onPress,
  onDrag,
}: PrimaryDrawerItemProps) {
  return (
    <ScaleDecorator>
      <View style={[styles.menuItem, isSelected && styles.menuItemActive, isActive && styles.draggingItem]}>
        <TouchableOpacity
          onPress={() => onPress(item.key)}
          disabled={isActive}
          activeOpacity={0.75}
          style={styles.menuItemPressArea}
        >
          <View style={styles.menuItemLeft}>
            <item.Icon size={18} strokeWidth={1.5} color={isSelected ? primaryColor : textSecondary} />
            <View style={styles.menuItemTextWrapper}>
              {item.badgeCount ? (
                <View style={[styles.badgeContainer, isSelected && styles.badgeContainerActive]}>
                  <Text style={[styles.badgeText, isSelected && styles.badgeTextActive]}>
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </Text>
                </View>
              ) : null}
              <Text
                style={[styles.menuItemText, isSelected && { color: textColor }]}
                numberOfLines={2}
              >
                {item.label}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onLongPress={onDrag}
          disabled={isActive}
          delayLongPress={120}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.6}
          style={styles.dragHandle}
        >
          <GripVertical size={16} strokeWidth={1.5} color={textTertiary} />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
});

function DrawerMenuComponent({ visible, currentScreen, onNavigate, onLogout, onClose }: DrawerMenuProps) {
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const primaryMenuOrder = useSettingsStore((s) => s.primaryMenuOrder);
  const setPrimaryMenuOrder = useSettingsStore((s) => s.setPrimaryMenuOrder);
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);
  const slideAnim = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const colorScheme = useColorScheme();

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

  React.useEffect(() => {
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

  const SeparatorComponent = useCallback(() => <View style={styles.itemSeparator} />, [styles.itemSeparator]);

  const renderPrimaryItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<MenuItem>) => {
      const isSelected = currentScreen === item.key;

      return (
        <PrimaryDrawerItem
          item={item}
          isSelected={isSelected}
          isActive={isActive}
          styles={styles}
          primaryColor={colors.primary}
          textSecondary={colors.textSecondary}
          textTertiary={colors.textTertiary}
          textColor={colors.text}
          onPress={handleNavigate}
          onDrag={drag}
        />
      );
    },
    [colors.primary, colors.text, colors.textSecondary, colors.textTertiary, currentScreen, handleNavigate, styles],
  );

  const renderUtilityItem = useCallback(
    (item: MenuItem) => {
      const isSelected = currentScreen === item.key;

      return (
        <TouchableOpacity
          key={item.key}
          style={[styles.menuItem, isSelected && styles.menuItemActive]}
          onPress={() => handleNavigate(item.key)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <item.Icon size={18} strokeWidth={1.5} color={isSelected ? colors.primary : colors.textSecondary} />
            <Text style={[styles.menuItemText, isSelected && styles.menuItemTextActive]}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [colors.primary, colors.textSecondary, currentScreen, handleNavigate, styles],
  );

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose} />

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <BlurView intensity={15} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.drawerBackground }]} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('common.menu')}</Text>
          <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.topSection}>
          <Text style={styles.sectionHint}>{t('common.holdToReorder')}</Text>
          <DraggableFlatList
            data={primaryItems}
            keyExtractor={(item) => item.key}
            renderItem={renderPrimaryItem}
            onDragEnd={({ data }) => {
              const oldKeys = itemsRef.current.map((i) => i.key).join(',');
              const newKeys = data.map((i) => i.key).join(',');
              if (oldKeys === newKeys) return;
              itemsRef.current = data;
              requestAnimationFrame(() => {
                setPrimaryItems(data);
              });
            }}
            activationDistance={20}
            autoscrollThreshold={24}
            autoscrollSpeed={80}
            animationConfig={{
              damping: 20,
              mass: 0.2,
              stiffness: 220,
              overshootClamping: true,
            }}
            containerStyle={styles.dragList}
            contentContainerStyle={styles.dragContent}
            ItemSeparatorComponent={SeparatorComponent}
            dragItemOverflow={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={currentScreen}
          />
        </View>

        <View style={styles.bottomSection}>
          {utilityItems.map(renderUtilityItem)}

          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7} style={styles.logoutButton}>
            <LogOut size={18} strokeWidth={1.5} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>{t('common.logOut')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

export const DrawerMenu = React.memo(DrawerMenuComponent);

const createStyles = (
  colors: ReturnType<typeof useAppTheme>['colors'],
  theme: ReturnType<typeof useAppTheme>['theme'],
) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    drawer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: DRAWER_WIDTH,
      paddingHorizontal: 0,
      paddingTop: theme.spacing.xxl + theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: colors.border,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    headerTitle: {
      ...theme.typography.h2,
      paddingHorizontal: 4,
    },
    topSection: {
      flex: 1,
      minHeight: 0,
    },
    sectionHint: {
      ...theme.typography.caption,
      color: colors.textTertiary,
      paddingHorizontal: theme.spacing.lg + 4,
      marginBottom: theme.spacing.md,
    },
    dragList: {
      flex: 1,
    },
    dragContent: {
      paddingBottom: theme.spacing.md,
    },
    itemSeparator: {
      height: 2,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
    },
    menuItemPressArea: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    menuItemTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexShrink: 1,
    },
    dragHandle: {
      marginLeft: theme.spacing.sm,
      paddingLeft: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    menuItemActive: {
      backgroundColor: colors.primaryGlow,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      borderRadius: 0,
      paddingLeft: 17, // offset left border width
    },
    draggingItem: {
      backgroundColor: colors.drawerItem,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
      elevation: 6,
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.5,
      color: colors.textSecondary,
      flexShrink: 1,
    },
    menuItemTextActive: {
      color: colors.primary,
    },
    bottomSection: {
      marginTop: theme.spacing.md,
      paddingTop: theme.spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 8,
    },
    logoutText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.error,
    },
    badgeContainer: {
      minWidth: 18,
      height: 16,
      paddingHorizontal: 4,
      borderRadius: 8,
      backgroundColor: colors.drawerItem,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeContainerActive: {
      backgroundColor: colors.primaryGlowStrong,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    badgeTextActive: {
      color: colors.primary,
    },
  });
