import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useChartDetection } from '../hooks/useChartDetection';
import { useSignalGeneration } from '../hooks/useSignalGeneration';

export default function HomeScreen() {
  const { chartDetection, startMonitoring } = useChartDetection();
  const { generateSignal } = useSignalGeneration();

  useEffect(() => {
    startMonitoring();
  }, [startMonitoring]);

  const handleScan = async () => {
    const signal = await generateSignal('ONE_MINUTE');
    if (signal) {
      console.log('Signal generated:', signal);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Main scanner content will be rendered here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081f1f',
  },
  content: {
    flex: 1,
    padding: 18,
  },
});
