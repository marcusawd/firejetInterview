## Question 1: Document is undefined

```tsx
export async function arrayToBase64(array: Uint8Array) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	const imageData = await decode(canvas, ctx!, array);

	return imageData;
}
```

Running the above function, returns an error `document is undefined`.

1. Suggest a reason for the error
   - document object relates to DOM and only works in a web browser environment. If used in node.js environment (non-browser environment), document will be undefined
2. Suggest a method to solve the error
   - execute the code in a suitable environment or use libraries such as JSDom to add document support for nodejs

## Question 2: Error in try {} catch {} block

```tsx
try {
	figma.showUI("<div>Hello</div>");
} catch {}
```

​
Running the above function during codegen mode causes the FireJet Figma Plugin to crash with the error figma_app.min.js.br:5 Error: in showUI: Cannot show UI
The code crashes because the showUI() command is not allowed in codegen mode. However, suggest why it is still crashing despite being in the try block.

```tsx
figma.showUI("<div>Hello</div>");
figma.codegen.on("generate", () => {});
```

Answer: The error is not caused by running the javascript code, it is being thrown by the figma plugin

## Question 3: Cannot call API

Trying to call the APIs at [https://api.github.com](https://api.github.com/) from the [FireJet Tweak](https://www.firejet.io/tweak) frontend throws an error.

1. Suggest the type of error and their reason
2. Suggest a way to overcome the error, with some javascript snippets to support your answer

## Question 4: Get styles from element in iFrame

```jsx
var iframe = document.getElementById("myFrame");
var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
const styles = getComputedStyle(elmnt);
```

When trying the above code to get the styles from an element inside of the [FireJet Tweak](https://www.notion.so/5cfbc0a680c04add998d28f5c253dd12?pvs=21) iframe, the code does not work.

1. Suggest why the code does not work
2. Suggest and alternative method of getting the styles.

## Question 5: Image not Updating

When converting a design with the [FireJet Figma Plugin](https://www.firejet.io/plugin), sometimes when the image is updated in our database, when visiting the website, the image still remains unupdated when viewing on codesandbox

1. Suggest why the image has not been updated
2. Suggest how we could get the image to be updated when viewed in codesandbox

## Question 6: `fs is undefined`

When using build tools like vite or tailwind, sometimes we encounter the error `fs is undefined`

1. Name some cases where fs is defined and some cases where it is undefined
2. In the case that fs is undefined, suggest how we can make fs defined, so that we can continue using build tools like vite and tailwind

## Question 7: For loop not working

```jsx
const users = {};

userIds.forEach(async (userId) => {
	const user = await getUser(userId);
	users[userId] = user;
});

console.log(users);
```

1. Explain why the above code is not working

- In a forEach loop, the loop does not wait for async operations to complete, it initialises them all simultaneously, which causes users object to not have all the await getUser()

2. Explain how to fix the above code

- You can use a for..of loop which waits for async call to finish before moving to next iteration
- You can also map userIds in a promise.all, which will wait till all is done before console.log
