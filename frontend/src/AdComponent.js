import React, { useEffect } from "react";

function AdComponent() {
	useEffect(() => {
		if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
			window.adsbygoogle.push({});
		}
	}, []);

	return (
		<div>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-pub-7894117318013595"
				data-ad-slot="2955418511"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		</div>
	);
}

export default AdComponent;
