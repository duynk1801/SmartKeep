import React, { useCallback, useMemo } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import DraggableFlatList, { ScaleDecorator, type RenderItemParams } from 'react-native-draggable-flatlist';
import { BlurView } from 'expo-blur';
import { GripVertical, LogOut, X } from 'lucide-react-native';

import { useAppTheme } from '@/src/hooks/useAppTheme';
import { useTranslation } from '@/src/hooks/useTranslation';

import { createStyles } from './styles';
import { useDrawerMenu, type MenuItem, type UseDrawerMenuProps } from './useDrawerMenu';

export interface DrawerMenuProps extends UseDrawerMenuProps {}

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
              <Text style={[styles.menuItemText, isSelected && { color: textColor }]} numberOfLines={2}>
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

function DrawerMenuComponent(props: DrawerMenuProps) {
  const { visible, currentScreen } = props;
  const { colors, theme } = useAppTheme();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  
  const styles = useMemo(() => createStyles(colors, theme), [colors, theme]);

  const {
    primaryItems,
    utilityItems,
    slideAnim,
    handleNavigate,
    handleClose,
    handleLogout,
    handleDragEnd,
  } = useDrawerMenu(props);

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

  const keyExtractor = useCallback((item: MenuItem, index: number) => `${item.key}-${index}`, []);

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
            keyExtractor={keyExtractor}
            renderItem={renderPrimaryItem}
            onDragEnd={handleDragEnd}
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
