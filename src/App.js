import "./App.css";

function App() {
  return (
    <div class="h-screen">
      <nav class="flex flex-col lg:flex-row h-[30%] lg:h-[10%]">
        <div class="wrapper">
          <div>
            <label for="input-rotate">Rotate</label>
            <input
              id="input-rotate"
              type="range"
              class="range range-accent"
              min="0"
              max="360"
              step="10"
              // bind:value={shapeRotation}
              // on:input={handleRotationChange}
            />
          </div>
          <div>
            <label for="input-size">Size</label>
            <input
              id="input-size"
              type="range"
              class="range range-accent"
              min="10"
              max="210"
              // on:input={handleSizeChange}
              // bind:value={shapeSize}
            />
          </div>
          <div>
            <label for="input-opacity">Opacity</label>
            <input
              id="input-opacity"
              type="range"
              class="range range-accent"
              min="0"
              max="1"
              step="0.1"
              // bind:value={shapeOpacity}
              // on:input={handleOpacityChange}
            />
          </div>
          <div>
            <label for="input-color">Color</label>
            <input
              id="input-color"
              type="color"
              // bind:value={shapeColor}
              // on:input={handleColorChange}
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <select
            class="select text-black"
            // bind:value={currentShape}
            // on:change={(event) => (currentShape = event.target.value)}
          >
            <option>Circle</option>
            <option>Rectangle</option>
          </select>
          <button class="btn btn-success">Add</button>
          <button class="btn btn-error">Delete</button>

          <button class="btn btn-secondary">Save Data</button>
          <label for="file" class="btn">
            Load Data
          </label>
          <input type="file" id="file" />
        </div>
      </nav>
    </div>
  );
}

export default App;
