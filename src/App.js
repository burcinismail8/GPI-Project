import "./App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
function App() {
  const [figure, setFigure] = useState("Circle");
  const [rotate, setRotate] = useState(0);
  const [size, setSize] = useState(150);
  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState("#1ab6cb");
  const [allCreatedFigures, setAllCreatedFigures] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState({});
  const handleChange = (event) => {
    setFigure(event.target.value);
  };
  const addFigure = () => {
    const newFigure = {
      type: figure,
      id: Date.now(),
      name: "Figure " + (allCreatedFigures.length + 1),
      x: Math.floor(Math.random() * (window.innerWidth - 100 * 2)) + 30,
      y: Math.floor(Math.random() * (window.innerHeight - 100 * 2)) + 10,
      size: size,
      color: color,
      opacity: opacity,
      rotate: rotate,
      isEditing: false,
    };
    setAllCreatedFigures([...allCreatedFigures, newFigure]);
  };

  const deleteFigure = () => {
    console.log(selectedFigure.id);
  };

  return (
    <div className="h-screen">
      <nav className="flex flex-col lg:flex-row h-[30%] lg:h-[10%]">
        <div className="wrapper">
          <div>
            <label htmlFor="input-rotate">Rotate</label>
            <input
              id="input-rotate"
              type="range"
              className="range range-accent"
              min="0"
              max="360"
              step="10"
              value={rotate}
              onChange={(e) => setRotate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="input-size">Size</label>
            <input
              id="input-size"
              type="range"
              className="range range-accent"
              min="10"
              max="210"
              onChange={(e) => setSize(e.target.value)}
              value={size}
            />
          </div>
          <div>
            <label htmlFor="input-opacity">Opacity</label>
            <input
              id="input-opacity"
              type="range"
              className="range range-accent"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
            />
          </div>
          <div style={{ width: "100px" }}>
            <label htmlFor="input-color">Color</label>
            <input
              id="input-color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Figure</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={figure}
                label="Figure"
                onChange={handleChange}
              >
                <MenuItem value="Circle">Circle</MenuItem>
                <MenuItem value="Rectangle">Rectangle</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" onClick={addFigure}>
            Add
          </Button>
          <Button variant="contained" color="error" onClick={deleteFigure}>
            Delete
          </Button>
          <Button variant="contained" color="success">
            Save
          </Button>
          <Button variant="contained" color="info">
            Load
          </Button>
        </div>
      </nav>
      <div className="flex justify-center h-[70%] lg:h-[90%]">
        <span className="w-[75%] lg:w-[90%]">
          <svg>
            {allCreatedFigures.map((currFigure) => {
              if (currFigure.type === "Circle")
                return (
                  <circle
                    id={currFigure.id}
                    name={currFigure.name}
                    isEditing={currFigure.isEditing}
                    cx={currFigure.x}
                    cy={currFigure.y}
                    r={currFigure.size / 2}
                    fill={currFigure.color}
                    opacity={currFigure.opacity}
                    transform={`rotate(${currFigure.rotate} ${currFigure.x} ${currFigure.y})`}
                    onClick={() => {
                      setSelectedFigure(currFigure);
                    }}
                  />
                );
              else if (currFigure.type === "Rectangle") {
                return (
                  <span className="border-4">
                    <rect
                      id={currFigure.id}
                      name={currFigure.name}
                      x={currFigure.x}
                      y={currFigure.y}
                      height={currFigure.size}
                      width={currFigure.size}
                      fill={currFigure.color}
                      opacity={currFigure.opacity}
                      transform={`rotate(${currFigure.rotate} ${currFigure.x} ${currFigure.y})`}
                      onClick={() => {
                        setSelectedFigure(currFigure);
                      }}
                    />
                  </span>
                );
              }
            })}
          </svg>
        </span>
      </div>
    </div>
  );
}

export default App;
