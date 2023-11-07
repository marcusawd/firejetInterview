import fs from "fs";
import { parse } from "@babel/parser";
import prettier from "prettier";
import traverse, { Node, NodePath } from "@babel/traverse";

async function main() {
	try {
		const fileData = fs.readFileSync("./stringA.ts", "utf8");
		let lintedData = fileData;
		const ast = parse(fileData, {
			sourceType: "module",
			plugins: ["jsx", "typescript"],
		});

		const tsxComments: Node[] = [];
		traverse.default(ast, {
			enter(path: NodePath) {
				if (path.node.type === "TemplateLiteral" && path.node.leadingComments) {
					path.node.leadingComments.some(async (node) => {
						if (node.type === "CommentBlock" && node.value === "tsx") {
							// console.log(path.node.leadingComments);
							// tsxComments.push(path.node);
							const codeToLint = extract(path.node, fileData);
							const linted = await lint(codeToLint);
							lintedData = lintedData.replace(codeToLint, linted);
							console.log(lintedData);
							fs.writeFileSync("answer.ts", lintedData);
						}
					});
				}
			},
		});
	} catch (err) {
		console.error("Error reading file:", err);
	}
}

function extract(node: Node, code: string) {
	const start = node.start!;
	const end = node.end!;
	const extractedCode = code.slice(start + 1, end - 1);

	return extractedCode;
}

async function lint(code: string): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const formattedCode = prettier.format(code, { parser: "babel" });
			resolve(formattedCode);
		}, Math.random() * 1000);
	});
}

main();
