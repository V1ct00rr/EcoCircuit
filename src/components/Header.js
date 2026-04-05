import React from 'react';
import '../styles/Header.css';

/**
 * Componente Header
 * 
 * Exibe o cabeçalho da aplicação com:
 * - Logo do projeto
 * - Título "EcoCircuit"
 * - Subtítulo com descrição
 * 
 * Props:
 * - title (string): Título principal (padrão: "EcoCircuit")
 * - subtitle (string): Subtítulo descritivo
 */
function Header({ title = "EcoCircuit", subtitle = "Simulador de Automação Energética Sustentável" }) {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-logo-section">
          <img src="/logo192.png" alt="EcoCircuit Logo" className="header-logo" />
          <div className="header-text">
            <h1 className="header-title">{title}</h1>
            <p className="header-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
