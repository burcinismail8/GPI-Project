import React, { useState } from "react";

const CustomSVGOne = () => {
  const circleRadius = 140;
  const lineLength = 200;
  const lineHeight = 200;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const drag = (event) => {
    if (isDragging) {
      const newPosX = event.clientX - offset.x;
      const newPosY = event.clientY - offset.y;
      setPosition({ x: newPosX, y: newPosY });
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const line1X1 = position.x - lineLength / 2;
  const line1Y1 = position.y - lineHeight / 2;
  const line1X2 = position.x + lineLength / 2;
  const line1Y2 = position.y + lineHeight / 2;

  const line2X1 = position.x - lineLength / 2;
  const line2Y1 = position.y + lineHeight / 2;
  const line2X2 = position.x + lineLength / 2;
  const line2Y2 = position.y - lineHeight / 2;

  return (
    <svg onMouseMove={drag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      <circle
        cx={position.x}
        cy={position.y}
        r={circleRadius}
        fill="lightblue"
        onMouseDown={startDrag}
      />
      <line
        x1={line1X1}
        y1={line1Y1}
        x2={line1X2}
        y2={line1Y2}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={line2X1}
        y1={line2Y1}
        x2={line2X2}
        y2={line2Y2}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CustomSVGOne;
