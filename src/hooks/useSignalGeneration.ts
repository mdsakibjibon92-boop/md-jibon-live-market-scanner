import { useCallback, useState } from 'react';
import { signalService } from '../services/signalService';
import { chartDetectionService } from '../services/chartDetectionService';
import { useAppStore } from '../store/appStore';
import type { Signal } from '../types';
import { SIGNAL_WINDOWS } from '../config/constants';

export function useSignalGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentSignal, addRecentScan, balance } = useAppStore();

  const generateSignal = useCallback(
    async (timeframeKey: keyof typeof SIGNAL_WINDOWS = 'ONE_MINUTE') => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Detect chart
        const detection = await chartDetectionService.detectChart();

        if (!detection.detected) {
          setError('No chart detected. Please ensure Quotex chart is visible.');
          setLoading(false);
          return null;
        }

        // Step 2: Execute 100 logic checks
        const logicResults = signalService.executeLogicChecks();

        // Step 3: Generate signal
        const signal = signalService.generateSignal(
          detection.market,
          timeframeKey,
          logicResults
        );

        // Step 4: Validate signal
        if (!signalService.validateSignal(signal)) {
          setError('Generated signal failed validation.');
          setLoading(false);
          return null;
        }

        // Step 5: Store signal
        setCurrentSignal(signal);

        // Step 6: Add to recent scans
        addRecentScan({
          id: signal.id,
          timestamp: signal.timestamp,
          market: signal.market,
          timeframe: signal.timeframe,
          result: signal.type,
          confidence: signal.confidence,
        });

        setLoading(false);
        return signal;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(message);
        setLoading(false);
        return null;
      }
    },
    [setCurrentSignal, addRecentScan]
  );

  const generateAllTimeframeSignals = useCallback(async () => {
    const signals: Signal[] = [];

    for (const key of Object.keys(SIGNAL_WINDOWS) as Array<
      keyof typeof SIGNAL_WINDOWS
    >) {
      const signal = await generateSignal(key);
      if (signal) {
        signals.push(signal);
      }
    }

    return signals;
  }, [generateSignal]);

  return {
    generateSignal,
    generateAllTimeframeSignals,
    loading,
    error,
  };
}
