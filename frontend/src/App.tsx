import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="kael-system-app">
      <header className="header">
        <h1>KAEL System</h1>
      </header>
      <div className="main-layout">
        <nav className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Sites</li>
            <li>Alerts</li>
            <li>GitHub</li>
            <li>SEO</li>
            <li>Settings</li>
          </ul>
        </nav>
        <section className="content">
          <h2>Tableau récapitulatif</h2>
          <p>Ajoutez ici le tableau des sites supervisés.</p>
          {/* Détails du site sélectionné s'affichent ici */}
        </section>
      </div>
    </div>
  );
};

export default App;
