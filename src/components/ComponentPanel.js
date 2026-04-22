import React, { useState } from 'react';
import ComponentCard from './ComponentCard';
import '../styles/ComponentPanel.css';

/**
 * Componente ComponentPanel
 * 
 * Painel que agrupa componentes por categoria com:
 * - Título da categoria com ícone
 * - Lista de componentes (cards) com controle de quantidade
 * - Expansão/Colapso (responsivo)
 * - Scroll interno para listas grandes
 * 
 * Props:
 * - title (string): Título da categoria
 * - categoryIcon (string): Ícone da categoria
 * - categoryColor (string): Cor da categoria ('fonte', 'energia', 'consumo')
 * - components (array): Array de componentes
 * - onComponentSelect (function): Callback ao alterar quantidade (componentId, quantity)
 * - selectedComponents (object): Objeto com { componentId: quantity }
 */
function ComponentPanel({ 
  title, 
  categoryIcon, 
  categoryColor,
  components = [],
  onComponentSelect,
  selectedComponents = {}
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="component-panel">
      <div 
        className="panel-header"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={isExpanded}
      >
        <div className="panel-title-section">
          <span className="panel-icon">{categoryIcon}</span>
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className={`panel-toggle ${isExpanded ? 'expanded' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 8L10 11L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="panel-content">
          <div className="components-list">
            {components.length > 0 ? (
              components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  quantity={selectedComponents[component.id] || 0}
                  onQuantityChange={(quantity) => 
                    onComponentSelect(component.id, quantity)
                  }
                />
              ))
            ) : (
              <div className="empty-state">
                <p>Nenhum componente disponível</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentPanel;
