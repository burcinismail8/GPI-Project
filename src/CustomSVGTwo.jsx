import React, { useState } from "react";

const CustomSvgTwo = ({ currFigure, transform, onClick, strokeWidth }) => {
  const circleRadius = currFigure.size;
  const lineLength = 100;
  const lineHeight = 200;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: currFigure.x,
    y: currFigure.y,
  });
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
  const line1X2 = position.x - lineLength / 2;
  const line1Y2 = position.y + lineHeight / 2;

  const line2X1 = position.x + lineLength / 2;
  const line2Y1 = position.y - lineHeight / 2;
  const line2X2 = position.x + lineLength / 2;
  const line2Y2 = position.y + lineHeight / 2;

  return (
    <svg
      onClick={onClick}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      opacity={currFigure.opacity}
      rotate={currFigure.rotate}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r={circleRadius}
        fill={currFigure.color}
        onMouseDown={startDrag}
        strokeWidth={strokeWidth}
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
export default CustomSvgTwo;
