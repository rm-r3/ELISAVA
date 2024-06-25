console.log("002_log.js loaded");

function downloadCSV(data, filename) {
  const csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // Required for FF
  link.click();
}

let logData = [["Timestamp", "X", "Y", "Z"]];

function logPosition() {
  const now = new Date();
  logData.push([now.toISOString(), fractalObject.position.x, fractalObject.position.y, fractalObject.position.z]);
}

document.getElementById("saveButton").addEventListener("click", () => {
  downloadCSV(logData, "object_log.csv");
});
