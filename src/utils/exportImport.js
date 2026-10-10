export function exportDataAsJSON(applications) {
  const exportPayload = {
    app: "CareerPulse JobTracker",
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    totalRecords: applications.length,
    data: applications,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(exportPayload, null, 2)
  )}`;
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute(
    "download",
    `careerpulse-jobs-backup-${new Date().toISOString().slice(0, 10)}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importDataFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          resolve(parsed);
        } else if (parsed && Array.isArray(parsed.data)) {
          resolve(parsed.data);
        } else {
          reject(new Error("Unrecognized JSON schema. Expected array of applications or data array."));
        }
      } catch (err) {
        reject(new Error("Invalid JSON file. Please check syntax."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}
