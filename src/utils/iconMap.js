import React from 'react';
import {
  FiGlobe,
  FiCode,
  FiActivity,
  FiLayers,
  FiAward,
  FiHome,
  FiSmartphone,
  FiCpu,
  FiPenTool,
  FiVideo,
  FiBriefcase,
  FiGithub,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiCode as FiCodeIcon,
  FiLayout,
  FiServer,
  FiTool,
  FiImage
} from 'react-icons/fi';

// Map string keys from data.js to themed icon components (export components, not JSX)
// Using consistent Feather Icons (Fi) style throughout
const ICON_MAP = {
  // Projects
  personal: FiGlobe,
  vehiclehub: FiActivity,
  fitkro: FiActivity,
  stylesathi: FiLayers,
  hangman: FiAward,
  hotel: FiHome,
  easypaisa: FiSmartphone,

  // Services
  software: FiCpu,
  web: FiGlobe,
  design: FiPenTool,
  content: FiVideo,

  // Experience
  briefcase: FiBriefcase,

  // About cards
  education: FiTrendingUp,
  mission: FiTarget,
  focus: FiEye,

  // Skills
  code: FiCodeIcon,
  frontend: FiLayout,
  backend: FiServer,
  tools: FiTool,
  design: FiPenTool,
  media: FiImage,

  // Fallback / misc
  github: FiGithub
};

export default ICON_MAP;
