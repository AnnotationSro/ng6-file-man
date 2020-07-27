# FileMan

Angular File Manager library.

## Table of contents
* [Features](#features)
* [Installing](#installing)
* [Backend requirements](#backend)
* [Ouputs](#outputs)
* [Inputs](#inputs)
* [SASS theming](#sass)
* [Customizing](#customizing)
* [i18n](#i18n)

## Features

* themeable
* i18n support
* upload (/w drag'n drop)
* customizable parts
* FileManager as button popup

## Installing

#### Prerequisities
* Downloaded and added `fontawesome@^5.1.1`

##### Downloading npm package
Install ng6-file-man

```
npm install ng6-file-man
-- OR --
yarn add ng6-file-man
```

##### Adding styles
In `angular.json` add to `styles`
````
"node_modules/ng6-file-man/assets/ng6-file-man-styles.scss",
````

Or use SASS in your project 
````
//globalStyles.scss

@import "~ng6-file-man/assets/ng6-file-man-styles.scss";
````

##### Using in app

Add module
````
// app.module.ts

import {FileManagerModule} from 'ng6-file-man';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FileManagerModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
````

Create `config in constructor`
````
// app.component.ts
  
const treeConfig: ConfigInterface = {
  baseURL: 'http://localhost:8080/',
  api: {
    listFile: 'api/file/list',
    uploadFile: 'api/file/upload',
    downloadFile: 'api/file/download',
    deleteFile: 'api/file/remove',
    createFolder: 'api/file/directory',
    renameFile: 'api/file/rename',
    searchFiles: 'api/file/search'
  },
  options: {
    allowFolderDownload: DownloadModeEnum.DOWNLOAD_FILES, //alternatively DOWNLOAD_DISABLED,DOWNLOAD_ALL
    showFilesInsideTree: false
  }
};
````

Then save your TreeConfig and create new TreeModel
````
// app.component.ts
  
this.tree = new TreeModel(treeConfig)
````

Finaly, add it into html
````
<fm-file-manager [tree]="tree"></fm-file-manager>
````

## Backend

**UPDATE:** Express API availible at https://github.com/Chiff/ng6-file-man-express

#### List files / folders

<strong>Method</strong>
* Get

<strong>Parameters we are sending</strong>
* parentPath (e.g. `localhost:8080/api/file/list?parentPath=/folder1/folder2`)

<strong>We are expecting response </strong>
* Array of nodes with:
````
{
  size: string           // e.g. '3 KB'
  url?: string            // download url
  id: string | number;   // id can be path or database id
  dir: bool              // is current node dir?
  path: string           // path to current item (e.g. /folder1/someFile.txt)
  name?: string          // optional (but we are using id as name if name is not present) (e.g. someFile.txt)
}
````

#### Upload 
This request is in form for [Fine Uploader traditional server](https://docs.fineuploader.com/branch/master/endpoint_handlers/traditional.html)

<strong>Params</strong>
* qqfile: MultipartFile[]
* qquuid: String
* qqfilename: String
* qqpartindex: int
* qqtotalparts: int
* qqtotalfilesize: long
* parentPath: String

#### Download

<strong>Method</strong>
* Get

<strong>Parameters we are sending</strong>
* path (e.g. `localhost:8080/api/file/download?path=/folder1/someFile.txt`)

#### Create directory

<strong>Method</strong>
* POST

<strong>Parameters we are sending</strong>
* dirName 
* parentPath 

(e.g. `localhost:8080/api/file/directory?parentPath=/folder1&dirName=newDir`)

#### Remove file / folder

<strong>Method</strong>
* DELETE

<strong>Parameters we are sending</strong>
* path 

(e.g. `localhost:8080/api/file/remove?path=/folder1/newDir`)

#### Rename file / folder

<strong>Method</strong>
* POST

<strong>Parameters we are sending</strong>
* path 
* newName 

(e.g. `localhost:8080/api/file/rename?path=/folder1/newDir&newName=newDirName`)

#### Search

<strong>Method</strong>
* GET

<strong>Parameters we are sending</strong>
* query 

(e.g. `localhost:8080/api/file/search?query=searchTerm`)

<strong>We are expecting response</strong>
* Array of nodes with:
````
{
  size: string           // e.g. '3 KB'
  url?: string            // download url
  id: string | number;   // id can be path or database id
  dir: bool              // is current node dir?
  path: string           // path to current item (e.g. /folder1/someFile.txt)
  name?: string          // optional (but we are using id as name if name is not present) (e.g. someFile.txt)
}
````


## Outputs
````
<fm-file-manager (itemClicked)="itemClicked($event)" ... ></fm-file-manager>
````

<strong>Event Types</strong>
<small>
* select
* download
* rename
* remove
</small>

Every event has `node` property

## Inputs

name | type | required | default value
--- | --- | --- | ---
tree | TreeModel | true | -
isPopup | bool | false | false
language | string | false | 'en'
iconTemplate | TemplateRef | false | -
folderContentTemplate | TemplateRef | false | -
folderContentBackTemplate | TemplateRef | false | -
folderContentNewTemplate | TemplateRef | false | -
sideViewTemplate | TemplateRef | false | -
loadingOverlayTemplate | TemplateRef | false | -

## SASS

#### Prerequisites
* Global SASS file included in angular.json

#### file-manager-styles.scss `!default` variables
*  $main-color
*  $contrast-color
*  $text-color
*  $border-radius
*  $hasAnimations

#### Usage
````
//globalStyles.scss

$main-color: #626e80;
$text-color: black;
$contrast-color: white;
$hasAnimations: false;
$border-radius: 20px;

@import "~ng6-file-man/assets/ng6-file-man-styles.scss";
````

## Customizing
````
<fm-file-manager [iconTemplate]="iconTemplate" ... ></fm-file-manager>

<!-- #iconTemplate is required, let-node is reference to node-->
<ng-template let-node #iconTemplate>
  <i class="fas fa-arrow-alt-circle-right" style="padding: 5px"></i>
  {{node.name}}
</ng-template>
````

Explanation

Template Name | Template input |  Input Type |Template Function
--- | --- | --- | ---
iconTemplate | let-node | NodeInterface | Tree view node template
folderContentTemplate | let-node | NodeInterface | Folder content node template
folderContentBackTemplate | let-node | NodeInterface | Back button in folder content
folderContentNewTemplate | let-node | NodeInterface | New button in folder content
sideViewTemplate | let-node | NodeInterface | Data  inside side view
loadingOverlayTemplate | let-timeoutMessage | string | loading overlay screen

#### Component layout

````
|--------------------------------------------------|
| Nav Bar                                   Search |
|--------------------------------------------------|
|              |                   |               |
|              |                   |               |
|     Tree     |      Folder       |      Side     |
|     View     |      Content      |      View     |
|              |                   |               |
|              |                   |               |
|--------------------------------------------------|
````

## i18n
* Copy `i18n` file from `~node_modules/ng6-file-man/assets`
* Put it in `~src/assets/i18n/[language].json` (e.g. `~src/assets/i18n/fr.json`) 
* Fill empty strings with your translations (e.g. `"Download": "Télécharger"`)
* Set language property `<fm-file-manager [language]="'fr'" ... ></fm-file-manager>`
* Voilà...

## Built With

* [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
* [ng-packagr](https://github.com/dherges/ng-packagr)

### Build instructions
1. Change package version
2. yarn run libProd
3. gulp prod
4. cd ../file-manager-lib
5. npm publish

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

<!--
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 
-->

## Authors

* **Martin Filo** - *Initial work* - [Chiff](https://github.com/Chiff)
* **Igor Kvasnicka** - improvements and fine tuning

See also the list of [contributors](https://github.com/AnnotationSro/ng6-file-man/contributors)
 who participated in this project. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Repository
* Playground: https://github.com/Chiff/ng6-file-man-test \[outdated\]
* Simple Express API: https://github.com/Chiff/ng6-file-man-express

