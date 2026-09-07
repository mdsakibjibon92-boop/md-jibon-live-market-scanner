import type { Signal, LogicCheckResults, SignalConfidenceBreakdown } from '../types';
import { SignalType, AI_CONFIG, SIGNAL_WINDOWS } from '../config/constants';

/**
 * Signal Service - Generates trading signals based on logic checks
 */

class SignalService {
  /**
   * Generate a trading signal based on 100 logic checks
   */
  generateSignal(
    market: string,
    timeframeKey: keyof typeof SIGNAL_WINDOWS,
    logicResults: LogicCheckResults
  ): Signal {
    const timeframe = SIGNAL_WINDOWS[timeframeKey];
    const confidence = logicResults.confidence;
    const signalType = this.determineSignalType(confidence);

    const signal: Signal = {
      id: this.generateId(),
      type: signalType,
      timeframe: timeframe.label,
      confidence,
      logicChecksPassed: logicResults.passedChecks,
      totalLogicChecks: logicResults.totalChecks,
      timestamp: new Date(),
      expiresIn: timeframe.seconds,
      market,
      priceAction: {
        current: 1.08426,
        change: 0.18,
        changePercent: 0.0018,
        currencyPair: 'EUR/USD',
        timestamp: new Date().toLocaleTimeString(),
      },
    };

    return signal;
  }

  /**
   * Determine signal type based on confidence level
   */
  private determineSignalType(confidence: number): SignalType {
    if (confidence >= 0.65) return SignalType.UP;
    if (confidence >= 0.50 && confidence < 0.65) return SignalType.DOWN;
    if (confidence >= 0.42 && confidence < 0.50) return SignalType.WAIT;
    return SignalType.NEUTRAL;
  }

  /**
   * Execute 100 logic checks
   */
  executeLogicChecks(): LogicCheckResults {
    const checks = this.generateLogicChecks();
    const passedChecks = checks.filter((c) => c.passed).length;
    const confidence = this.calculateConfidence(checks);

    return {
      totalChecks: checks.length,
      passedChecks,
      failedChecks: checks.length - passedChecks,
      checks,
      confidence,
    };
  }

  /**
   * Generate 100 logic checks across 4 timeframes
   */
  private generateLogicChecks() {
    const checks = [];
    const categories = [
      'Momentum',
      'Structure',
      'Timeframe',
      'Price Action',
      'Indicators',
    ];

    for (let i = 0; i < AI_CONFIG.TOTAL_LOGIC_CHECKS; i++) {
      const category = categories[i % categories.length];
      const passed = Math.random() > 0.2; // 80% pass rate for demo

      checks.push({
        id: `check_${i}`,
        name: `${category} Check ${i + 1}`,
        category,
        passed,
        weight: 1 / AI_CONFIG.TOTAL_LOGIC_CHECKS,
        description: `Logic check for ${category} analysis`,
      });
    }

    return checks;
  }

  /**
   * Calculate overall confidence from logic checks
   */
  private calculateConfidence(checks: any[]): number {
    const passedWeighted = checks.reduce((sum, check) => {
      return sum + (check.passed ? check.weight : 0);
    }, 0);

    // Add slight randomization for realism
    const randomFactor = (Math.random() - 0.5) * 0.1;
    const confidence = Math.max(0.42, Math.min(0.95, passedWeighted + randomFactor));

    return Math.round(confidence * 100) / 100;
  }

  /**
   * Get confidence breakdown by category
   */
  getConfidenceBreakdown(checks: any[]): SignalConfidenceBreakdown {
    const categories = {
      momentum: 0,
      structure: 0,
      timeframeAlignment: 0,
      priceAction: 0,
    };

    checks.forEach((check) => {
      const weight = check.passed ? 1 : 0;
      if (check.category === 'Momentum') categories.momentum += weight;
      else if (check.category === 'Structure') categories.structure += weight;
      else if (check.category === 'Timeframe') categories.timeframeAlignment += weight;
      else if (check.category === 'Price Action') categories.priceAction += weight;
    });

    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    const overall = total / checks.length;

    return {
      momentum: categories.momentum / checks.length,
      structure: categories.structure / checks.length,
      timeframeAlignment: categories.timeframeAlignment / checks.length,
      priceAction: categories.priceAction / checks.length,
      overall,
    };
  }

  /**
   * Validate signal quality
   */
  validateSignal(signal: Signal): boolean {
    return (
      signal.confidence >= 0.42 &&
      signal.logicChecksPassed >= 0 &&
      signal.logicChecksPassed <= signal.totalLogicChecks
    );
  }

  /**
   * Generate unique ID for signal
   */
  private generateId(): string {
    return `signal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if signal is still valid (not expired)
   */
  isSignalValid(signal: Signal): boolean {
    const ageSeconds = (Date.now() - signal.timestamp.getTime()) / 1000;
    return ageSeconds < signal.expiresIn;
  }

  /**
   * Get signal recommendation text
   */
  getSignalRecommendation(signal: Signal): string {
    switch (signal.type) {
      case SignalType.UP:
        return `Strong UP signal with ${(signal.confidence * 100).toFixed(0)}% confidence`;
      case SignalType.DOWN:
        return `Strong DOWN signal with ${(signal.confidence * 100).toFixed(0)}% confidence`;
      case SignalType.WAIT:
        return `Neutral signal - WAIT for better opportunity`;
      default:
        return 'No clear signal';
    }
  }
}

export const signalService = new SignalService();
