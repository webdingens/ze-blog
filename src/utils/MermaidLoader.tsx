import { useEffect } from "react";
import mermaid from "mermaid";

export default () => {
	useEffect(() => {
		mermaid.initialize({ startOnLoad: false });

		document.querySelectorAll("pre.language-mermaid").forEach((block) => {
			const code = block.querySelector("code");
			if (!code) return;
			block.innerHTML = code.innerText.replace(/\n/g, "");
		});

		mermaid.run({
			querySelector: "pre.language-mermaid",
		});
	}, []);
	return <></>;
};
