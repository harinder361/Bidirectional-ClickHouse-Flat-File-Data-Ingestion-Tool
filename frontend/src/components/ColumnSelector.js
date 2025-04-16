import React, { useState } from "react";

function ColumnSelector({ columns, onSubmit }) {
	const [selectedColumns, setSelectedColumns] = useState([]);

	const handleCheckboxChange = (column) => {
		setSelectedColumns((prev) =>
			prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
		);
	};

	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit(selectedColumns);
		}
	};

	return (
		<div>
			<h2>Select Columns</h2>
			{columns.map((column) => (
				<div key={column}>
					<input
						type="checkbox"
						checked={selectedColumns.includes(column)}
						onChange={() => handleCheckboxChange(column)}
					/>
					{column}
				</div>
			))}
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default ColumnSelector;
