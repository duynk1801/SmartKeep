import { StyleSheet } from 'react-native';

import { Colors } from '@/src/constants/colors';
import { SCREEN_WIDTH, Theme } from '@/src/constants/theme';

const CARD_WIDTH = (SCREEN_WIDTH - Theme.spacing.screenPadding * 2 - Theme.spacing.cardGap) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },

  // ─── Header ─────────────────────────
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.xxl + Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    ...Theme.typography.greeting,
  },
  subtitle: {
    ...Theme.typography.subtitle,
    marginTop: Theme.spacing.xs,
  },
  avatar: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.055,
    backgroundColor: Colors.glassElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  avatarText: {
    fontSize: SCREEN_WIDTH * 0.045,
    color: Colors.text,
  },

  // ─── Stats Row ──────────────────────
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.cardGap,
    marginBottom: Theme.spacing.sectionGap,
  },

  // ─── Master Switch ──────────────────
  masterSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sectionGap,
    ...Theme.glass.card,
  },
  masterSwitchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  masterSwitchLabel: {
    ...Theme.typography.bodyBold,
  },
  masterSwitchCount: {
    ...Theme.typography.caption,
  },

  // ─── Room Selector ──────────────────
  roomSelectorSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  roomSelectorList: {
    gap: Theme.spacing.sm,
  },
  roomChip: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.pill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glass,
  },
  roomChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roomChipText: {
    ...Theme.typography.buttonText,
    color: Colors.textSecondary,
  },
  roomChipTextActive: {
    color: Colors.white,
  },

  // ─── Room Cards ─────────────────────
  roomCardsSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
  },
  roomCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.cardGap,
  },
  roomCard: {
    width: CARD_WIDTH,
    minHeight: CARD_WIDTH * 1.3,
    ...Theme.glass.card,
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  roomCardEmoji: {
    fontSize: SCREEN_WIDTH * 0.1,
    marginBottom: Theme.spacing.md,
  },
  roomCardName: {
    ...Theme.typography.bodyBold,
    marginBottom: Theme.spacing.xs,
  },
  roomCardCount: {
    ...Theme.typography.caption,
    marginBottom: Theme.spacing.md,
  },
  roomCardButton: {
    alignSelf: 'flex-start',
  },
});
