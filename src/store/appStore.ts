import { create } from 'zustand';
import type {
  Signal,
  UserBalance,
  AppSettings,
  RecentScan,
  ScanStatistics,
  ChartDetection,
} from '../types';

interface AppState {
  // Balance
  balance: UserBalance;
  setBalance: (balance: UserBalance) => void;
  updateBalance: (amount: number) => void;

  // Current Signal
  currentSignal: Signal | null;
  setCurrentSignal: (signal: Signal | null) => void;

  // Recent Scans
  recentScans: RecentScan[];
  addRecentScan: (scan: RecentScan) => void;
  clearRecentScans: () => void;

  // App Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Chart Detection
  chartDetection: ChartDetection;
  setChartDetection: (detection: ChartDetection) => void;

  // Statistics
  statistics: ScanStatistics;
  updateStatistics: (stats: Partial<ScanStatistics>) => void;

  // UI State
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
  floatingButtonVisible: boolean;
  setFloatingButtonVisible: (visible: boolean) => void;

  // Loading States
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const defaultSettings: AppSettings = {
  autoTrade: false,
  notifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  theme: 'dark',
  language: 'en',
  marketSource: 'auto',
};

const defaultBalance: UserBalance = {
  live: 0,
  demo: 0,
  currency: 'USD',
  lastUpdated: new Date(),
  accountType: 'live',
};

const defaultChartDetection: ChartDetection = {
  detected: false,
  confidence: 0,
  market: 'Any visible Quotex market',
  timeframe: '1m',
  status: 'ready',
  lastUpdate: new Date(),
};

const defaultStatistics: ScanStatistics = {
  totalScans: 0,
  successfulScans: 0,
  failedScans: 0,
  upSignals: 0,
  downSignals: 0,
  waitSignals: 0,
  averageConfidence: 0,
  successRate: 0,
  lastScanTime: new Date(),
};

export const useAppStore = create<AppState>((set) => ({
  // Balance
  balance: defaultBalance,
  setBalance: (balance) => set({ balance }),
  updateBalance: (amount) =>
    set((state) => ({
      balance: {
        ...state.balance,
        live: state.balance.live + amount,
        lastUpdated: new Date(),
      },
    })),

  // Current Signal
  currentSignal: null,
  setCurrentSignal: (signal) => set({ currentSignal: signal }),

  // Recent Scans
  recentScans: [],
  addRecentScan: (scan) =>
    set((state) => ({
      recentScans: [scan, ...state.recentScans].slice(0, 10), // Keep last 10
    })),
  clearRecentScans: () => set({ recentScans: [] }),

  // Settings
  settings: defaultSettings,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  // Chart Detection
  chartDetection: defaultChartDetection,
  setChartDetection: (detection) => set({ chartDetection: detection }),

  // Statistics
  statistics: defaultStatistics,
  updateStatistics: (stats) =>
    set((state) => ({
      statistics: { ...state.statistics, ...stats },
    })),

  // UI State
  isScanning: false,
  setIsScanning: (scanning) => set({ isScanning: scanning }),
  floatingButtonVisible: true,
  setFloatingButtonVisible: (visible) => set({ floatingButtonVisible: visible }),

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
