import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComponentPanel from './components/ComponentPanel';
import DiagramArea from './components/DiagramArea';
import ImpactPanel from './components/ImpactPanel';
import './App.css';

/**
 * Componente Principal - App
 * 
 * Gerencia a lógica principal do simulador EcoCircuit:
 * - Estado dos componentes selecionados
 * - Cálculo de potência e consumo
 * - Requisição de dados de impacto
 * - Aplicação das Heurísticas de Nielsen
 */
function App() {
  // Estado dos componentes
  const [selectedComponents, setSelectedComponents] = useState([]);
  // Os estados impactData e isLoadingImpact serão gerenciados pelo Integrante 3

  // Dados dos componentes disponíveis
  const energySources = [
    { id: 'solar', name: 'Placa Solar', icon: '☀️', power: '300W', category: 'fonte', watts: 300 },
    { id: 'wind', name: 'Turbina Eólica', icon: '💨', power: '500W', category: 'fonte', watts: 500 },
    { id: 'biomass', name: 'Gerador Biomassa', icon: '🌾', power: '400W', category: 'fonte', watts: 400 },
    { id: 'hydro', name: 'Energia Hídrica', icon: '💧', power: '600W', category: 'fonte', watts: 600 },
    { id: 'geothermal', name: 'Energia Geotérmica', icon: '🔥', power: '550W', category: 'fonte', watts: 550 },
  ];

  const energyStorage = [
    { id: 'lithium', name: 'Banco de Baterias Lítio', icon: '🔋', power: '200W', category: 'energia', watts: 200 },
    { id: 'stationary', name: 'Banco de Baterias Estacionárias', icon: '📦', power: '250W', category: 'energia', watts: 250 },
    { id: 'supercap', name: 'Supercapacitores', icon: '⚡', power: '150W', category: 'energia', watts: 150 },
    { id: 'hydrogen', name: 'Célula de Hidrogênio', icon: '💨', power: '300W', category: 'energia', watts: 300 },
  ];

  const consumptionPoints = [
    { id: 'led', name: 'Iluminação Pública LED', icon: '💡', power: '100W', category: 'consumo', watts: 100 },
    { id: 'ac', name: 'Sistema de Ar-Condicionado', icon: '❄️', power: '800W', category: 'consumo', watts: 800 },
    { id: 'outlet', name: 'Tomadas de Uso Geral', icon: '🔌', power: '500W', category: 'consumo', watts: 500 },
  ];

  // Calcular potência total e consumo
  const calculatePowerMetrics = () => {
    let totalGeneration = 0;
    let totalConsumption = 0;

    selectedComponents.forEach(component => {
      if (component.category === 'fonte' || component.category === 'energia') {
        totalGeneration += component.watts;
      } else if (component.category === 'consumo') {
        totalConsumption += component.watts;
      }
    });

    return { totalGeneration, totalConsumption };
  };

  const { totalGeneration, totalConsumption } = calculatePowerMetrics();

  // A lógica de busca e cálculo de dados de impacto será implementada pelo Integrante 3
  // Por enquanto, os dados de impacto são nulos e o carregamento é falso.
  const impactData = null;
  const isLoadingImpact = false;

  // Manipular seleção de componentes
  const handleComponentSelect = (componentId) => {
    // Buscar o componente em todas as listas
    let component = null;
    
    if (energySources.find(c => c.id === componentId)) {
      component = energySources.find(c => c.id === componentId);
    } else if (energyStorage.find(c => c.id === componentId)) {
      component = energyStorage.find(c => c.id === componentId);
    } else if (consumptionPoints.find(c => c.id === componentId)) {
      component = consumptionPoints.find(c => c.id === componentId);
    }

    if (component) {
      // Verificar se já está selecionado
      const isSelected = selectedComponents.some(c => c.id === componentId);
      
      if (isSelected) {
        // Remover
        setSelectedComponents(selectedComponents.filter(c => c.id !== componentId));
      } else {
        // Adicionar
        setSelectedComponents([...selectedComponents, component]);
      }
    }
  };

  // Reset do circuito
  const handleReset = () => {
    setSelectedComponents([]);
    // setImpactData(null); // Integrante 3 irá gerenciar isso
  };

  const selectedIds = selectedComponents.map(c => c.id);

  return (
    <div className="app-container">
      <Header 
        title="EcoCircuit"
        subtitle="Simulador de Automação Energética Sustentável"
      />

      <main className="app-main">
        <div className="app-layout">
          {/* Painel Esquerdo - Componentes */}
          <aside className="sidebar-left">
            <div className="sidebar-content">
              <ComponentPanel
                title="Fontes de Energia"
                categoryIcon="⚡"
                categoryColor="fonte"
                components={energySources}
                onComponentSelect={handleComponentSelect}
                selectedComponents={selectedIds}
              />

              <ComponentPanel
                title="Bancos de Energia"
                categoryIcon="🔋"
                categoryColor="energia"
                components={energyStorage}
                onComponentSelect={handleComponentSelect}
                selectedComponents={selectedIds}
              />

              <ComponentPanel
                title="Pontos de Consumo"
                categoryIcon="💡"
                categoryColor="consumo"
                components={consumptionPoints}
                onComponentSelect={handleComponentSelect}
                selectedComponents={selectedIds}
              />
            </div>
          </aside>

          {/* Centro - Área de Diagrama */}
          <section className="main-content">
            <DiagramArea
              selectedComponents={selectedComponents}
              onReset={handleReset}
              isValid={totalGeneration >= totalConsumption && totalConsumption > 0}
              totalPower={totalGeneration}
              totalConsumption={totalConsumption}
            />
          </section>
        </div>

        {/* Painel Inferior - Impacto Ambiental */}
        <section className="impact-section">
          <ImpactPanel
            co2Reduction={impactData?.co2Reduction || 0}
            energySavings={impactData?.energySavings || 0}
            efficiency={impactData?.efficiency || 0}
            isLoading={isLoadingImpact}
            hasData={impactData !== null}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>EcoCircuit © 2026 - Educação em Energia Limpa e Sustentável | ODS 7</p>
      </footer>
    </div>
  );
}

export default App;
