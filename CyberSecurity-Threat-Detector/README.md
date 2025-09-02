# CyberSentinel

A React-based cybersecurity dashboard displaying CISA's Known Exploited Vulnerabilities (KEV) catalog with real-time filtering, search, and export capabilities.


## Features

- **Real-time Data**: Fetches latest vulnerabilities from CISA's official API
- **Smart Filtering**: Filter by vendor/product and ransomware status
- **Search & Export**: Search across all fields and export results to CSV
- **Detailed Views**: Click CVE IDs for comprehensive vulnerability information
- **Responsive Design**: Works seamlessly on desktop and mobile

## Quick Start

```bash
# Clone and navigate to project
git clone https://github.com/tamilorea1/My-current-react-learning-projects.git
cd My-current-react-learning-projects/CyberSecurity-Threat-Detector
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` to view the application.


## Tech Stack
- **Frontend**: React 18, Redux Toolkit, CSS3
- **Backend**: Firebase Functions, Node.js
- **Data Source**: CISA KEV API

## Project Structure
```
src/
├── components/         # React components
├── store/              # Redux state management
├── hooks/              # Custom hooks (filtering logic)
├── utility/            # CSV export functionality
└── firebase.js         # Firebase configuration

functions/
└── index.js            # API endpoint for CISA data

```

## Key Components
- **StatsDashboard**: Displays vulnerability counts and critical metrics
- **FilteredSection**: Vendor and ransomware filtering controls
- **Results**: Search, pagination, and data table with modal details
- **useFilteredThreats**: Custom hook combining all filter logic


## Data Schema
The application expects CISA KEV format:
```javascript 
{
  cveID: "CVE-2023-1234",
  vendorProject: "Microsoft Windows",
  vulnerabilityName: "Buffer Overflow",
  dateAdded: "2023-10-01",
  dueDate: "2023-11-01",
  knownRansomwareCampaignUse: "Known"
}
```


## License
MIT License - see LICENSE file for details.

Built for the cybersecurity community using CISA's public vulnerability data.

