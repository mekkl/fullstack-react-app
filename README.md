# fullstack-react-app
Fullstack React Application

Trying to build a fullstack react application boilerplate from https://blog.cloudboost.io/create-a-react-application-from-scratch-part-1-introduction-b2e66dfb3aae

# Syntax
ES2015 er en signifikant updatering to sproget og tilføjer en stor størrelse af nye features. 

Support af de nye features fra ES2015 er stadig stigende i moderne browsere og andre miljøer som f.eks. Node.js, men stadig er det ikke alle browsere der har support af de nye features.

## Transpileren
ES2015 er i bund og grund syntaktisk sukker som betyder, at man kan bruge et værktøj til at konventerer kode, som er skrevet i ES2015, til plain ES5, som er støttet af alle browsere. Transpileren som benyttes i dette projekt er Babel.

[Babel](https://babeljs.io/) er en transpiler der gør, at man kan bruge ES2015, da den transpiler den til normal JavaScript.

Babel dependencies som benyttes i dette projekt:
```
yarn add babel-core babel-cli
```

Der tilføjes en .babelrc fil til top level af projektet. For at oplyse Babel om, at der skal compiles ES2015 kode til normal ES5, så skal der installeres ES2015 preset, som tilføjes til preset listen. Et andet brugbart preset er stage-0, som gør at man kan bruge nyere features som [Object rest spread transform](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread) og [Dynamic Import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/). 

De skal først hentes ved:
```
yarn add babel-preset-es2015 babel-preset-stage-0
```

Og tilføjes derefter til .babelrc:
```
{
    "presets": ["es2015", "stage-0"],
    "plugins": []
}
```

# Style Guide
En Style Guide er et sæt af standardiseret regler for hvordan kode skal skrives og organiseret. For at påtvinge en Style Guide, så skal man benytte en kode linter. En kode linter er et program der hjælper med at spare tid og skrive clean kode og kode der et let at vedligeholde ved, at analyserer koden for potentielle fejl.

## Linteren
[ESLint](https://eslint.org/) er det mest populærer JavaScript lint værktøj og har plugins for mange populærer editors som f.eks. VSCode, Sublime Text og Atom, og tilføjer realtime kode linting.

ESlint depenency:
```
yarn -D add eslint
```

ESLint har blive [konfigureret](https://eslint.org/docs/user-guide/configuring) ved, at benytte en .eslintrc fil. Filen skal laves som en top level fil af projektet.

## AirBnBs Style Guide
Hvis man ikke allerede har en style guide, så kan man vælge andres. I dette projekt vælges AirBnBs [style guide](https://github.com/airbnb/javascript), da det er et meget omfattende sæt af kode standarder og en af de mest populærer style guides på nettet.

Style Guide dependency:
```
yarn -D add eslint-config-airbnb
```

Style Guiden er afhængig af andre dependencies:
```
yarn -D add eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

## Linting ikke-standard ES2015 syntax
Nogle ES2015 features som f.eks. class properties er virkelige brugbare, men de er måske ikke en standard (endnu) og ESLint vil kaste en Parsing Error når vi benytter dem. For at komme omkring det, så skal man bruge en [ESLint parser](https://github.com/babel/babel-eslint) som tillader linting af valid Babel kode.

Dependency der benyttes til dette:
```
yarn -D add babel-eslint
```

Denne linje tilføjes i .eslintrc filen
```javascript
{
    "parser": "babel-eslint",
    ...
}
```

## Tvinge linting inden der laves commit
Man kan tvinge linting inden hvert commit ved, at benytte en [pre-commit](https://www.npmjs.com/package/pre-commit) hook installer. Den lader en kører specifikke scripts inden der gives tilladelse til commits. Derfor kan "lint" scriptet blive kørt før der laves commit.

Følgende afhængihed tilføjes.
```
yarn add -D pre-commit
```

Den eneste ting man skal gøre er, at tilføje pre-commit array til package.json filen, som specificerer hvilket script man vil have kørt i en bestemt rækkefølge.
```javascript
{
	...
	"pre-commit": [
		"lint"
	]
	...
}
```

## Note

### Fejl ved Lint script
Oplevede følgende fejl ved installation af afhængigheden:
```
eslint@5.6.0: The engine "node" is incompatible with this module.
```

Installerede dependency'ed med npm i stedet for yarn, som virkede. En anden løsning kunne også have været af installerer med yarn og benytte --ignore-engines

### Ændring af AirBnB regler
Lavede tre nye regler for ESLint, da jeg ville ændre på nogle af de standarder som AirBnB havde for deres Style Guide. Mit problem var, at deres type af linje skift ikke fungerede på min windows maskine (dette skal måske ændres for min mac?), samt at de benyttede spaces og ikke tabs.
```javascript
"rules": {
	"linebreak-style": ["error", "windows"],
	"indent": ["error", "tab"],
	"no-tabs": 0
}
```