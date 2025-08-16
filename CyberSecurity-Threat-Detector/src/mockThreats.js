// mockThreatData.js
export const mockThreats = [
  {
    id: 1,
    title: "Ransomware Campaign Targeting Healthcare",
    severity: "critical",
    type: "Ransomware",
    status: "active",
    description: "New variant of LockBit ransomware specifically targeting hospital networks.",
    timestamp: "2024-08-15T10:30:00Z",
    affectedRegions: ["North America", "Europe"]
  },
  {
    id: 2,
    title: "Phishing Campaign via LinkedIn Messages",
    severity: "high",
    type: "Phishing", 
    status: "monitoring",
    description: "Attackers impersonating recruiters to steal credentials.",
    timestamp: "2024-08-15T08:15:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 3,
    title: "APT29 Government Network Breach",
    severity: "critical",
    type: "APT",
    status: "active",
    description: "Sophisticated attack using zero-day exploits in Microsoft Exchange.",
    timestamp: "2024-08-15T07:45:00Z",
    affectedRegions: ["North America", "Europe", "Asia-Pacific"]
  },
  {
    id: 4,
    title: "Vulnerability in Apache Log4j Library",
    severity: "high",
    type: "Vulnerability",
    status: "patched",
    description: "Critical RCE vulnerability allowing remote code execution.",
    timestamp: "2024-08-14T14:20:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 5,
    title: "Suspicious DNS Traffic Patterns",
    severity: "medium",
    type: "Network Anomaly",
    status: "investigating",
    description: "Unusual DNS queries suggesting data exfiltration attempts.",
    timestamp: "2024-08-14T16:45:00Z",
    affectedRegions: ["Asia-Pacific"]
  },
  {
    id: 6,
    title: "Brute Force Attacks on SSH Services",
    severity: "low",
    type: "Brute Force",
    status: "mitigated",
    description: "Coordinated attempts to compromise SSH services.",
    timestamp: "2024-08-14T12:00:00Z",
    affectedRegions: ["Europe"]
  },
  {
    id: 7,
    title: "BlackCat Ransomware Evolution",
    severity: "critical",
    type: "Ransomware",
    status: "active",
    description: "New variant with enhanced evasion techniques.",
    timestamp: "2024-08-13T09:30:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 8,
    title: "Supply Chain Attack via NPM Package",
    severity: "high",
    type: "Supply Chain",
    status: "investigating",
    description: "Malicious code injected into popular JavaScript library.",
    timestamp: "2024-08-13T15:20:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 9,
    title: "IoT Botnet Expansion - Mirai Variant",
    severity: "medium",
    type: "Botnet",
    status: "monitoring",
    description: "New Mirai variant targeting smart home devices.",
    timestamp: "2024-08-13T11:10:00Z",
    affectedRegions: ["Asia-Pacific", "Europe"]
  },
  {
    id: 10,
    title: "Credential Stuffing Against E-commerce",
    severity: "medium",
    type: "Credential Stuffing",
    status: "mitigated",
    description: "Automated login attempts using leaked credentials.",
    timestamp: "2024-08-12T20:45:00Z",
    affectedRegions: ["North America"]
  },
  {
    id: 11,
    title: "Zero-Day Exploit in Windows Kernel",
    severity: "critical",
    type: "Zero-Day",
    status: "investigating",
    description: "Previously unknown vulnerability in Windows kernel.",
    timestamp: "2024-08-12T13:15:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 12,
    title: "Banking Trojan Campaign",
    severity: "high",
    type: "Malware",
    status: "active",
    description: "Banking trojan spreading through malicious email attachments.",
    timestamp: "2024-08-12T10:00:00Z",
    affectedRegions: ["Europe", "North America"]
  },
  {
    id: 13,
    title: "DDoS Attack on Financial Services",
    severity: "medium",
    type: "DDoS",
    status: "mitigated",
    description: "Coordinated DDoS attack targeting major banks.",
    timestamp: "2024-08-11T18:30:00Z",
    affectedRegions: ["North America"]
  },
  {
    id: 14,
    title: "Cryptomining Malware in Mobile Apps",
    severity: "low",
    type: "Cryptomining",
    status: "monitoring",
    description: "Hidden cryptocurrency miners in Android applications.",
    timestamp: "2024-08-11T14:45:00Z",
    affectedRegions: ["Asia-Pacific"]
  },
  {
    id: 15,
    title: "Insider Threat at Tech Company",
    severity: "high",
    type: "Insider Threat",
    status: "investigating",
    description: "Employee suspected of data exfiltration.",
    timestamp: "2024-08-11T09:20:00Z",
    affectedRegions: ["North America"]
  },
  {
    id: 16,
    title: "Watering Hole Attack on News Sites",
    severity: "medium",
    type: "Watering Hole",
    status: "patched",
    description: "Compromised news websites serving malware.",
    timestamp: "2024-08-10T16:00:00Z",
    affectedRegions: ["Europe"]
  },
  {
    id: 17,
    title: "Cloud Storage Misconfiguration",
    severity: "low",
    type: "Data Exposure",
    status: "resolved",
    description: "Publicly accessible S3 bucket containing sensitive data.",
    timestamp: "2024-08-10T12:30:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 18,
    title: "Advanced Persistent Threat - APT40",
    severity: "critical",
    type: "APT",
    status: "monitoring",
    description: "State-sponsored group targeting maritime industries.",
    timestamp: "2024-08-10T08:15:00Z",
    affectedRegions: ["Asia-Pacific", "Europe"]
  },
  {
    id: 19,
    title: "SQL Injection in Popular CMS",
    severity: "high",
    type: "Web Attack",
    status: "patched",
    description: "SQL injection vulnerability in WordPress plugin.",
    timestamp: "2024-08-09T19:45:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 20,
    title: "Business Email Compromise Scam",
    severity: "medium",
    type: "BEC",
    status: "investigating",
    description: "CEO impersonation targeting finance departments.",
    timestamp: "2024-08-09T15:20:00Z",
    affectedRegions: ["North America", "Europe"]
  },
  {
    id: 21,
    title: "Malicious Chrome Extension",
    severity: "low",
    type: "Browser Extension",
    status: "removed",
    description: "Extension stealing user browsing data.",
    timestamp: "2024-08-09T11:00:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 22,
    title: "State-Sponsored Espionage Campaign",
    severity: "critical",
    type: "Espionage",
    status: "active",
    description: "Foreign intelligence targeting defense contractors.",
    timestamp: "2024-08-08T14:30:00Z",
    affectedRegions: ["North America"]
  },
  {
    id: 23,
    title: "Ransomware-as-a-Service Platform",
    severity: "high",
    type: "RaaS",
    status: "monitoring",
    description: "New platform allowing anyone to deploy ransomware.",
    timestamp: "2024-08-08T10:15:00Z",
    affectedRegions: ["Global"]
  },
  {
    id: 24,
    title: "Mobile Banking App Vulnerability",
    severity: "medium",
    type: "Mobile Security",
    status: "patched",
    description: "Authentication bypass in popular banking app.",
    timestamp: "2024-08-07T17:45:00Z",
    affectedRegions: ["Asia-Pacific"]
  },
  {
    id: 25,
    title: "Deepfake Audio in Voice Phishing",
    severity: "low",
    type: "Vishing",
    status: "investigating",
    description: "AI-generated voice calls impersonating executives.",
    timestamp: "2024-08-07T13:20:00Z",
    affectedRegions: ["Europe", "North America"]
  }
];

// Helper functions to  use to calculate stats
export const calculateThreatStats = (threats) => {
  return {
    total: threats.length,
    critical: threats.filter(t => t.severity === 'critical').length,
    high: threats.filter(t => t.severity === 'high').length,
    medium: threats.filter(t => t.severity === 'medium').length,
    low: threats.filter(t => t.severity === 'low').length,
    active: threats.filter(t => t.status === 'active').length,
    investigating: threats.filter(t => t.status === 'investigating').length,
    monitoring: threats.filter(t => t.status === 'monitoring').length,
    resolved: threats.filter(t => t.status === 'resolved' || t.status === 'patched' || t.status === 'mitigated' || t.status === 'removed').length
  };
};

// Example of how to use it:
// const stats = calculateThreatStats(mockThreats);
// console.log(`Total: ${stats.total}, Critical: ${stats.critical}, Active: ${stats.active}`);