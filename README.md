# Koa Upload Middlewawre

Configurable koa middleware to manage file upload.

The aim is to provide a quick-to-setup middleware for file upload management through on a Koa server.

## Features

- post one or more files - each file is submit to every uploader workflows
- uploader workflow:
  - conditions (rules that will silently failed)
  - validation (rules that will trigger an error message)
  - upload (return specific uplaoder data)

Comes with built in simple rules for conditions / validations (filesize min/max, mimetypes in/out, request path, input field value) and a localfile uploader.

Does not
  - serve files
  - modify files
  - aims to be use "in one click" (you need to put your own koa stuff)

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

#### Rules (Condition and Validators API)

Rules (both conditions and validators) are sync or async functions.

They are evaluated with an object as arg, containing the entries below:

- `file`: the file to upload
- `fields`: a list of the incoming form fields
- `request`: the koa context request

Rules are passed if they neither return `false` nor throw any exception.

The 2 differences between Conditions and Validators:

- Condition are all evaluated at once (no order)
- Validators are evaluated in order.

### Output

If there is no problem with the server, the response will ALWAYS be format as the successfull one below:

```
{
  result: 'success',
  success: {
    'media-1': [
      { name: 'local-uploader', data: { ... }},
      { name: '3rdparty-uploader', data: { ... }},
    ],
    'media-2': [
      { name: 'local-uploader', error: { type: 'ValidationError', message: 'File is too big' }},
      { name: '3rdparty-uploader', data: { ... }},
    ],
    'media-3-very-big': [
      { name: '3rdparty-uploader-for-huge-files', data: { ... }},
    ]
  }
}

```

