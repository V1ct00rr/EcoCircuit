import React from 'react';
import '../styles/DiagramArea.css';

/**
 * Componente DiagramArea
 * 
 * Área interativa para montagem do circuito com:
 * - Zona de drop para componentes
 * - Visualização de componentes adicionados
 * - Feedback visual de status
 * - Botão de reset
 * 
 * Props:
 * - selectedComponents (array): Componentes selecionados
 * - onReset (function): Callback para limpar o diagrama
 * - isValid (boolean): Se o circuito está válido
 * - totalPower (number): Potência total gerada
 * - totalConsumption (number): Consumo total
 */
function DiagramArea({ 
  selectedComponents = [],
  onReset,
  isValid = false,
  totalPower = 0,
  totalConsumption = 0
}) {
  const isCircuitComplete = selectedComponents.length > 0;
  const isPowerSufficient = totalPower >= totalConsumption && totalConsumption > 0;

  return (
    <div className="diagram-area-container">
      <div className="diagram-header">
        <h2 className="diagram-title">Monte seu Circuito</h2>
        <button 
          className="btn btn-outline-secondary btn-sm reset-btn"
          onClick={onReset}
          title="Limpar o circuito e começar novamente"
        >
          <span className="reset-icon">↻</span> Reset
        </button>
      </div>

      <div className={`diagram-canvas ${isCircuitComplete ? 'has-components' : 'empty'}`}>
        {!isCircuitComplete ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <h3>Comece a Montar seu Circuito</h3>
            <p>Selecione componentes de energia, armazenamento e consumo no painel esquerdo</p>
            <div className="instruction-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span className="step-text">Escolha uma fonte de energia</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span className="step-text">Adicione um banco de energia (opcional)</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span className="step-text">Conecte um ponto de consumo</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="components-display">
            <div className="components-grid">
              {selectedComponents.map((component, index) => (
                <div key={index} className="component-display-item">
                  <div className="component-display-icon">{component.icon}</div>
                  <div className="component-display-info">
                    <p className="component-display-name">{component.name}</p>
                    <p className="component-display-power">{component.power}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`circuit-status ${isPowerSufficient ? 'valid' : 'invalid'}`}>
              <div className="status-indicator"></div>
              <div className="status-text">
                <p className="status-label">Status do Circuito</p>
                <p className="status-value">
                  {isPowerSufficient ? '✓ Circuito Válido' : '⚠ Potência Insuficiente'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="diagram-info">
        <div className="info-item">
          <span className="info-label">Potência Gerada:</span>
          <span className="info-value">{totalPower}W</span>
        </div>
        <div className="info-divider"></div>
        <div className="info-item">
          <span className="info-label">Consumo:</span>
          <span className="info-value">{totalConsumption}W</span>
        </div>
        <div className="info-divider"></div>
        <div className="info-item">
          <span className="info-label">Saldo:</span>
          <span className={`info-value ${totalPower >= totalConsumption ? 'positive' : 'negative'}`}>
            {totalPower - totalConsumption}W
          </span>
        </div>
      </div>
    </div>
  );
}

export default DiagramArea;
