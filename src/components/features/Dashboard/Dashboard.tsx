import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { StatCard, Toggle, SectionHeader, GlassCard, Button } from '@/src/components/common';
import { useDashboard } from './useDashboard';
import { styles } from './Dashboard.styles';

import type { RoomData, StatData } from './types';

/**
 * Dashboard — Main home screen.
 *
 * Sections:
 * 1. Header (greeting + avatar)
 * 2. Stats row (temperature + humidity)
 * 3. Master switch bar
 * 4. Room selector (horizontal chips)
 * 5. Room cards (2-column grid)
 */
function DashboardComponent() {
  const {
    rooms,
    stats,
    masterSwitch,
    activeDeviceCount,
    selectedRoomIndex,
    handleMasterToggle,
    handleRoomPress,
    handleSelectRoom,
  } = useDashboard();

  const renderRoomChip = useCallback(
    ({ item, index }: { item: RoomData; index: number }) => {
      const isActive = index === selectedRoomIndex;
      return (
        <TouchableOpacity
          onPress={() => handleSelectRoom(index)}
          activeOpacity={0.7}
          style={[styles.roomChip, isActive && styles.roomChipActive]}
        >
          <Text style={[styles.roomChipText, isActive && styles.roomChipTextActive]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedRoomIndex, handleSelectRoom],
  );

  const roomChipKeyExtractor = useCallback((item: RoomData) => item.id, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi Brandon</Text>
            <Text style={styles.subtitle}>Welcome to your smart home</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>B</Text>
          </View>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          {stats.map((stat: StatData) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </View>

        {/* ── Master Switch ── */}
        <View style={styles.masterSwitch}>
          <View style={styles.masterSwitchLeft}>
            <Text style={styles.masterSwitchLabel}>Master Switch</Text>
            <Text style={styles.masterSwitchCount}>
              {activeDeviceCount} Active Devices
            </Text>
          </View>
          <Toggle value={masterSwitch} onValueChange={handleMasterToggle} />
        </View>

        {/* ── Room Selector ── */}
        <View style={styles.roomSelectorSection}>
          <SectionHeader title="Select Room" />
          <FlatList
            data={rooms}
            renderItem={renderRoomChip}
            keyExtractor={roomChipKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roomSelectorList}
          />
        </View>

        {/* ── Room Cards Grid ── */}
        <View style={styles.roomCardsSection}>
          <SectionHeader title="Rooms" actionLabel="See All" onAction={() => {}} />
          <View style={styles.roomCardsGrid}>
            {rooms.map((room: RoomData) => (
              <GlassCard key={room.id} style={styles.roomCard}>
                <View>
                  <Text style={styles.roomCardEmoji}>{room.imageEmoji}</Text>
                  <Text style={styles.roomCardName}>{room.name}</Text>
                  <Text style={styles.roomCardCount}>
                    {room.deviceCount} devices
                  </Text>
                </View>
                <Button
                  title="View"
                  variant="pill"
                  onPress={() => handleRoomPress(room)}
                  style={styles.roomCardButton}
                />
              </GlassCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export const Dashboard = React.memo(DashboardComponent);
