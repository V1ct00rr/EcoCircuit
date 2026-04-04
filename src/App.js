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