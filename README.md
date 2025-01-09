\*\*

## The CLI to create & develop a Web/React Application

\*\*

**1. How to install CLI**
Make sure you have installed node which version >= 16

    npm install -g mp-pack-cli

**2. Basic commands**

_2.1. Create new project_

Start your terminal at the path which store project then run command:

    npx mp-pack-cli new my-app

_2.2. Start dev server_

Start terminal at your project then run command:

    npm run dev

_2.3. Build production_

Start terminal at your project then run command:

    npm run build

**3. Advanced commands**

_3.1 Build any JS entries using Server side rendering_

For example, your entry paths is "src/index1.js" "src/index2.js" and place output file at "dist"

    mp-pack-cli build:ssr src/index1.js src/index2.js --outDir dist

_3.2. Create JSON dictionary language from csv_

For example, your path of csv file is "src/static/lang.csv" and place output json files at "dist/lang"

    mp-pack-cli lang --i src/static/lang.csv --o dist/lang

_3.3. Create SVG icon font_

For example, your folder of svg files is "src/static/svg" and place output icon fonts files at "dist/icon"

    mp-pack-cli icon --i src/static/svg --o dist/icon

After that, import the generated icon.css into your app
