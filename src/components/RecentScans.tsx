import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { THEME, DISCLAIMER } from '../config/constants';
import { useAppStore } from '../store/appStore';

interface RecentScansProps {
  onOpenQuotex?: () => void;
}

export function RecentScans({ onOpenQuotex }: RecentScansProps) {
  const { recentScans } = useAppStore();
  const [displayScans, setDisplayScans] = useState(
    Array(5).fill({
      market: 'Any visible Quotex market',
      timeframe: '1 minute',
      time: '23:42',
      result: 'DOWN',
      color: '#f06172',
    })
  );

  useEffect(() => {
    if (recentScans.length > 0) {
      const scans = recentScans.slice(0, 5).map((scan) => ({
        market: scan.market,
        timeframe: scan.timeframe,
        time: scan.timestamp.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        result: scan.result,
        color:
          scan.result === 'UP'
            ? '#45d6a0'
            : scan.result === 'DOWN'
              ? '#f06172'
              : '#e8ba69',
      }));
      setDisplayScans(scans);
    }
  }, [recentScans]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.sectionTitle}>RECENT SCANS</Text>
          <Text style={styles.sectionSubtitle}>Signal history</Text>
        </View>
        <Pressable
          onPress={onOpenQuotex}
          style={({ pressed }) => [styles.openButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonIcon}>🌐</Text>
          <Text style={styles.buttonText}>Open Quotex</Text>
        </Pressable>
      </View>

      {/* Scans List */}
      <View style={styles.scansList}>
        {displayScans.map((scan, index) => (
          <View key={index} style={styles.scanItem}>
            <View
              style={[
                styles.resultIndicator,
                { backgroundColor: `${scan.color}17` },
              ]}
            >
              <Text style={[styles.resultIcon, { color: scan.color }]}>
                {scan.result === 'UP' && '↑'}
                {scan.result === 'DOWN' && '↓'}
                {scan.result === 'WAIT' && '⏸'}
              </Text>
            </View>
            <View style={styles.scanInfo}>
              <Text style={styles.scanMarket}>{scan.market}</Text>
              <Text style={styles.scanTime}>{scan.time} • {scan.timeframe}</Text>
            </View>
            <Text style={[styles.scanResult, { color: scan.color }]}>
              {scan.result}
            </Text>
          </View>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerIcon}>ℹ️</Text>
        <Text style={styles.disclaimerText}>{DISCLAIMER}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.8,
    color: THEME.TEXT_MUTED,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: THEME.TEXT_PRIMARY,
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonIcon: {
    fontSize: 14,
  },
  buttonText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: THEME.ACCENT_BLUE,
  },
  scansList: {
    backgroundColor: '#0d1928',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#204d5e',
    overflow: 'hidden',
    marginBottom: 13,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1b2f3f',
  },
  resultIndicator: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  resultIcon: {
    fontSize: 16,
  },
  scanInfo: {
    flex: 1,
  },
  scanMarket: {
    fontSize: 11.5,
    fontWeight: '600',
    color: THEME.TEXT_PRIMARY,
    marginBottom: 2,
  },
  scanTime: {
    fontSize: 9.5,
    color: THEME.TEXT_MUTED,
  },
  scanResult: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 3,
  },
  disclaimerIcon: {
    fontSize: 15,
    marginTop: 2,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: THEME.TEXT_MUTED,
  },
});
