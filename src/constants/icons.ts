// ============================================================================
// ICON MAPPINGS
// ============================================================================

// Navigation & Tab Icons
export const NAVIGATION_ICONS = {
  home: '🏠',
  dashboard: '📊',
  profile: '👤',
  settings: '⚙️',
  back: '←',
  close: '✕',
} as const;

// Role Icons
export const ROLE_ICONS = {
  admin: '👑',
  doctor: '👨‍⚕️',
  nurse: '👩‍⚕️',
  patient: '🏥',
  user: '👤',
} as const;

// Feature Icons
export const FEATURE_ICONS = {
  analytics: '📊',
  reports: '📋',
  userManagement: '👥',
  patientData: '🏥',
  systemSettings: '⚙️',
  logs: '📝',
  notifications: '🔔',
  contentManagement: '📚',
  billing: '💰',
  appointments: '📅',
  healthRecords: '📋',
  medications: '💊',
  labResults: '🔬',
  prescriptions: '📄',
  telemedicine: '📹',
  emergencyContacts: '🚨',
} as const;

// UI Icons
export const UI_ICONS = {
  theme: '🎨',
  language: '🌐',
  logout: '🚪',
  edit: '✏️',
  delete: '🗑️',
  add: '➕',
  search: '🔍',
  filter: '🔧',
  sort: '↕️',
  refresh: '🔄',
  download: '⬇️',
  upload: '⬆️',
  share: '📤',
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
  loading: '⏳',
  star: '⭐',
  heart: '❤️',
  like: '👍',
  dislike: '👎',
  comment: '💬',
  calendar: '📅',
  clock: '🕐',
  location: '📍',
  phone: '📞',
  email: '📧',
  website: '🌐',
  camera: '📷',
  gallery: '🖼️',
  document: '📄',
  folder: '📁',
  settings: '⚙️',
  profile: '👤',
  home: '🏠',
  dashboard: '📊',
  menu: '☰',
  close: '✕',
  check: '✓',
  arrowRight: '→',
  arrowLeft: '←',
  arrowUp: '↑',
  arrowDown: '↓',
  chevronRight: '›',
  chevronLeft: '‹',
  chevronUp: '⌃',
  chevronDown: '⌄',
  userId: '🆔',
  lock: '🔒',
  eye: '👁️',
  'eye-off': '👁️‍🗨️',
  user: '👤',
  'wifi-off': '📶',
  server: '🖥️',
} as const;

// Status Icons
export const STATUS_ICONS = {
  online: '🟢',
  offline: '🔴',
  busy: '🟡',
  away: '🟠',
  pending: '⏳',
  completed: '✅',
  cancelled: '❌',
  inProgress: '🔄',
} as const;

// Healthcare Specific Icons
export const HEALTHCARE_ICONS = {
  hospital: '🏥',
  clinic: '🏥',
  pharmacy: '💊',
  ambulance: '🚑',
  heartbeat: '💓',
  thermometer: '🌡️',
  stethoscope: '🩺',
  syringe: '💉',
  pill: '💊',
  bandage: '🩹',
  wheelchair: '♿',
  crutches: '🦯',
  xray: '📷',
  microscope: '🔬',
  dna: '🧬',
  brain: '🧠',
  heart: '❤️',
  lung: '🫁',
  kidney: '🫁',
  liver: '🫁',
  bone: '🦴',
  muscle: '💪',
  eye: '👁️',
  ear: '👂',
  nose: '👃',
  mouth: '👄',
  tooth: '🦷',
  blood: '🩸',
  urine: '🟡',
  stool: '💩',
  vaccine: '💉',
  mask: '😷',
  sanitizer: '🧴',
  soap: '🧼',
  scale: '⚖️',
  height: '📏',
  weight: '⚖️',
  bloodPressure: '🩸',
  pulse: '💓',
  temperature: '🌡️',
  oxygen: '🫁',
  glucose: '🩸',
  cholesterol: '🩸',
  bmi: '📊',
} as const;

// Combined Icons Object for easy access
export const ICONS = {
  ...NAVIGATION_ICONS,
  ...ROLE_ICONS,
  ...FEATURE_ICONS,
  ...UI_ICONS,
  ...STATUS_ICONS,
  ...HEALTHCARE_ICONS,
} as const;

// Type for icon names
export type IconName = keyof typeof ICONS;

// Helper function to get icon
export const getIcon = (name: IconName): string => {
  if (!name) {
    console.warn('getIcon called with undefined or null name');
    return '📱'; // Default fallback icon
  }
  return ICONS[name] || '📱'; // Default fallback icon
};

// Helper function to check if icon exists
export const hasIcon = (name: string): name is IconName => {
  return name in ICONS;
};
