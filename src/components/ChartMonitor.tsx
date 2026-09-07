import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../config/constants';
import type { ChartDetection } from '../types';

interface ChartMonitorProps {
  detection: ChartDetection;
}

export function ChartMonitor({ detection }: ChartMonitorProps) {
  const statusColor = detection.detected ? THEME.ACCENT_GREEN : THEME.TEXT_SECONDARY;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: detection.detected ? '#123a35' : '#12293a' },
          ]}
        >
          <Text style={[styles.icon, { color: statusColor }]}>📊</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Sample chart feed</Text>
          <Text style={styles.subtitle}>Preview mode — no live market data connected</Text>
        </View>
        <View style={[styles.toggle, { borderColor: THEME.ACCENT_BLUE }]}>
          <Text style={styles.toggleText}>Live path</Text>
          <Text style={styles.toggleIcon}>→</Text>
        </View>
      </View>

      <View style={styles.detectionInfo}>
        <Text style={styles.label}>MARKET SOURCE</Text>
        <Text style={styles.market}>{detection.market}</Text>
      </View>

      <View style={styles.autoMode}>
        <View style={styles.autoModeContent}>
          <Text style={styles.autoIcon}>🔄</Text>
          <Text style={styles.autoText}>AUTO</Text>
        </View>
      </View>

      <View style={styles.sourcesList}>
        <View style={[styles.sourceItem, styles.active]}>
          <Text style={styles.sourceIcon}>✓</Text>
          <Text style={styles.sourceLabel}>All Quotex / OTC</Text>
        </View>
        <View style={[styles.sourceItem, styles.inactive]}>
          <Text style={styles.sourceIcon}>📍</Text>
          <Text style={styles.sourceLabel}>Chart detected on screen</Text>
        </View>
        <View style={styles.monitoringStatus}>
          <View style={[styles.dot, { backgroundColor: statusColor }]} />
          <Text style={styles.statusText}>
            {detection.detected ? 'Monitoring' : 'Ready'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  icon: {
    fontSize: 18,
  },
  titleContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.TEXT_PRIMARY,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 10.5,
    color: THEME.TEXT_SECONDARY,
    marginTop: 3,
  },
  toggle: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 7,
    flexDirection: 'row',
    gap: 3,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.ACCENT_BLUE,
  },
  toggleIcon: {
    fontSize: 13,
    color: THEME.TEXT_SECONDARY,
  },
  detectionInfo: {
    marginBottom: 10,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.3,
    color: THEME.TEXT_MUTED,
    marginBottom: 6,
  },
  market: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: THEME.TEXT_PRIMARY,
  },
  autoMode: {
    backgroundColor: '#16263a',
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 7,
    alignSelf: 'flex-start',
  },
  autoModeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  autoIcon: {
    fontSize: 14,
  },
  autoText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.ACCENT_BLUE,
  },
  sourcesList: {
    gap: 7,
  },
  sourceItem: {
    borderRadius: 7,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  active: {
    backgroundColor: 'rgba(69, 214, 160, 0.07)',
    borderColor: 'rgba(69, 214, 160, 0.19)',
  },
  inactive: {
    backgroundColor: 'rgba(141, 161, 184, 0.07)',
    borderColor: 'rgba(141, 161, 184, 0.19)',
  },
  sourceIcon: {
    fontSize: 12,
  },
  sourceLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: THEME.TEXT_SECONDARY,
  },
  monitoringStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginLeft: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    color: THEME.TEXT_SECONDARY,
  },
});
