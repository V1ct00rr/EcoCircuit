import React from 'react';
import '../styles/ImpactPanel.css';

/**
 * Componente ImpactPanel
 * 
 * Painel de impacto ambiental que exibe:
 * - Redução de CO2
 * - Economia de energia
 * - Gráfico circular de eficiência
 * - Dados técnicos
 * 
 * Props:
 * - co2Reduction (number): Redução de CO2 em kg
 * - energySavings (number): Economia em kWh
 * - efficiency (number): Eficiência em porcentagem (0-100)
 * - isLoading (boolean): Se está carregando dados
 * - hasData (boolean): Se tem dados para exibir
 */
function ImpactPanel({ 
  co2Reduction = 0,
  energySavings = 0,
  efficiency = 0,
  isLoading = false,
  hasData = false
}) {
  return (
    <div className="impact-panel">
      <div className="impact-header">
        <h2 className="impact-title">Impacto Ambiental</h2>
        <span className="impact-badge">ODS 7</span>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Calculando impacto...</p>
        </div>
      ) : !hasData ? (
        <div className="empty-state">
          <div className="empty-icon">🌍</div>
          <p>Monte um circuito para ver o impacto ambiental</p>
        </div>
      ) : (
        <div className="impact-content">
          <div className="impact-metrics">
            <div className="metric-card">
              <div className="metric-icon">🌱</div>
              <div className="metric-info">
                <p className="metric-label">Redução de CO₂</p>
                <p className="metric-value">{co2Reduction.toFixed(2)} kg</p>
                <p className="metric-description">por ano</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">⚡</div>
              <div className="metric-info">
                <p className="metric-label">Economia de Energia</p>
                <p className="metric-value">{energySavings.toFixed(2)} kWh</p>
                <p className="metric-description">por ano</p>
              </div>
            </div>
          </div>

          <div className="efficiency-section">
            <div className="efficiency-chart">
              <svg viewBox="0 0 100 100" className="circular-progress">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(76, 175, 80, 0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="8"
                  strokeDasharray={`${efficiency * 2.827} 282.7`}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div className="efficiency-text">
                <p className="efficiency-value">{efficiency.toFixed(0)}%</p>
                <p className="efficiency-label">Eficiência</p>
              </div>
            </div>

            <div className="efficiency-description">
              <p>Seu circuito está operando com <strong>{efficiency.toFixed(0)}%</strong> de eficiência energética.</p>
              <p className="efficiency-tip">💡 Dica: Adicione mais fontes de energia para aumentar a eficiência!</p>
            </div>
          </div>

          <div className="impact-benefits">
            <h3 className="benefits-title">Benefícios da Energia Limpa</h3>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">✓</span>
                <span>Reduz emissões de gases de efeito estufa</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Diminui custos operacionais a longo prazo</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Contribui para a sustentabilidade ambiental</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Promove independência energética</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImpactPanel;
