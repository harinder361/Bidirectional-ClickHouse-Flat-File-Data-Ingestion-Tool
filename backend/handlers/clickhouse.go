package handlers

import (
	"encoding/json"
	"net/http"

	"workspaces/Bidirectional-ClickHouse-Flat-File-Data-Ingestion-Tool/backend/utils"
)

func ConnectClickHouse(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Host     string `json:"host"`
		Port     int    `json:"port"`
		Database string `json:"database"`
		User     string `json:"user"`
		Token    string `json:"token"`
	}

	// Parse request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Connect to ClickHouse
	client, err := utils.NewClickHouseClient(req.Host, req.Port, req.Database, req.User, req.Token)
	if err != nil {
		http.Error(w, "Failed to connect to ClickHouse: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Fetch tables
	tables, err := client.FetchTables()
	if err != nil {
		http.Error(w, "Failed to fetch tables: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with table list
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tables)
}
