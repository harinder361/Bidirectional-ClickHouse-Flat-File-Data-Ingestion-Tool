package handlers

import (
	"encoding/json"
	"net/http"
)

func StartIngestion(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Columns []string `json:"columns"`
	}

	// Parse request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Simulate ingestion process
	recordCount := len(req.Columns) * 100 // Example: 100 records per column

	// Respond with the result
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":     "Ingestion completed successfully",
		"recordCount": recordCount,
	})
}
