import React from 'react';

import './styles.css';

export default function Barstackchart(props) {

  const data = props.data; //(casos em aberto, casos resolvidos, casos expirados)
  const sectorValue = [data.open, data.solved, data.notSolved];
  const sectorText = [
    data.open === 1 ? 'caso aberto' : 'casos abertos',
    data.solved === 1 ? 'caso resolvido' : 'casos resolvidos',
    data.notSolved === 1 ? 'caso não resolvido' : 'casos não resolvidos'];
  const sectorColor = ['#626266', '#069471', '#000'];
  const sectorWidth = [];

  sectorWidth.push(data.open / data.count * 100);
  sectorWidth.push(data.solved / data.count * 100);
  sectorWidth.push(data.notSolved / data.count * 100);

  return (
    <div className="chart-bar">
      {
        sectorWidth.map((value, index) => {
        return (
          <div key={index}
            style={{
              width: value+'%',
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: sectorColor[index],
              color: '#fff'
            }}
          >{sectorValue[index] !== 0 &&
            `${sectorValue[index]} ${sectorText[index]}`
          }            
          </div>
        )
      })
      }
    </div>
  );
}