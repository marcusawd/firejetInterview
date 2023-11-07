import fs from "fs";
import { parse } from "@babel/parser";
import prettier from "prettier";

function main() {
	try {
		const fileData = fs.readFileSync("./stringA.ts", "utf8");
		const ast = parse(fileData, {
			sourceType: "module",
			plugins: ["jsx", "typescript"],
		});
		console.log("File contents:", JSON.stringify(ast));
	} catch (err) {
		console.error("Error reading file:", err);
	}
}

async function lint(code: string): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const formattedCode = prettier.format(code);
			resolve(formattedCode);
		}, Math.random() * 1000);
	});
}

main();
