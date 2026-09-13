import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SiteDetail from './components/SiteDetail';
import './App.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'site'>('dashboard');
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  // Données de démonstration pour les sites
  const sitesData = [
    {
      id: '1',
      name: 'Mon Site Principal',
      url: 'https://monsite.fr',
      status: 'online',
      uptime: 99.9,
      lastCheck: 'Il y a 5 minutes',
      alerts: 0,
      techStack: 'React + Node.js'
    },
    {
      id: '2',
      name: 'Blog Personnel',
      url: 'https://blog.fr',
      status: 'offline',
      uptime: 85.2,
      lastCheck: 'Il y a 1 heure',
      alerts: 2,
      techStack: 'WordPress'
    },
    {
      id: '3',
      name: 'E-commerce',
      url: 'https://boutique.fr',
      status: 'warning',
      uptime: 95.7,
      lastCheck: 'Il y a 10 minutes',
      alerts: 1,
      techStack: 'Shopify'
    }
  ];

  const handleSiteSelect = (siteId: string) => {
    setSelectedSite(siteId);
    setCurrentView('site');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSite(null);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          {currentView === 'dashboard' ? (
            <Dashboard 
              sites={sitesData} 
              onSiteSelect={handleSiteSelect} 
            />
          ) : (
            selectedSite && (
              <SiteDetail 
                siteId={selectedSite} 
                onBack={handleBackToDashboard} 
              />
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default App;