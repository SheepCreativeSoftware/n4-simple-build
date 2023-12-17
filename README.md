# n4-simple-build **[WIP]**  
Simple N4 module build & Lexicon handling tool
====================

[![NPM Version](https://img.shields.io/npm/v/n4-simple-build.svg)](https://www.npmjs.com/package/n4-simple-build)
[![NPM Downloads](https://img.shields.io/npm/dt/n4-simple-build.svg)](https://www.npmjs.com/package/n4-simple-build)
[![GitHub](https://img.shields.io/github/license/SheepCreativeSoftware/n4-simple-build)](https://github.com/SheepCreativeSoftware/n4-simple-build)
[![node-lts](https://img.shields.io/node/v-lts/n4-simple-build)](https://www.npmjs.com/package/n4-simple-build)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=RG6PSXR828X94)

## Important Note
**This module is still work in progress!**  
**Major changes can and will happend before v1.0.0**  
**Do not use this in an production enviroment**  

## Description
Node.JS module to build simple N4 Framework modules.  
For simple ressource modules which do not need java files or which not require a java compiler.  
It also is able to extract original (english) lexicon files from N4 java modules and can create CSV-files for translation into different languages.  
It can re-import translated CSV-files for building simple Lexicon modules for N4.  

## Instalation
```bash
npm i -g n4-simple-build
```

## Basic Usage
Commands are following this format:
```bash
n4-simple-build <command> [options]
```

### Get Help from Tool
Get a full list of commands

```bash
n4-simple-build --help
```

### Initialize Project
For starting a new project, you must use the init command to initialize current working path.  
This will create basic folders and files for later usage
```bash
n4-simple-build init
```

### Create Ressource module
Simply Add your files into the `src` or `rc` folder

### Edit config
You can use the `config-ls`, `config-add`, `config-rm` and `config-set` command to modify the config, like the dependecies or the version

### Build module
If you're ready then you can simply create a module by running the build command
```bash
n4-simple-build build
```
Note: The build command will iterate the build version each time you execute it (except for if you edit the version of the module).

If you're project includes web files like `js`, `html` or `css` they get minified unless you choose the option `--no-minify`.

### Lexicon file handling
Extracting base Lexicon files from a absolute or relative directory into the `lex-base` folder.
Note: If there are multiple files of the same module, these lexicon files get combined.

```bash
n4-simple-build lexicon --extract-base-files "C:/Brand/N4.x.x.x/modules"
```

Then you can use the export command to create a csv file for easy editing of each module.  
You will find these files in the `lex-export` folder.  
The CSV file will start in the first row with the lexicon key followed by a row with the english text.  
You can add a row with a language tag ad the first line (e.g. `de`) for a specific langauage.  
You can add multiple languages if you wish to.  
Export CSV-files for every base module lexicon file
```bash
n4-simple-build lexicon --csv-export
```

After editing you can put your CSV files into the `lex-import` and import them.
Special characters will automatically converted, so N4 will understand them.
Import CSV-files into source folder
```bash
n4-simple-build lexicon --csv-import
```

Then you can use the build command

## Folder strucutre
```
Root
├───buildConfig.json   --> Configuration of the project
├───.temp   --> Temporary folder for extracting lexicon files.
├───output  --> Output folder for finished jar-files
├───signed  --> Modules that have been signed
├───module  --> Module base folder
│   ├───.build  -->  Temporary build folder
│   ├───META-INF 
|   |   └───module.json  --> stores data to generate meta data
│   └───src  --> Source files that need to be copied
│       └───rc  --> Resources
├───lex-base    --> Base lexicon files from other modules
├───lex-export  --> CSV Export path for lexicon files
└───lex-import  --> CSV Import path for lexicon files

```

## References

