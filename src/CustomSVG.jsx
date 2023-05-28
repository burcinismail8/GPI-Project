import React, { useState } from "react";

const CustomSvgFigure = () => {
  const circleRadius = 100;
  const lineLength = 100;
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
        x1={position.x}
        y1={position.y - lineHeight / 2}
        x2={position.x}
        y2={position.y + lineHeight / 2}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={position.x}
        y1={position.y}
        x2={position.x + lineLength}
        y2={position.y}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CustomSvgFigure;
