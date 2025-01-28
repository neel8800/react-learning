## TO-DO:

0. Array Destructuring
   - Object Destructuring
   - rest operator
   - spread operator
1. Explore CDN
2. Explore crossorigin
3. Explore parcel -> Read documentation -> Feature and task of parcel
4. Explore theory of JSX
5. Transpilation through Babel before rendering, doc, how babel is working
6. Explore NPM, theory of npm
7. Key in the rendering component:
   - https://legacy.reactjs.org/redirect-to-codepen/reconciliation/index-used-as-key
   - https://legacy.reactjs.org/redirect-to-codepen/reconciliation/no-index-used-as-key
8. What is React hooks: read more on this from doc
   - normal JS function
   - useState() -> Super powerful state variables
   - useEffect
   - ... etc.
9. React Reconciliation Algorithm (React Fiber)
   - Also known as React Fiber => https://github.com/acdlite/react-fiber-architecture
   - Rest container => has 15 restaurant cards => UI changes to filter cards from 15 to 3 cards
     - React creates virtual dom from those 15 cards
     - Actual DOM: actual DOM is the dom which contains the actual HTML elements (div, h1, h2, img etc.)
     - Virtual DOM: re-presentation of actual DOM.
       - virtual DOM is react element (JS object). => Try to print any component log(Header) / log(Body). This react element (JS object) known as virtual DOM.
     - Diff Algorithm: which find outs the difference between two virtual DOMs. (previous & current virtual DOM).
       - Whenever the state variable id being changed, this reconciliation / diff algorithm will be triggered.
         - Diff algorithm finds out the difference between current virtual DOM and updated virtual DOM.
           - if the difference is found: update the actual DOM and re-render the component
           - else: no re-rendering will take place
10.

## JSX:

1. It is the HTML like or XML like syntax. It is not the HTML inside JS or XML inside JS.
   - const heading = <h1>Heading 1</h1>
     - Only '<h1>Heading 1</h1>' is called as JSX syntax not whole variable declaration
2. JSX work flow Vs Normal React.createElement workflow
   - Normal React.createElement => Converted to JS object by parcel => Rendered as HTML element on the Browser by JS engine
   - JSX: JSX converted into Normal React.createElement by Babel => Converted to JS object by parcel => Rendered as HTML element on the Browser by JS engine

## Babel:

1. Transpiler / Compiler
2. Transpile the ES6 code to compatible on older browser
3. Babel is some piece of JS library (NPM package)
4. Babel -> convert code to token -> Abstract syntax tree -> convert to JS object parcel
