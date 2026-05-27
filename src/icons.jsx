// Lucide-style inline icon components. Stroke-based, currentColor.
const I = ({ children, size = 18, className = "", stroke = 1.75, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
       strokeLinejoin="round" className={className} {...rest}>{children}</svg>
);

const Sparkles    = (p) => <I {...p}><path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/><path d="M5 4l.6 1.6L7 6l-1.4.4L5 8l-.6-1.6L3 6l1.4-.4L5 4z"/></I>;
const Bolt        = (p) => <I {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></I>;
const Chrome      = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></I>;
const Play        = (p) => <I {...p}><polygon points="6 4 20 12 6 20 6 4"/></I>;
const ArrowRight  = (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>;
const ArrowUpRight= (p) => <I {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></I>;
const Star        = (p) => <I {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></I>;
const Filter      = (p) => <I {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></I>;
const Wand        = (p) => <I {...p}><path d="M15 4l1 1"/><path d="M3 21l11-11"/><path d="M19 8l1 1"/><path d="M14 3l1 1"/><path d="M19 14l1 1"/><path d="M9 5l1 1"/></I>;
const MessageCircle = (p) => <I {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></I>;
const Calendar    = (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>;
const Layers      = (p) => <I {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></I>;
const History     = (p) => <I {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/><polyline points="12 7 12 12 15 14"/></I>;
const Settings    = (p) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></I>;
const Check       = (p) => <I {...p}><polyline points="20 6 9 17 4 12"/></I>;
const X           = (p) => <I {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>;
const Plus        = (p) => <I {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>;
const Eye         = (p) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></I>;
const Brain       = (p) => <I {...p}><path d="M9.5 3a3 3 0 0 0-3 3v.2A3 3 0 0 0 4 9v.5A2.5 2.5 0 0 0 4 14v.5A3 3 0 0 0 6.5 18a3 3 0 0 0 3 3 2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 9.5 3z"/><path d="M14.5 3a3 3 0 0 1 3 3v.2A3 3 0 0 1 20 9v.5a2.5 2.5 0 0 1 0 4.5v.5a3 3 0 0 1-2.5 3 3 3 0 0 1-3 3 2.5 2.5 0 0 1-2.5-2.5V5.5A2.5 2.5 0 0 1 14.5 3z"/></I>;
const Quote       = (p) => <I {...p}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4"/></I>;
const Cpu         = (p) => <I {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></I>;
const Heart       = (p) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></I>;
const ThumbsUp    = (p) => <I {...p}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9A2 2 0 0 0 19.72 9H14z"/><line x1="7" y1="22" x2="7" y2="11"/></I>;
const ThumbsDown  = (p) => <I {...p}><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9A2 2 0 0 0 4.28 15H10z"/><line x1="17" y1="2" x2="17" y2="13"/></I>;
const Smile       = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></I>;
const Repeat      = (p) => <I {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></I>;
const Send        = (p) => <I {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></I>;
const Lock        = (p) => <I {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></I>;
const Zap         = (p) => <I {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></I>;
const Globe       = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></I>;
const Mic         = (p) => <I {...p}><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></I>;
const FileText    = (p) => <I {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></I>;
const Image       = (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></I>;
const Clock       = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></I>;
const Link        = (p) => <I {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></I>;
const ChevronDown = (p) => <I {...p}><polyline points="6 9 12 15 18 9"/></I>;
const Menu        = (p) => <I {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></I>;
const Github      = (p) => <I {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></I>;
const Shield      = (p) => <I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></I>;
const Activity    = (p) => <I {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></I>;
const Compass     = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></I>;
const TrendingUp  = (p) => <I {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></I>;
const Sun         = (p) => <I {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></I>;
const Moon        = (p) => <I {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></I>;
const Linkedin    = (p) => <I {...p} stroke={0} fill="currentColor"><path d="M4 4h4v16H4zM6 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 8h4v2.2c.6-1.1 2-2.4 4.3-2.4 4.6 0 5.7 3 5.7 6.8V20h-4v-4.6c0-1.6-.5-3-2.3-3-1.8 0-2.7 1.4-2.7 3V20h-4V8z"/></I>;
const Xtwitter    = (p) => <I {...p} stroke={0} fill="currentColor"><path d="M17.53 3H20.5l-6.49 7.41L21.5 21h-5.92l-4.64-6.07L5.6 21H2.62l6.94-7.93L2.4 3h6.07l4.2 5.55L17.53 3zm-1.04 16h1.64L7.61 5H5.85L16.49 19z"/></I>;

// Expose
Object.assign(window, {
  Sparkles, Bolt, Chrome, Play, ArrowRight, ArrowUpRight, Star, Filter, Wand,
  MessageCircle, Calendar, Layers, History, Settings, Check, X, Plus, Eye, Brain,
  Quote, Cpu, Heart, ThumbsUp, ThumbsDown, Smile, Repeat, Send, Lock, Zap, Globe,
  Mic, FileText, Image, Clock, Link, ChevronDown, Menu, Github, Shield, Activity,
  Compass, TrendingUp, Sun, Moon, Linkedin, Xtwitter
});
