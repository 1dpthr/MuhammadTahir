import {
  FiGlobe,
  FiActivity,
  FiLayers,
  FiAward,
  FiHome,
  FiSmartphone,
  FiCpu,
  FiPenTool,
  FiVideo,
  FiBriefcase,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiCode,
  FiLayout,
  FiServer,
  FiTool,
  FiImage,
  FiBookOpen,
  FiMonitor,
  FiCamera,
  FiDatabase,
  FiGrid
} from 'react-icons/fi';

// Maps the string icon keys used in data.js to Feather icon components.
// One consistent icon set across the whole site.
const ICON_MAP = {
  // Projects
  personal: FiGlobe,
  vehiclehub: FiActivity,
  fitkro: FiActivity,
  stylesathi: FiLayers,
  hangman: FiAward,
  hotel: FiHome,
  easypaisa: FiSmartphone,
  ilmdost: FiBookOpen,
  traffic: FiMonitor,
  airdraw: FiCamera,
  syncstay: FiDatabase,
  syncstaymob: FiSmartphone,
  os: FiGrid,

  // Services
  software: FiCpu,
  web: FiGlobe,
  design: FiPenTool,
  content: FiVideo,
  mobile: FiSmartphone,
  ai: FiCpu,

  // Experience
  briefcase: FiBriefcase,

  // About cards
  education: FiTrendingUp,
  mission: FiTarget,
  focus: FiEye,

  // Skills
  code: FiCode,
  frontend: FiLayout,
  backend: FiServer,
  tools: FiTool,
  media: FiImage,
  smartphone: FiSmartphone,
  camera: FiCamera,
  server: FiServer
};

export default ICON_MAP;
