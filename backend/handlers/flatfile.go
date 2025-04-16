package handlers

import (
	"encoding/csv"
	"net/http"
	"os"
)

func UploadFlatFile(w http.ResponseWriter, r *http.Request) {
	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Failed to read file: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Parse CSV
	reader := csv.NewReader(file)
	headers, err := reader.Read()
	if err != nil {
		http.Error(w, "Failed to parse CSV: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with column headers
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(headers)
}
