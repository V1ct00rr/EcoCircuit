import React from 'react';
import '../styles/ComponentCard.css';

/**
 * Componente ComponentCard
 * 
 * Card reutilizável para exibir componentes de energia com:
 * - Ícone visual
 * - Nome do componente
 * - Potência/Capacidade
 * - Interatividade (hover, clique)
 * 
 * Props:
 * - id (string): Identificador único do componente
 * - name (string): Nome do componente
 * - icon (string): Emoji ou símbolo representativo
 * - power (string): Potência/Capacidade do componente
 * - category (string): Categoria ('fonte', 'energia', 'consumo')
 * - onClick (function): Callback ao clicar no card
 * - selected (boolean): Se o componente está selecionado
 */
function ComponentCard({ 
  id, 
  name, 
  icon, 
  power, 
  category = 'fonte',
  onClick,
  selected = false 
}) {
  const categoryColors = {
    fonte: 'card-fonte',
    energia: 'card-energia',
    consumo: 'card-consumo'
  };

  return (
    <div 
      className={`component-card ${categoryColors[category]} ${selected ? 'selected' : ''}`}
      onClick={() => onClick && onClick(id)}
      role="button"
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick(id);
        }
      }}
      aria-label={`${name}, ${power}`}
    >
      <div className="component-icon">{icon}</div>
      <div className="component-info">
        <h4 className="component-name">{name}</h4>
        <p className="component-power">{power}</p>
      </div>
      {selected && (
        <div className="component-selected-badge">
          <span className="badge-icon">✓</span>
        </div>
      )}
    </div>
  );
}

export default ComponentCard;
