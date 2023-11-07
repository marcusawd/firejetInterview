import * as parser from "@babel/parser";
import { codeString } from "./exhibitA.js";

//* https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

const options = {
	plugins: ["jsx", "typescript"],
	sourceType: "module",
};

try {
	const ast = parser.parse(codeString, options);
	console.log(JSON.stringify(ast, null, 2));
} catch (error) {
	console.error("Error while parsing the code:", error);
}
