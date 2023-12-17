

## Todo
-[X] Executable global via node
- Only one module per folder instance (That's clearer)
- First implement Lexicon module builder
- Try to use commonjs (pkg would be possible)
## Commands
### Init
- Init Function to create basic folder/file structure
	- Ask for:
		- module Name
		- vendor
		- Description
		- type (ux, rt, Lexicon)
		- version (defualt 0.0.0)
		- (Only if UX) Has TypeScript?
		- (If Lexicon) Lexicon module path
		- (If Lexicon) lexicon enconding
		- (If Lexicon) csv delimiter
		- (If Lexicon) is default lexicon?

### Handle dependencies
-[X] dependency command
- requires options
	- name
	- vendor
	- vendorVersion

### Build
- Build command
- options:
	- no-minify (UX only)

### Lexicon
- Lexicon command
	- Option: Base folder import
	- Option: CSV Import
	- Option: CSV Export

### Help
- shows full list of commands

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
