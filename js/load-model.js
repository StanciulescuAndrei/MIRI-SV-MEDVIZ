function parseFilename(filename) {
  // Split the filename based on "-"
  const parts = filename.split('-');

  if (parts.length === 4) {
    const name = parts[0];
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    const z = parseInt(parts[3], 10);

    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      return {
        name: name,
        x: x,
        y: y,
        z: z
      };
    }
  }

  // Return null if the filename doesn't match the expected format
  return null;
}

function loadModel() {
  console.log("LOAD MODEL!");
  const fileInput = document.getElementById("modelFileInput");
  const fileInfoContainer = document.getElementById("modelInfo");

  const file = fileInput.files[0];
  if(file) {
    const fileInfo = parseFilename(file.name);

    if (fileInfo) {
      // Placeholder function for loading the model
      const modelData = loadRawModel(file);

      // Display model information
      fileInfoContainer.innerHTML = `
        <p>File Name: ${fileInfo.name}</p>
        <p>Dimensions: ${fileInfo.x} x ${fileInfo.y} x ${fileInfo.z}</p>
        <!-- Add more information as needed -->
      `;

      // Placeholder function for using the model data in WebGL viewer
      useModelDataInWebGLViewer(modelData);
      
    } else {
      fileInfoContainer.innerHTML = "No valid file selected.";
    }
  } else {
    fileInfoContainer.innerHTML = "No valid file selected.";
  }
}

  // Placeholder function for loading raw model data
  function loadRawModel(file) {
    // Implement the logic to read and parse the raw model data from the file
    // Example: Assume the raw model data has dimensions 256 x 256 x 256
    const modelData = {
      width: 256,
      height: 256,
      depth: 256,
      // Add more properties as needed
    };
    return modelData;
  }

  export { loadModel };