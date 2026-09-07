// Type Definitions for MD Jibon Live Market Scanner

export type SignalType = 'UP' | 'DOWN' | 'WAIT' | 'NEUTRAL';

export interface Signal {
  id: string;
  type: SignalType;
  timeframe: string;
  confidence: number;
  logicChecksPassed: number;
  totalLogicChecks: number;
  timestamp: Date;
  expiresIn: number; // seconds
  market: string;
  priceAction: PriceAction;
}

export interface PriceAction {
  current: number;
  change: number;
  changePercent: number;
  currencyPair: string;
  timestamp: string;
}

export interface ChartData {
  pricePoints: number[];
  timestamps: Date[];
  high: number;
  low: number;
  open: number;
  close: number;
  volume?: number;
}

export interface DetectionResult {
  detected: boolean;
  confidence: number;
  frameQuality: number;
  market: string;
  timeframe: string;
  timestamp: Date;
}

export interface ScanResult {
  id: string;
  timestamp: Date;
  market: string;
  timeframe: string;
  signals: Signal[];
  chartData: ChartData;
  detectionQuality: number;
  executionTime: number; // milliseconds
}

export interface LogicCheck {
  id: string;
  name: string;
  category: string;
  passed: boolean;
  weight: number;
  description: string;
}

export interface LogicCheckResults {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  checks: LogicCheck[];
  confidence: number;
}

export interface UserBalance {
  live: number;
  demo: number;
  currency: string;
  lastUpdated: Date;
  accountType: 'live' | 'demo';
}

export interface TradeSignal {
  signal: Signal;
  recommendedAction: 'BUY' | 'SELL' | 'WAIT' | 'NONE';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expirationTime: Date;
  suggestedExpiry: string; // e.g., '1m', '15s', '10s', '5s'
}

export interface RecentScan {
  id: string;
  timestamp: Date;
  market: string;
  timeframe: string;
  result: SignalType;
  confidence: number;
}

export interface AppSettings {
  autoTrade: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'dark' | 'light';
  language: string;
  marketSource: 'auto' | 'manual';
}

export interface FrameQuality {
  score: number; // 0-100
  isValid: boolean;
  issues: string[];
}

export interface TimeframeConfig {
  label: string;
  seconds: number;
  priority: number;
  enabled: boolean;
}

export interface MarketSource {
  name: string;
  type: 'quotex' | 'otc';
  active: boolean;
  detectionQuality: number;
}

export interface ScanStatistics {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  upSignals: number;
  downSignals: number;
  waitSignals: number;
  averageConfidence: number;
  successRate: number;
  lastScanTime: Date;
}

export interface ChartDetection {
  detected: boolean;
  confidence: number;
  market: string;
  timeframe: string;
  status: 'monitoring' | 'ready' | 'scanning';
  lastUpdate: Date;
}

export interface FloatingButtonState {
  visible: boolean;
  position: {
    x: number;
    y: number;
  };
  isMinimized: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface LogicCheckCategory {
  name: string;
  checks: LogicCheck[];
  weight: number;
}

export interface SignalConfidenceBreakdown {
  momentum: number;
  structure: number;
  timeframeAlignment: number;
  priceAction: number;
  overall: number;
}

export interface MarketCondition {
  trend: 'uptrend' | 'downtrend' | 'sideways';
  volatility: 'high' | 'medium' | 'low';
  momentum: number; // -100 to 100
  strength: number; // 0 to 100
}
