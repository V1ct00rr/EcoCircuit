import React from 'react';
import '../styles/DiagramArea.css';

/**
 * Componente DiagramArea
 * 
 * Área interativa para montagem do circuito com:
 * - Zona de drop para componentes
 * - Visualização de componentes adicionados com quantidades
 * - Cálculo detalhado de potência por componente
 * - Cálculo de consumo em kWh
 * - Feedback visual de status
 * - Botão de reset
 * 
 * Props:
 * - selectedComponents (array): Componentes selecionados com quantidade e totalWatts
 * - energyData (object): Dados de consumo em kWh por categoria
 * - onReset (function): Callback para limpar o diagrama
 * - isValid (boolean): Se o circuito está válido
 * - totalPower (number): Potência total gerada
 * - totalConsumption (number): Consumo total
 */
function DiagramArea({ 
  selectedComponents = [],
  energyData = { sources: [], storage: [], consumption: [] },
  dailyTotals = { totalGenerationPerDay: 0, totalConsumptionPerDay: 0, totalStoragePerDay: 0, balance: 0 },
  onReset,
  isValid = false,
  totalPower = 0,
  totalConsumption = 0
}) {
  const isCircuitComplete = selectedComponents.length > 0 && (energyData.sources.length > 0 || energyData.consumption.length > 0);
  const isPowerSufficient = totalPower >= totalConsumption && totalConsumption > 0;

  // Agrupar componentes por categoria
  const groupedComponents = {
    fonte: selectedComponents.filter(c => c.category === 'fonte'),
    energia: selectedComponents.filter(c => c.category === 'energia'),
    consumo: selectedComponents.filter(c => c.category === 'consumo')
  };

  const renderComponentGroup = (title, icon, components, energyItems) => {
    if (components.length === 0) return null;

    // SOMA CORRETA: todos os componentes do grupo
    const groupTotal = components.reduce((sum, c) => sum + c.totalWatts, 0);
    const groupTotalKwh = energyItems.reduce((sum, c) => sum + parseFloat(c.kwhPerHour || 0), 0).toFixed(3);
    const groupTotalKwhPerDay = energyItems.reduce((sum, c) => sum + parseFloat(c.kwhPerDay || 0), 0).toFixed(2);

    return (
      <div key={title} className={`component-group group-${title.toLowerCase()}`}>
        <div className="group-header">
          <span className="group-icon">{icon}</span>
          <h4 className="group-title">{title}</h4>
          <div className="group-totals">
            <span className="group-total">{groupTotal}W</span>
            <span className="group-kwh">{groupTotalKwh} kWh/h</span>
            <span className="group-kwh-day">{groupTotalKwhPerDay} kWh/d</span>
          </div>
        </div>
        <div className="group-items">
          {energyItems.map((component, index) => (
            <div key={index} className="component-item">
              <div className="item-left">
                <span className="item-icon">{component.icon}</span>
                <div className="item-info">
                  <p className="item-name">{component.name}</p>
                  <p className="item-model">{component.model}</p>
                </div>
              </div>
              <div className="item-right">
                <div className="item-calculation">
                  {component.quantity > 1 && (
                    <span className="calculation-formula">
                      {component.watts}W × {component.quantity}
                    </span>
                  )}
                  <span className="item-total">{component.totalWatts}W</span>
                  <span className="item-kwh">{component.kwhPerHour} kWh/h</span>
                  <span className="item-kwh-day">{component.kwhPerDay} kWh/d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="diagram-area-container">
      <div className="diagram-wrapper">


        {/* Centro - Diagrama */}
        <div className="diagram-main">
          <div className="diagram-header">
            <h2 className="diagram-title">Monte seu Circuito</h2>
            <button 
              className="btn btn-outline-secondary btn-sm reset-btn-header"
              onClick={onReset}
              title="Limpar o circuito e começar novamente"
            >
              <span className="reset-icon">↻</span> Reiniciar
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
                <span className="step-text">Escolha uma ou mais fontes de energia</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span className="step-text">Adicione bancos de energia (opcional)</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span className="step-text">Conecte um ou mais pontos de consumo</span>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <span className="step-text">Ajuste as quantidades para balancear o circuito</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="components-display">
            <div className="components-groups">
              {renderComponentGroup('Fontes de Energia', '⚡', groupedComponents.fonte, energyData.sources)}
              {renderComponentGroup('Bancos de Energia', '🔋', groupedComponents.energia, energyData.storage)}
              {renderComponentGroup('Pontos de Consumo', '💡', groupedComponents.consumo, energyData.consumption)}
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

          {/* Seção de Informações de kWh/dia */}
          <div className="diagram-daily-info">
            <div className="daily-header">
              <h3>Geração e Consumo Diário</h3>
            </div>
            <div className="daily-grid">
              <div className="daily-item generation">
                <span className="daily-label">Geração/Dia</span>
                <span className="daily-value">{dailyTotals.totalGenerationPerDay} kWh</span>
                <span className="daily-unit">por dia</span>
              </div>
              <div className="daily-item consumption">
                <span className="daily-label">Consumo/Dia</span>
                <span className="daily-value">{dailyTotals.totalConsumptionPerDay} kWh</span>
                <span className="daily-unit">por dia</span>
              </div>
              <div className={`daily-item balance ${parseFloat(dailyTotals.balance) >= 0 ? 'positive' : 'negative'}`}>
                <span className="daily-label">Saldo/Dia</span>
                <span className="daily-value">{dailyTotals.balance} kWh</span>
                <span className="daily-unit">{parseFloat(dailyTotals.balance) >= 0 ? 'Excedente' : 'Deficit'}</span>
              </div>
            </div>

            {/* Detalhamento por Tipo de Energia */}
            {energyData.sources.length > 0 && (
              <div className="daily-breakdown">
                <h4>Geração por Tipo de Energia</h4>
                <div className="breakdown-list">
                  {energyData.sources.map((source, idx) => (
                    <div key={idx} className="breakdown-item">
                      <span className="breakdown-icon">{source.icon}</span>
                      <span className="breakdown-name">{source.name}</span>
                      <span className="breakdown-value">{source.kwhPerDay} kWh/dia</span>
                      <span className="breakdown-formula">({source.quantity}un.)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detalhamento de Consumo */}
            {energyData.consumption.length > 0 && (
              <div className="daily-breakdown">
                <h4>Consumo por Dispositivo</h4>
                <div className="breakdown-list">
                  {energyData.consumption.map((consumption, idx) => (
                    <div key={idx} className="breakdown-item">
                      <span className="breakdown-icon">{consumption.icon}</span>
                      <span className="breakdown-name">{consumption.name}</span>
                      <span className="breakdown-value">{consumption.kwhPerDay} kWh/dia</span>
                      <span className="breakdown-formula">({consumption.quantity}un.)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Seção de Armazenamento e Desperdício */}
            <div className="daily-grid">
              <div className="daily-card storage-info">
                <h4>Armazenado</h4>
                <span className="daily-value storage">{dailyTotals.stored} kWh</span>
                <span className="daily-label">por dia</span>
              </div>
              <div className="daily-card wasted-info">
                <h4>Desperdiçado</h4>
                <span className="daily-value wasted">{dailyTotals.wasted} kWh</span>
                <span className="daily-label">por dia</span>
              </div>
              <div className="daily-card capacity-info">
                <h4>Capacidade Bateria</h4>
                <span className="daily-value capacity">{dailyTotals.totalStorageCapacity} kWh</span>
                <span className="daily-label">total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DiagramArea;
