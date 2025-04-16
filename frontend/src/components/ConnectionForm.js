import React, { useState } from "react";

function ConnectionForm() {
	const [host, setHost] = useState("");
	const [port, setPort] = useState("");
	const [database, setDatabase] = useState("");
	const [user, setUser] = useState("");
	const [token, setToken] = useState("");
	const [tables, setTables] = useState([]);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); // Reset error state
		try {
			const response = await fetch("/connect/clickhouse", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ host, port, database, user, token }),
			});
			if (!response.ok) {
				throw new Error("Failed to connect to ClickHouse. Please check your credentials.");
			}
			const data = await response.json();
			setTables(data); // Update tables state
		} catch (err) {
			setError(err.message); // Set error message
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Connect to ClickHouse</h2>
				<input type="text" placeholder="Host" value={host} onChange={(e) => setHost(e.target.value)} />
				<input type="text" placeholder="Port" value={port} onChange={(e) => setPort(e.target.value)} />
				<input type="text" placeholder="Database" value={database} onChange={(e) => setDatabase(e.target.value)} />
				<input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
				<input type="text" placeholder="JWT Token" value={token} onChange={(e) => setToken(e.target.value)} />
				<button type="submit">Connect</button>
			</form>
			{/* Display error message */}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{/* Display fetched tables */}
			{tables.length > 0 && (
				<div>
					<h3>Available Tables</h3>
					<ul>
						{tables.map((table, index) => (
							<li key={index}>{table}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default ConnectionForm;
