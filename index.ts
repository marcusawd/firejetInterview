import fs from "fs";
import { parse } from "@babel/parser";
import prettier from "prettier";
import traverse, { Node, NodePath } from "@babel/traverse";

async function main() {
	try {
		const fileData = fs.readFileSync("./stringA.ts", "utf8");
		const ast = parse(fileData, {
			sourceType: "module",
			plugins: ["jsx", "typescript"],
		});

		const tsxComments: Node[] = [];
		traverse.default(ast, {
			enter(path: NodePath) {
				if (path.node.type === "TemplateLiteral" && path.node.leadingComments) {
					path.node.leadingComments.some((node) => {
						if (node.type === "CommentBlock" && node.value === "tsx") {
							// console.log(path.node.leadingComments);
							tsxComments.push(path.node);
						}
					});
				}
			},
		});
		const extracted = extract(tsxComments, fileData);
		for (const codeToLint of extracted) {
			const linted = await lint(codeToLint);
			console.log(linted);
		}
		// console.log("File contents:", extracted);
	} catch (err) {
		console.error("Error reading file:", err);
	}
}

function extract(array: Node[], code: string) {
	const extractedCodes: string[] = [];
	array.forEach((node) => {
		const start = node.start!;
		const end = node.end!;
		const extractedCode = code.slice(start + 1, end - 1);
		extractedCodes.push(extractedCode);
	});
	return extractedCodes;
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
