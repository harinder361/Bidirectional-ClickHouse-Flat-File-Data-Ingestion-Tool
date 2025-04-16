package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"workspaces/Bidirectional-ClickHouse-Flat-File-Data-Ingestion-Tool/backend/handlers"
)

func main() {
	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/connect/clickhouse", handlers.ConnectClickHouse).Methods("POST")
	r.HandleFunc("/upload/flatfile", handlers.UploadFlatFile).Methods("POST")
	r.HandleFunc("/ingest", handlers.StartIngestion).Methods("POST")

	// Add CORS middleware
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// Improved logging
	log.Println("Starting server on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler(r)))
}
