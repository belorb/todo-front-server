# React + TypeScript + Vite

j'ai utilisé Vite a la place de create-react-app. (j'ai vue apres)
globalement ca change pas grand chose.

## Installation

Ensure you have Node.js installed on your system. You can download and install it from the official [Node.js website](https://nodejs.org/).

Install the dependencies using either Yarn or npm:

### Yarn

```
yarn install
```

### npm

```
npm install
```

### Evironement Variable

create a .env file with a variable name VITE_BACKEND_URL and the value is the backend url

```
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
```

## Execution

Once the dependencies are installed, you can start the application by running the following command:

### Yarn

```
yarn dev
```

### npm

```
npm dev
```

This will launch the application in development mode. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
