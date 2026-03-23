import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { Colors } from '@/src/constants/colors';
import { formatDate } from '@/src/utils/date';
import { getWarrantyStatus } from '@/src/utils/warranty';
import type { Warranty } from '@/src/types/database';

interface WarrantyListProps {
  warranties: Warranty[];
  onItemPress: (warranty: Warranty) => void;
}

function WarrantyItemComponent({ item }: { item: Warranty }) {
  const status = getWarrantyStatus(item.expiry_date);

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.provider} numberOfLines={1}>
          {item.provider}
        </Text>
        <View style={[styles.badge, styles[`badge_${status}`]]}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.date}>Expires: {formatDate(item.expiry_date)}</Text>
    </View>
  );
}

const WarrantyItem = React.memo(WarrantyItemComponent);

function WarrantyListComponent({ warranties, onItemPress }: WarrantyListProps) {
  const renderItem = React.useCallback(
    ({ item }: { item: Warranty }) => <WarrantyItem item={item} />,
    [],
  );

  const keyExtractor = React.useCallback((item: Warranty) => item.id, []);

  return (
    <FlatList
      data={warranties}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

export const WarrantyList = React.memo(WarrantyListComponent);

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  item: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  provider: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badge_active: {
    backgroundColor: Colors.successBackground,
  },
  badge_expiring: {
    backgroundColor: Colors.warningBackground,
  },
  badge_expired: {
    backgroundColor: Colors.errorBackground,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
