# Koa Upload Middlewawre

Configurable koa middleware to manage file upload.

The aim is to provide a quick-to-setup middleware for file upload management through on a Koa server.

Simple example on [this demo project](https://github.com/tilap/koa-upload-mw-example/blob/master/src/index.js).

## Features

- post one or more files - each file is submit to every uploader workflows
- uploader workflow comes with:
  - conditions (optinal, rules that will silently failed)
  - validation (optional, rules that will trigger an error message)
  - upload (return specific uplaoder data)
- workflow are independent: if one failed, the other can works

The package comes with built-in simple rules (filesize min/max, mimetypes in/out, request path, input field, headers) and a localfile uploader. You can easily add your owns rules

This middleware doesn't
  - serve files (you can do it with koa-static, nginx/apache, your cdn...)
  - modify files (but you can do it in the uploaders)
  - aim to be use "in one click" (you need to put your own koa stuff)

## API

### Middleware setup

```
import uploader from 'koa-upload-mw';

app.use(uploader(uploadersConfig, logger));
```

- `uploadersConfig` is a workflow descriptor or an array of workflows descriptors
- `logger` is an optional custom logger with info, trace, error methods (by default use console)

### Workflow descriptor

A workflow descriptor is an object with the entries below:

| Entry key  | Type     | Required | Default          |
| ---------- | -------- | ---------|------------------|
| name       | String   | No       | uploader-{index} |
| conditions | Array    | No       | []               |
| validators | Array    | No       | []               |
| storage    | Function | Yes      |                  |

- **name**: A unique ID for your uploader config, so you'll be able to its status if file passed conditions
- **conditions**: List of conditions to match to continue. If not match, ignore the uploader
- **validators**: To validate the file, request or anything else. Stop the upload on first failed, and return its message as an error
- **uploader**: a function to upload the file (in local file or on third party service for example)

#### Rules: Conditions and Validators API

Rules (both conditions and validators) are sync or async functions.

They are evaluated with an object as arg, containing the entries below:

- `file`: the file to upload, after passing the `lib/extractMediaInfos.js` parser outputing an object w/ the props below:
  - `path`: the path of the temporary upload file
  - `size`: the filesize
  - `mime`: the mimetype
  - `extension`: the extension matching the previous mimetype
  - `height`, `width`, `exifs` _only if the file is an image_
- `fields`: a list of the incoming form fields (name/value)
- `request`: the koa context request

Rules are passed if they neither return `false` nor throw any exception.

The 2 differences between Conditions and Validators:

- Condition are
  - all evaluated at once (no order)
  - if any of the condition failed, the upload is silently skipped and won't return any entry in the result
- Validators are
  - evaluated in order
  - the first failing validator will stop the upload workflow and render an error message

#### Rules examples

##### Filter media by mimetype, only jpeg images

```
import mimetypeInRule from 'koa-upload-md/lib/rules/mimetype/in';

mimetypeInRule(['image/jpeg'])
```

##### Filter request with a header 'x-token' with value 'tilap'

```
import hasHeaderRule from 'koa-upload-md/lib/rules/headers/has';

hasHeaderRule('x-token', 'Auth required', token => token === 'tilap')
```

##### Filter request with an input field named 'token' with value 'tilap'

```
import hasFieldRule from 'koa-upload-md/lib/rules/fields/has';

hasFieldRule('token', 'Token is required', token => token === 'tilap')
```

##### Filter request post only on a path

```
import pathIsRule from 'koa-upload-md/lib/rules/path/is';

pathIsRule('/my-path', 'Post only on a path please (no I wont tell you wich one')
```

##### File size

```
import minFilesizeRule from 'koa-upload-md/lib/rules/filesize/min';
import maxFilesizeRule from 'koa-upload-md/lib/rules/filesize/max';

minFilesizeRule(10000, 'Minimum 10.000 bits'),
maxFilesizeRule(1000000, 'Maximum 1.000.000 bits')
```

### Output

If there is no problem with the server, the response will ALWAYS be format as the successfull one below:

The data given for a successfull upload depends on your uploader.

```
{
  result: 'success',
  success: {
    'media-1': [
      { name: 'local-uploader', data: { ... }},
      { name: '3rdparty-uploader', data: { ... }}
    ],
    'media-2': [
      { name: 'local-uploader', error: { type: 'ValidationError', message: 'File is too big' }},
      { name: '3rdparty-uploader', data: { ... }}
    ],
    'media-3-very-big': [
      { name: '3rdparty-uploader-for-huge-files', data: { ... }}
    ]
  }
}

```

If there is a server error (something really bad), result will looks something like:

```
{
  result: 'error',
  error: { ...Error message... }
}

```
