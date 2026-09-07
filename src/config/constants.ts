// MD Jibon Live Market Scanner - Constants

export const APP_NAME = 'MD Jibon Live Market Scanner';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Live market scanner for Quotex with AI decision support';

// Market Configuration
export const MARKET_CONFIG = {
  SOURCE: 'Quotex / OTC',
  MODE: 'AUTO',
  DETECTION_CONFIDENCE_THRESHOLD: 0.96, // 96% frame quality
};

// Signal Windows (in seconds)
export const SIGNAL_WINDOWS = {
  ONE_MINUTE: {
    label: '1 minute',
    seconds: 60,
    priority: 1,
    testId: 'signal-card-1m',
  },
  FIFTEEN_SECONDS: {
    label: '15 seconds',
    seconds: 15,
    priority: 2,
    testId: 'signal-card-15s',
  },
  TEN_SECONDS: {
    label: '10 seconds',
    seconds: 10,
    priority: 3,
    testId: 'signal-card-10s',
  },
  FIVE_SECONDS: {
    label: '5 seconds',
    seconds: 5,
    priority: 4,
    testId: 'signal-card-5s',
  },
};

// AI Decision Board
export const AI_CONFIG = {
  TOTAL_LOGIC_CHECKS: 100,
  TIMEFRAMES: 4,
  MIN_CONFIDENCE: 0.42, // 42% minimum confidence
  MAX_CONFIDENCE: 0.95, // 95% maximum confidence
  TARGET_ACCURACY: '90-95%',
};

// Signal Types
export enum SignalType {
  UP = 'UP',
  DOWN = 'DOWN',
  WAIT = 'WAIT',
  NEUTRAL = 'NEUTRAL',
}

// Signal Colors
export const SIGNAL_COLORS = {
  [SignalType.UP]: '#45d6a0', // Green
  [SignalType.DOWN]: '#f06172', // Red
  [SignalType.WAIT]: '#e8ba69', // Orange/Yellow
  [SignalType.NEUTRAL]: '#8da1b8', // Gray
};

// Confidence Thresholds
export const CONFIDENCE_THRESHOLDS = {
  VERY_HIGH: 0.85,
  HIGH: 0.70,
  MEDIUM: 0.50,
  LOW: 0.42,
};

// Trading Config
export const TRADING_CONFIG = {
  USE_LIVE_BALANCE: true,
  USE_DEMO_BALANCE: false,
  MINIMUM_TRADE_AMOUNT: 1,
  AUTO_TRADE_ENABLED: false, // Manual trading only
};

// UI Theme
export const THEME = {
  PRIMARY_DARK: '#081f1f', // Dark background
  SECONDARY_DARK: '#0d1928',
  ACCENT_BLUE: '#55d7f5', // Light blue
  ACCENT_GREEN: '#45d6a0', // Green
  ACCENT_RED: '#f06172', // Red
  ACCENT_ORANGE: '#e8ba69', // Orange
  TEXT_PRIMARY: '#f4f7fb',
  TEXT_SECONDARY: '#8da1b8',
  TEXT_MUTED: '#6d88a4',
  BORDER_COLOR: '#204d5e',
};

// Scan Button Config
export const SCAN_BUTTON = {
  TEST_ID: 'scan-button',
  LABEL: 'SCAN 1 MINUTE',
  ICON: 'scan',
  DEBOUNCE_MS: 1000,
};

// Detection Config
export const DETECTION = {
  FRAME_QUALITY_TARGET: 0.96, // 96%
  DETECTION_METHOD: 'visual-chart-recognition',
  MAX_DETECTION_TIME: 5000, // 5 seconds
};

// Recent Scans Storage
export const STORAGE_KEYS = {
  RECENT_SCANS: 'recent_scans_history',
  USER_BALANCE: 'user_live_balance',
  APP_SETTINGS: 'app_settings',
  SCAN_STATISTICS: 'scan_statistics',
};

// Price Action Config
export const PRICE_ACTION = {
  SAMPLE_PRICE: '1.08426',
  SAMPLE_CHANGE: '+0.18%',
  CURRENCY_PAIR: 'EUR/USD',
};

// Settings Button
export const SETTINGS_BUTTON = {
  TEST_ID: 'settings-button',
  ICON: 'settings',
};

// Source Toggle
export const SOURCE_TOGGLE = {
  TEST_ID: 'source-toggle',
  LIVE_PATH: 'Live path',
  SAMPLE_PATH: 'Sample chart feed',
};

// Auto Trade Settings
export const AUTO_TRADE_SETTINGS = {
  ENABLED: false,
  LABEL: 'No auto-trade',
  DESCRIPTION: 'Manual trading mode only',
};

// Disclaimer
export const DISCLAIMER = 'Signals are decision support, not guaranteed outcomes. Never trade more than you can afford to lose.';

// Chart Detection Markers
export const CHART_DETECTION = {
  STATUS_ICON: 'checkmark-circle',
  STATUS_MONITORING: 'Monitoring',
  STATUS_READY: 'Ready to scan',
  DETECTION_PERCENTAGE: 96, // 96% confidence
};

// Floating Buttons Config
export const FLOATING_BUTTONS = {
  SCAN: {
    testId: 'floating-scan-button',
    position: 'bottom-right',
    icon: 'scan',
  },
  MINIMIZE: {
    testId: 'floating-minimize',
    position: 'below-scan',
    icon: 'chevron-down',
  },
};

// API Endpoints (when live integration needed)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.quotex.io',
  CHART_DATA: '/v1/chart/data',
  SIGNAL_GENERATE: '/v1/signal/generate',
  BALANCE_UPDATE: '/v1/account/balance',
};
