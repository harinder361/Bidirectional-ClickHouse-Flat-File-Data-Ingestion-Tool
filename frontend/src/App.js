import React, { useState } from "react";
import ConnectionForm from "./components/ConnectionForm";
import ColumnSelector from "./components/ColumnSelector";
import StatusDisplay from "./components/StatusDisplay";

function App() {
	const [columns, setColumns] = useState([]);
	const [status, setStatus] = useState("Idle");
	const [recordCount, setRecordCount] = useState(null);

	const handleConnection = (tables) => {
		// Simulate fetching columns for the first table
		if (tables.length > 0) {
			setColumns(["column1", "column2", "column3"]); // Replace with actual column fetching logic
		}
	};

	const handleIngestion = async (selectedColumns) => {
		setStatus("Ingesting...");
		try {
			const response = await fetch("/ingest", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ columns: selectedColumns }),
			});
			const data = await response.json();
			setStatus("Completed");
			setRecordCount(data.recordCount);
		} catch (err) {
			setStatus("Error: " + err.message);
		}
	};

	return (
		<div>
			<h1>Data Ingestion Tool</h1>
			<ConnectionForm onConnect={handleConnection} />
			{columns.length > 0 && <ColumnSelector columns={columns} onSubmit={handleIngestion} />}
			<StatusDisplay status={status} recordCount={recordCount} />
		</div>
	);
}

export default App;
