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
For starting a new project, you can use the init command to initialize current working path.  
This will create basic folders and files for later usage
```bash
n4-simple-build init
```

### Build module
```bash
n4-simple-build build
```

### Lexicon file handling
Extracting base Lexicon files from installation directory of a N4-installation
```bash
n4-simple-build lexicon --extract-base-files "C:\Brand\N4.x.x.x\modules"
```
Export CSV-files for every base module lexicon file
```bash
n4-simple-build lexicon --csv-export
```
Import CSV-files into source folder
```bash
n4-simple-build lexicon --csv-import
```

## Folder strucutre
```
Root
├───buildConfig.json   --> Configuration of the project
├───.temp   --> Temporary folder
├───output  --> Output folder for finished jar-files
├───signed  --> Modules that have been signed
├───module  --> Module base folder
│   ├───.build  -->  Temporary build folder
│   ├───META-INF 
|   |   └───module.json  --> stores data to generate meta data
│   └───src  --> Source files that need to be copied
│       └───rc  --> Resources
├───lex-base    --> Base files from other modules
├───lex-export  --> CSV Export path
└───lex-import  --> CSV Import path

```

## References

