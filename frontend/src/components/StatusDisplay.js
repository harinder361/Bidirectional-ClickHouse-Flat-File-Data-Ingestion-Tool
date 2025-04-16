import React from "react";

function StatusDisplay({ status, recordCount }) {
	return (
		<div>
			<h2>Status</h2>
			<p>{status}</p>
			{recordCount !== null && <p>Records Processed: {recordCount}</p>}
		</div>
	);
}

export default StatusDisplay;
