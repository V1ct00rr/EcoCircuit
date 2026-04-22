import React from 'react';
import '../styles/ComponentCard.css';

/**
 * Componente ComponentCard
 * 
 * Card reutilizável para exibir componentes de energia com:
 * - Ícone visual
 * - Nome do componente
 * - Modelo real do componente
 * - Potência/Capacidade
 * - Controles de quantidade (+/-)
 * - Cálculo de potência total
 * 
 * Props:
 * - component (object): Objeto completo do componente com id, name, icon, power, watts, model, description
 * - quantity (number): Quantidade selecionada do componente
 * - onQuantityChange (function): Callback ao alterar quantidade
 */
function ComponentCard({ 
  component,
  quantity = 0,
  onQuantityChange
}) {
  const categoryColors = {
    fonte: 'card-fonte',
    energia: 'card-energia',
    consumo: 'card-consumo'
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onQuantityChange(value);
    }
  };

  const totalWatts = component.watts * quantity;

  return (
    <div className={`component-card ${categoryColors[component.category]} ${quantity > 0 ? 'selected' : ''}`}>
      <div className="card-header">
        <div className="component-icon">{component.icon}</div>
        <div className="component-info">
          <h4 className="component-name">{component.name}</h4>
          <p className="component-power">{component.power}</p>
          <p className="component-model">{component.model}</p>
          <p className="component-description">{component.description}</p>
        </div>
      </div>

      <div className="card-controls">
        <div className="quantity-controls">
          <button 
            className="btn-quantity btn-minus"
            onClick={handleDecrement}
            disabled={quantity === 0}
            aria-label="Diminuir quantidade"
            title="Diminuir quantidade"
          >
            −
          </button>
          
          <input 
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={handleInputChange}
            min="0"
            aria-label="Quantidade"
            title="Digite a quantidade desejada"
          />
          
          <button 
            className="btn-quantity btn-plus"
            onClick={handleIncrement}
            aria-label="Aumentar quantidade"
            title="Aumentar quantidade"
          >
            +
          </button>
        </div>

        {quantity > 0 && (
          <div className="total-power">
            <span className="total-label">Total:</span>
            <span className="total-value">{totalWatts}W</span>
            {quantity > 1 && (
              <span className="calculation">({component.watts}W × {quantity})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComponentCard;
