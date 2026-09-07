import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME, SIGNAL_COLORS, SignalType } from '../config/constants';
import type { Signal } from '../types';

interface SignalCardProps {
  signal: Signal;
  testID?: string;
}

export function SignalCard({ signal, testID }: SignalCardProps) {
  const signalColor = SIGNAL_COLORS[signal.type] || THEME.TEXT_SECONDARY;

  return (
    <View style={[styles.card, { borderColor: signalColor }]} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.timeframeContainer}>
          <Text style={styles.timeframe}>{signal.timeframe}</Text>
          <View style={[styles.indicator, { backgroundColor: signalColor }]} />
        </View>
      </View>

      {/* Signal Type */}
      <View style={styles.signalContainer}>
        <View
          style={[
            styles.signalIconContainer,
            { backgroundColor: signalColor + '14' },
          ]}
        >
          <Text style={[styles.signalIcon, { color: signalColor }]}>
            {signal.type === SignalType.UP && '↑'}
            {signal.type === SignalType.DOWN && '↓'}
            {signal.type === SignalType.WAIT && '⏸'}
          </Text>
        </View>
        <Text style={[styles.signalText, { color: signalColor }]}>
          {signal.type}
        </Text>
      </View>

      {/* Confidence */}
      <View style={styles.confidenceContainer}>
        <Text style={styles.label}>Confidence</Text>
        <Text style={[styles.confidence, { color: signalColor }]}>
          {Math.round(signal.confidence * 100)}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${signal.confidence * 100}%`,
              backgroundColor: signalColor,
            },
          ]}
        />
      </View>

      {/* Time Remaining */}
      <View style={styles.timeRemaining}>
        <Text style={styles.icon}>⏱️</Text>
        <Text style={styles.timeText}>{signal.expiresIn}s to expiry</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0d1938',
    borderRadius: 16,
    borderWidth: 1,
    padding: 13,
    marginBottom: 9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeframeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeframe: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.TEXT_SECONDARY,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  signalIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signalIcon: {
    fontSize: 20,
  },
  signalText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  confidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    color: THEME.TEXT_SECONDARY,
  },
  confidence: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#204d5e',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeRemaining: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  icon: {
    fontSize: 13,
  },
  timeText: {
    fontSize: 10.5,
    color: THEME.TEXT_SECONDARY,
  },
});
