import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  selectionContainer: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  formContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 12,
  },
  field: {
    gap: 6,
  },
  rowField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  inlineFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  addItemInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  addItemBtn: {
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    gap: 8,
  },
  additionalItemInput: {
    flex: 1,
    fontSize: 16,
  },
});
