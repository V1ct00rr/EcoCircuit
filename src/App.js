<<<<<<< HEAD
import React from "react";
import './App.css';

function App(){

  return (
    
    <div className="container1">
      <header> {/* Titulo */}
        <h1>EcoCircuit</h1>
      </header> 
   
      <div className="layout-horizontal">

        <div className="containerFerramentas">
          
          <h2 className="containerFonte">FONTES</h2>

          <div>

            <li>
              Placa Solar
            </li>

            <li>
              Turbina Eólica
            </li>

            <li>
              Gerador Biomassa
            </li>

            <li>
              Energia Hídrica
            </li>

            <li>
              Energia Geotérmica
            </li>

          </div>

          <h2 className="containerEnergia">Bancos de Energia</h2>

          <div>

            <li>
              Banco de Baterias Lítio
            </li>

            <li>
              Banco de Baterias Estacionárias
            </li>

            <li>
              Supercapacitores
            </li>

            <li>
              Célula de Hidrogênio
            </li>

          </div>

          <h2 className="containerConsumo">Pontos de Consumo</h2>

          <div>

            <li>
              Iluminação Pública LED
            </li>

            <li>
              Sistema de Ar-Condicionado
            </li>

            <li>
              Tomadas de Uso Geral
            </li>

          </div>

        </div>


        <div className="containerDiagrama">
          <h2>Monte seu Diagrama</h2>


        </div>

      </div>

      <div className="containerDados">
        <div className="info-dados">
          <h2>Dados do Consumo</h2>
          <p>Geração Total: 0W</p>
          <p>Consumo Atual: 0W</p>
          <p>Status: Estável</p>
        </div>

  
        <div className="grafico-circular">
          <div className="circulo-interno">
            <span>75%</span>
          </div>
        </div>
      
      </div>


    

    </div>

  );



}
export default App;
=======
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ComponentPanel from './components/ComponentPanel';
import DiagramArea from './components/DiagramArea';
import ImpactPanel from './components/ImpactPanel';

function App() {
  // Estado dos componentes selecionados
  const [selectedComponents, setSelectedComponents] = useState({});

  // Definição dos componentes disponíveis
  const componentData = {
    fonte: [
      {
        id: 'solar',
        name: 'Placa Solar',
        watts: 300,
        power: 300,
        model: 'Canadian Solar CSI-300P',
        description: 'Painel Solar Monocristalino 300W',
        icon: '☀️',
        category: 'fonte'
      },
      {
        id: 'wind',
        name: 'Turbina Eólica',
        watts: 500,
        power: 500,
        model: 'VEVOR 500W Wind Turbine',
        description: 'Turbina Eólica Vertical 500W',
        icon: '💨',
        category: 'fonte'
      },
      {
        id: 'biomass',
        name: 'Gerador Biomassa',
        watts: 400,
        power: 400,
        model: 'Gerador Biomassa Modular 400W',
        description: 'Gerador de Biomassa 400W',
        icon: '🌱',
        category: 'fonte'
      },
      {
        id: 'hydro',
        name: 'Energia Hídrica',
        watts: 600,
        power: 600,
        model: 'Micro Hidroelétrica 600W',
        description: 'Micro Hidroelétrica 600W',
        icon: '💧',
        category: 'fonte'
      },
      {
        id: 'geothermal',
        name: 'Energia Geotérmica',
        watts: 550,
        power: 550,
        model: 'Gerador Geotérmico ORC 550W',
        description: 'Gerador Geotérmico 550W',
        icon: '🌋',
        category: 'fonte'
      }
    ],
    energia: [
      {
        id: 'battery',
        name: 'Banco de Baterias Lítio',
        watts: 200,
        power: 200,
        model: 'Bateria LiFePO4 48V 100Ah',
        description: 'Bateria de Lítio 200W',
        icon: '🔋',
        category: 'energia'
      },
      {
        id: 'battery2',
        name: 'Banco de Baterias Estacionária',
        watts: 300,
        power: 300,
        model: 'Bateria Estacionária 48V 200Ah',
        description: 'Bateria Estacionária 300W',
        icon: '🔋',
        category: 'energia'
      }
    ],
    consumo: [
      {
        id: 'fridge',
        name: 'Geladeira',
        watts: 60,
        power: 60,
        model: 'Refrigerador Frost-Free 400L',
        description: 'Geladeira 60W',
        icon: '🧊',
        category: 'consumo'
      },
      {
        id: 'washer',
        name: 'Hora de Lavar Roupa',
        watts: 60,
        power: 60,
        model: 'Máquina de Lavar 8kg Inverter',
        description: 'Máquina de Lavar 60W',
        icon: '🧺',
        category: 'consumo'
      },
      {
        id: 'shower',
        name: 'Chuveiro Elétrico',
        watts: 100,
        power: 100,
        model: 'Chuveiro Elétrico 5500W Digital',
        description: 'Chuveiro Elétrico 100W',
        icon: '🚿',
        category: 'consumo'
      },
      {
        id: 'outlets',
        name: 'Tomadas de Uso Geral',
        watts: 200,
        power: 200,
        model: 'Outlet Panel 200W 220V',
        description: 'Tomadas 200W',
        icon: '🔌',
        category: 'consumo'
      },
      {
        id: 'led',
        name: 'LED público',
        watts: 100,
        power: 100,
        model: 'Luminária de rua LED 100W 6500K',
        description: 'LED 100W',
        icon: '💡',
        category: 'consumo'
      }
    ]
  };

  // Atualizar quantidade de um componente - FORÇA RECÁLCULO IMEDIATO
  const updateComponentQuantity = (componentId, quantity) => {
    setSelectedComponents(prev => {
      const newState = { ...prev };
      if (quantity <= 0) {
        delete newState[componentId];
      } else {
        newState[componentId] = quantity;
      }
      // Força recálculo de todas as métricas
      return { ...newState };
    });
  };

  // Obter lista de componentes selecionados com dados completos
  const getSelectedComponentsList = () => {
    const list = [];
    Object.keys(selectedComponents).forEach(componentId => {
      const quantity = selectedComponents[componentId];
      if (quantity > 0) {
        // Procurar o componente em todas as categorias
        for (const category in componentData) {
          const component = componentData[category].find(c => c.id === componentId);
          if (component) {
            const item = {
              ...component,
              quantity,
              totalWatts: component.watts * quantity
            };
            list.push(item);
            console.log(`DEBUG getSelectedComponentsList: ${component.name} - quantity: ${quantity}, totalWatts: ${item.totalWatts}`);
            break;
          }
        }
      }
    });
    console.log('DEBUG selectedComponents state:', selectedComponents);
    console.log('DEBUG getSelectedComponentsList result:', list);
    return list;
  };

  // Calcular métricas de potência - SOMA TODAS AS FONTES
  const calculatePowerMetrics = () => {
    const selectedList = getSelectedComponentsList();
    
    // Somar TODAS as fontes de energia ativas
    const totalGeneration = selectedList
      .filter(c => c.category === 'fonte')
      .reduce((sum, c) => sum + c.totalWatts, 0);
    
    // Somar TODOS os consumos ativos
    const totalConsumption = selectedList
      .filter(c => c.category === 'consumo')
      .reduce((sum, c) => sum + c.totalWatts, 0);
    
    return { totalGeneration, totalConsumption };
  };

  // Forçar recálculo a cada mudança de seleção
  const { totalGeneration, totalConsumption } = calculatePowerMetrics();

  // Dados reais de geração média por dia (kWh/dia)
  // Baseado em dados comerciais e ambientais reais
  const energyGenerationPerDay = {
    solar: 1.35,      // Placa solar 300W: 1.2-1.5 kWh/dia (média: 1.35)
    wind: 3.0,        // Turbina eólica 500W: 2-4 kWh/dia (média: 3.0)
    biomass: 8.8,     // Gerador biomassa 400W: 7-10 kWh/dia (média: 8.8)
    hydro: 12.0,      // Energia hídrica 600W: 10-14 kWh/dia (média: 12.0)
    geothermal: 12.0  // Energia geotérmica 550W: 11-13 kWh/dia (média: 12.0)
  };

  // Calcular consumo de energia (kWh) por hora
  const calculateEnergyConsumption = () => {
    const selectedList = getSelectedComponentsList();
    const energySources = selectedList.filter(c => c.category === 'fonte');
    const energyStorage = selectedList.filter(c => c.category === 'energia');
    const consumptionList = selectedList.filter(c => c.category === 'consumo');

    const sourcesData = energySources.map(c => {
      const kwhPerHour = (c.totalWatts / 1000).toFixed(3);
      const kwhPerDayPerUnit = energyGenerationPerDay[c.id] || 8.0;
      const kwhPerDay = (kwhPerDayPerUnit * c.quantity).toFixed(2);
      return {
        ...c,
        kwhPerHour,
        kwhPerDay,
        kwhPerDayPerUnit
      };
    });

    const storageData = energyStorage.map(c => {
      const storageCapacityKwh = (c.totalWatts / 1000 * 24).toFixed(2);
      return {
        ...c,
        kwhPerHour: '0.000',
        kwhPerDay: storageCapacityKwh,
        isStorage: true
      };
    });

    const consumptionData = consumptionList.map(c => {
      const kwhPerHour = (c.totalWatts / 1000).toFixed(3);
      const kwhPerDay = (parseFloat(kwhPerHour) * 24).toFixed(2);
      return {
        ...c,
        kwhPerHour,
        kwhPerDay
      };
    });

    // CALCULAR TOTAIS AQUI DENTRO, COM DADOS ATUALIZADOS
    const totalGenerationPerDay = parseFloat(sourcesData.reduce((sum, c) => sum + parseFloat(c.kwhPerDay), 0).toFixed(2));
    const totalConsumptionPerDay = parseFloat(consumptionData.reduce((sum, c) => sum + parseFloat(c.kwhPerDay), 0).toFixed(2));
    const totalStorageCapacity = parseFloat(storageData.reduce((sum, c) => sum + parseFloat(c.kwhPerDay), 0).toFixed(2));
    const balance = totalGenerationPerDay - totalConsumptionPerDay;

    let stored = 0;
    let wasted = 0;
    if (balance > 0) {
      stored = Math.min(balance, totalStorageCapacity);
      wasted = balance > totalStorageCapacity ? balance - totalStorageCapacity : 0;
    } else if (balance < 0) {
      stored = Math.max(balance, -totalStorageCapacity);
      wasted = 0;
    }

    return {
      sources: sourcesData,
      storage: storageData,
      consumption: consumptionData,
      totals: {
        totalGenerationPerDay: totalGenerationPerDay.toFixed(2),
        totalConsumptionPerDay: totalConsumptionPerDay.toFixed(2),
        totalStorageCapacity: totalStorageCapacity.toFixed(2),
        stored: stored.toFixed(2),
        wasted: Math.max(0, wasted).toFixed(2),
        balance: balance.toFixed(2)
      }
    };
  };



  // Calcular energyData PRIMEIRO
  const energyDataCalculated = calculateEnergyConsumption();
  
  // TOTAIS JÁ ESTÃO CALCULADOS DENTRO DE calculateEnergyConsumption
  const dailyTotals = energyDataCalculated.totals;

  // A lógica de busca e cálculo de dados de impacto será implementada pelo Integrante 3
  const impactData = null;
  const isLoadingImpact = false;

  // Resetar circuito - LIMPA TUDO E FORÇA RECÁLCULO
  const handleReset = () => {
    setSelectedComponents({});
    // Força re-render imediato
  };

  return (
    <div className="app-container">
      <Header />

      <div className="app-layout">
        {/* Painel Lateral Esquerdo - Componentes */}
        <aside className="sidebar-left">
          <div className="sidebar-content">
            {/* Fontes de Energia */}
            <ComponentPanel
              title="Fontes de Energia"
              categoryIcon="⚡"
              categoryColor="fonte"
              components={componentData.fonte}
              selectedComponents={selectedComponents}
              onComponentSelect={updateComponentQuantity}
            />

            {/* Bancos de Energia */}
            <ComponentPanel
              title="Bancos de Energia"
              categoryIcon="🔋"
              categoryColor="energia"
              components={componentData.energia}
              selectedComponents={selectedComponents}
              onComponentSelect={updateComponentQuantity}
            />

            {/* Pontos de Consumo */}
            <ComponentPanel
              title="Pontos de Consumo"
              categoryIcon="💡"
              categoryColor="consumo"
              components={componentData.consumo}
              selectedComponents={selectedComponents}
              onComponentSelect={updateComponentQuantity}
            />
          </div>
        </aside>

        {/* Centro - Área de Diagrama */}
        <section className="main-content">
          <DiagramArea
            selectedComponents={getSelectedComponentsList()}
            energyData={energyDataCalculated}
            dailyTotals={dailyTotals}
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
          isLoading={isLoadingImpact}
          data={impactData}
          totalGeneration={totalGeneration}
          totalConsumption={totalConsumption}
        />
      </section>
    </div>
  );
}

export default App;
>>>>>>> f84a94b (fix: corrigir agregação de totais de geração e consumo diário)
