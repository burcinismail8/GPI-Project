import "./App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const activeTagTypes = ["circle", "rect", "INPUT", "BUTTON"];
function App() {
  const [figure, setFigure] = useState("Circle");
  const [rotate, setRotate] = useState(0);
  const [size, setSize] = useState(150);
  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState("#509bed");
  const [allCreatedFigures, setAllCreatedFigures] = useState([]);
  const [selectedFigure, setSelectedFigure] = useState({});
  const [figureNewName, setFigureNewName] = useState();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
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
    setSelectedFigure(newFigure);
    setFigureNewName(newFigure.name);
  };

  const deleteFigure = () => {
    let newArr = allCreatedFigures.slice(0);
    const i = allCreatedFigures.findIndex((el) => el.id === selectedFigure.id);
    if (i === -1) {
      return;
    }
    newArr.splice(i, 1);
    setAllCreatedFigures(newArr);
    setSelectedFigure(newArr[newArr.length - 1]);
  };

  const onFocusFigureName = (id) => {
    const i = allCreatedFigures.findIndex((figure) => figure.id === id);
    setSelectedFigure(allCreatedFigures[i]);
    setFigureNewName(allCreatedFigures[i].name);
  };
  const handleNameChange = (id) => {
    let newArr = allCreatedFigures.slice(0);
    const i = allCreatedFigures.findIndex((figure) => figure.id === id);
    let obj = newArr[i];

    if (i === -1 || obj.name === figureNewName) {
      return;
    }

    obj.name = figureNewName;
    newArr.splice(i, 1, obj);
    setAllCreatedFigures(newArr);
    setFigureNewName("");
    toast.success("Changed figure name successfully!");
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);

    if (selectedFigure.id !== undefined) {
      let newArr = allCreatedFigures.slice(0);
      const i = allCreatedFigures.findIndex(
        (figure) => figure.id === selectedFigure.id
      );
      let changedFigure = newArr[i];
      changedFigure.color = e.target.value;
      newArr.splice(i, 1, changedFigure);
      setAllCreatedFigures(newArr);
    }
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);

    if (selectedFigure.id !== undefined) {
      let newArr = allCreatedFigures.slice(0);
      const i = allCreatedFigures.findIndex(
        (figure) => figure.id === selectedFigure.id
      );
      let changedFigure = newArr[i];
      changedFigure.size = e.target.value;
      newArr.splice(i, 1, changedFigure);
      setAllCreatedFigures(newArr);
    }
  };
  const handleRotateChange = (e) => {
    setRotate(e.target.value);
    if (selectedFigure.id !== undefined) {
      let newArr = allCreatedFigures.slice(0);
      const i = allCreatedFigures.findIndex(
        (figure) => figure.id === selectedFigure.id
      );
      let changedFigure = newArr[i];
      changedFigure.rotate = e.target.value;
      newArr.splice(i, 1, changedFigure);
      setAllCreatedFigures(newArr);
    }
  };
  const handleOpacityChange = (e) => {
    setOpacity(e.target.value);
    if (selectedFigure.id !== undefined) {
      let newArr = allCreatedFigures.slice(0);
      const i = allCreatedFigures.findIndex(
        (figure) => figure.id === selectedFigure.id
      );
      let changedFigure = newArr[i];
      changedFigure.opacity = e.target.value;
      newArr.splice(i, 1, changedFigure);
      setAllCreatedFigures(newArr);
    }
  };
  function downloadJSON() {
    const json = JSON.stringify(allCreatedFigures);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "figuresJSON";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  function loadJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const json = JSON.parse(reader.result);
      setAllCreatedFigures([...json]);
    };

    reader.readAsText(file);
  }
  const startDrag = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const drag = (event) => {
    if (isDragging && selectedFigure.id !== undefined) {
      const newPosX = event.clientX - offset.x;
      const newPosY = event.clientY - offset.y;
      let newArr = allCreatedFigures.slice(0);
      const i = allCreatedFigures.findIndex(
        (figure) => figure.id === selectedFigure.id
      );

      let changedFigure = newArr[i];
      changedFigure.x = newPosX;
      changedFigure.y = newPosY;

      newArr.splice(i, 1, changedFigure);
      setAllCreatedFigures(newArr);
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };
  return (
    <div
      className="h-screen"
      onClick={(e) => {
        const i = activeTagTypes.findIndex((fig) => fig === e.target.tagName);
        if (i === -1) {
          setSelectedFigure({});
        }
      }}
    >
      <div className="flex justify-center h-[70%] lg:h-[90%]">
        <span className="w-[75%] lg:w-[90%]">
          <svg>
            {allCreatedFigures.map((currFigure) => {
              if (currFigure.type === "Circle")
                return (
                  <circle
                    key={currFigure.id}
                    id={currFigure.id}
                    name={currFigure.name}
                    isEditing={currFigure.isEditing}
                    cx={currFigure.x}
                    cy={currFigure.y}
                    r={currFigure.size / 2}
                    fill={currFigure.color}
                    opacity={currFigure.opacity}
                    transform={`rotate(${currFigure.rotate} ${currFigure.x} ${currFigure.y})`}
                    onMouseDown={startDrag}
                    onMouseMove={drag}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onClick={() => {
                      setSelectedFigure(currFigure);
                      setColor(currFigure.color);
                      setSize(currFigure.size);
                      setRotate(currFigure.rotate);
                      setOpacity(currFigure.opacity);
                      setPosition({ x: currFigure.x, y: currFigure.y });
                    }}
                    strokeWidth={currFigure.id === selectedFigure.id ? 2 : 0.5}
                  />
                );
              else if (currFigure.type === "Rectangle") {
                return (
                  <rect
                    key={currFigure.id}
                    id={currFigure.id}
                    name={currFigure.name}
                    x={currFigure.x}
                    y={currFigure.y}
                    height={currFigure.size}
                    width={currFigure.size}
                    fill={currFigure.color}
                    opacity={currFigure.opacity}
                    transform={`rotate(${currFigure.rotate} ${currFigure.x} ${currFigure.y})`}
                    onMouseDown={startDrag}
                    onMouseMove={drag}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onClick={() => {
                      setSelectedFigure(currFigure);
                      setColor(currFigure.color);
                      setSize(currFigure.size);
                      setRotate(currFigure.rotate);
                      setOpacity(currFigure.opacity);
                      setPosition({ x: currFigure.x, y: currFigure.y });
                    }}
                    strokeWidth={currFigure.id === selectedFigure.id ? 2 : 0.5}
                  />
                );
              } else {
                return;
              }
            })}
          </svg>
        </span>
        <aside className="h-full bg-primary w-[25%] lg:w-[10%] ml-auto overflow-y-auto text-left flex flex-col border-l-4 border-gray-300 bg-gray-300">
          {allCreatedFigures.map((figure) => {
            if (figure.id === selectedFigure.id) {
              return (
                <div
                  key={figure.id}
                  className="flex bg-white border-white border-b-3"
                >
                  <input
                    type="text"
                    className="bg-transparent  text-gray-500 p-3 text-lg font-semibold w-[100%]"
                    defaultValue={figure.name}
                    onFocus={() => {
                      onFocusFigureName(figure.id);
                    }}
                    onChange={(e) => setFigureNewName(e.target.value)}
                  />
                  <button
                    className="m-3"
                    onClick={() => handleNameChange(figure.id)}
                  >
                    <DoneIcon color="success" />
                  </button>
                </div>
              );
            } else {
              return (
                <div
                  key={figure.id}
                  className="flex bg-gray-500 border-white border-b-3"
                >
                  <input
                    type="text"
                    className="bg-transparent text-white p-3 text-lg font-semibold w-[100%]"
                    value={figure.name}
                    onFocus={(e) => {
                      onFocusFigureName(figure.id);
                      setFigureNewName(e.target.value);
                    }}
                  />
                </div>
              );
            }
          })}
        </aside>
      </div>
      <nav className="flex flex-col lg:flex-row h-[30%] lg:h-[10%]">
        <div className="wrapper">
          <div style={{ width: "100px" }}>
            <label htmlFor="input-color">Color</label>
            <input
              id="input-color"
              type="color"
              value={color}
              onChange={handleColorChange}
              style={{ width: "100%" }}
            />
          </div>
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
              onChange={handleRotateChange}
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
              onChange={handleSizeChange}
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
              onChange={handleOpacityChange}
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
          <Button onClick={downloadJSON} variant="contained" color="success">
            Save
          </Button>

          <label
            for="file"
            className="shadow-lg"
            style={{
              padding: "15px",
              background: "#09aaab",
              borderRadius: "5px",
              textTransform: "uppercase",
              fontSize: "15px",
            }}
          >
            Load
          </label>
          <input
            type="file"
            id="file"
            onChange={loadJSON}
            style={{ display: "none" }}
          />
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default App;
