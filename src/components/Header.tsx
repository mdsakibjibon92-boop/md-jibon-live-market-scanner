import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME, APP_NAME } from '../config/constants';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📡</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.appName}>MD JIBON</Text>
        <Text style={styles.subtitle}>Live market scanner</Text>
        <Text style={styles.description}>Decision support for visible chart data</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#123a5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  appName: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.2,
    color: THEME.ACCENT_BLUE,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: THEME.TEXT_PRIMARY,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: THEME.TEXT_SECONDARY,
  },
});
