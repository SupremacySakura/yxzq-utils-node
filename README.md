
# yxzq-utils-node

`yxzq-utils-node` 是一个工具库，支持在后端读取和上传文件，方便处理文件上传和静态资源管理。

## 目录

- [安装](#安装)
- [使用](#使用)
  - [JavaScript 示例](#javascript-示例)
  - [TypeScript 示例](#typescript-示例)
  - [ES Module 支持](#es-module-支持)
- [返回值](#返回值)
- [使用介绍](#使用介绍)
  - [前端工具](#前端工具)
  - [搭配工具](#搭配工具)

## 安装

```bash
npm install yxzq-utils-node
```

## 使用

### 上传函数 uploadResource

#### JavaScript 示例

```javascript
const fs = require('fs');
const path = require('path');
const { uploadResource } = require('yxzq-utils');

const up = async () => {
    const file = await fs.promises.readFile(path.resolve(__dirname, 'yourFilePath'));
    uploadResource(file, {
        fileName: 'default',        // 储存的文件名，默认值为 'default'
        folderName: 'default_name', // 储存的目录位置，默认值为 'default_name'
        url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
        useDate: 'yes',            // 是否使用时间戳作为文件名的一部分，默认值为 'yes'
        ext: 'jpg'                 // 文件后缀名，默认值为 'jpg'
    });
};

up();
```

#### TypeScript 示例

如果你在 TypeScript 环境下使用此库，请确保安装 `@types/node` 以获取 Node.js 内置模块的类型定义：
```bash
npm install --save-dev @types/node
```

```typescript
const fs = require('fs');
const path = require('path');
const { uploadResource } = require('yxzq-utils');

const up = async () => {
    const file = await fs.promises.readFile(path.resolve(__dirname, 'yourFilePath'));
    uploadResource(file, {
        fileName: 'default',        // 储存的文件名，默认值为 'default'
        folderName: 'default_name', // 储存的目录位置，默认值为 'default_name'
        url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
        useDate: 'yes',            // 是否使用时间戳作为文件名的一部分，默认值为 'yes'
        ext: 'jpg'                 // 文件后缀名，默认值为 'jpg'
    });
};

up();
```

#### ES Module 支持

```javascript
import { uploadResource } from 'yxzq-utils';
```

## 返回值

调用 `uploadResource` 会返回一个 Promise，解析后的结果如下：

```javascript
{
    message: 'File uploaded successfully!' | 'File uploaded unsuccessfully!' | 'File does not exist!',
    filePath: url | null, // 文件路径（成功时）或 null（失败时）
    code: 200 | 500,      // HTTP 状态码
    error?: error.message // 错误信息（仅在失败时返回）
}
```

### 获取上传后文件地址函数 getFilePath

#### JavaScript 示例

```javascript
const { getFilePath } = require('yxzq-utils');


   getFilePath({ 
    url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
     extNameConfig:'all',// 查询文件后缀名参数,默认值为'all',可选值'photo',也可传入后缀名数组,如['.html','.jpg']
   }).then(res =>{
    console.log(res)
})

```

#### TypeScript 示例

如果你在 TypeScript 环境下使用此库，请确保安装 `@types/node` 以获取 Node.js 内置模块的类型定义：
```bash
npm install --save-dev @types/node
```

```typescript
const { getFilePath } = require('yxzq-utils');


   getFilePath({ 
    url: 'http://localhost:3100', // 服务器地址，默认值为 'http://localhost:3100'
     extNameConfig:'all',// 查询文件后缀名参数,默认值为'all',可选值'photo',也可传入后缀名数组,如['.html','.jpg']
   }).then(res =>{
    console.log(res)
})
```

#### ES Module 支持

```javascript
import { getFilePath } from 'yxzq-utils';
```

## 返回值

调用 `getFilePath` 会返回一个 Promise，解析后的结果如下：

```javascript
{
    message: 'Query successful!' | 'An error occurred during the request',
    files: Array<string> | [], // 文件路径（成功时）或 []（失败时）
    code: 200 | 400,      // HTTP 状态码
    error?: error.message // 错误信息（仅在失败时返回）
}
```

## 使用介绍

### 文件支持

当前工具支持以下文件类型：
- **File**
- **Blob**
- **Buffer**
- **fs.ReadStream**

你可以上传图片或其他静态资源。

### 前端工具

如果需要在前端工具中使用，请使用另一个工具 [yxzq-utils-browser](https://www.npmjs.com/package/yxzq-utils-browser)。

### 搭配工具

使用此工具时，可以结合作者的另一个工具 [resource-storage](https://github.com/SupremacySakura/resource-storage)。

---
如有任何问题，欢迎提交 Issue 或 PR！
