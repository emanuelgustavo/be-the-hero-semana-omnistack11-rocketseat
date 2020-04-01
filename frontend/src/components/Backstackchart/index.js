import React from 'react';

import './styles.css';

export default function Barstackchart() {

  const data = [10, 7, 2]; //(casos em aberto, casos resolvidos, casos expirados)
  const sectorColor = ['#f0f', '#abc', '#ff3'];

  const totalDataValue = data.reduce((total, value) => total += value);
  
  let sectorWidth = data.map(value => {
    return String(((value / totalDataValue)*100)+"%");
  });

  return (
    <div className="chart-bar">
      {sectorWidth.map((value, index) => {
        return (
          <div key={index}
            style={{
              width: sectorWidth[index],
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: sectorColor[index]
            }}
          >
            {value}
          </div>
        )
      })
      }
    </div>
  );
}