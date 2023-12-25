# @neoncitylights/http-types

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm (scoped)](https://img.shields.io/npm/v/@neoncitylights/http-types?style=flat-square)](https://www.npmjs.com/package/@neoncitylights/http-types)

A pure TypeScript package that provides strongly typed HTTP headers, methods, and status codes. Supports the Fetch API, `XmlHttpRequest`, and the Node.js HTTP module with zero-runtime overhead.

This package uses an open-source JSON dataset by [WebConcepts](https://webconcepts.info/JSON-concepts) with slight modifications, available under [`concepts.json`](./build/concepts.json). The script to auto-generate the TypeScript files is available under [`generateHttpTypes.ts`](./build/generateHttpTypes.ts). The generated files are:

 - [`httpHeaders.ts`](./src/httpHeaders.ts): 259 HTTP header types
 - [`httpMethods.ts`](./src/httpMethods.ts): 40 HTTP method types
 - [`httpStatusCodes.ts`](./src/httpStatusCodes.ts): 63 HTTP status code types

## Install

```
npm install @neoncitylights/http-types
```

## Documentation

[Auto-generated API documentation is available.](https://neoncitylights.github.io/http-types/)

### API Reference
>
> **Note**: Specific HTTP headers, methods, and status codes are omitted from the API documentation for brevity. The full list of types is available in the source code.

 - `T`: <a href="#HttpHeader">#</a> headers.**HttpHeader** • [source](./src/httpHeaders.ts)
 - `T`: <a href="#HttpRequetHeader">#</a> headers.**HttpRequestHeader** • [source](./src/httpHeaders.ts)
 - `T`: <a href="#HttpResponseHeader">#</a> headers.**HttpResponseHeader** • [source](./src/httpHeaders.ts)
 - `T`: <a href="#ForbiddenHttpRequestHeader">#</a> headers.**ForbiddenHttpRequestHeader** • [source](./src/httpHeaders.ts)
 - `T`: <a href="#ForbiddenHttpResponseHeader">#</a> headers.**ForbiddenHttpResponseHeader** • [source](./src/httpHeaders.ts)
 - `T`: <a href="#HttpMethod">#</a> methods.**HttpMethod** • [source](./src/httpMethods.ts)
 - `T`: <a href="#HttpStatusCode">#</a> statusCodes.**HttpStatusCode** • [source](./src/httpStatusCodes.ts)
 - `T`: <a href="#HttpInfoStatusCode">#</a> statusCodes.**HttpInfoStatusCode** • [source](./src/httpStatusCodes.ts)
 - `T`: <a href="#HttpSuccessStatusCode">#</a> statusCodes.**HttpSuccessStatusCode** • [source](./src/httpStatusCodes.ts)
 - `T`: <a href="#HttpRedirectStatusCode">#</a> statusCodes.**HttpRedirectStatusCode** • [source](./src/httpStatusCodes.ts)
 - `T`: <a href="#HttpClientErrorStatusCode">#</a> statusCodes.**HttpClientErrorStatusCode** • [source](./src/httpStatusCodes.ts)
 - `T`: <a href="#HttpServerErrorStatusCode">#</a> statusCodes.**HttpServerErrorStatusCode** • [source](./src/httpStatusCodes.ts)

## Usage

### Type the Fetch API

```ts
import '@neoncitylights/http-types/fetch';

let request = await fetch();
```

### Type `XmlHttpRequest`

```ts
import '@neoncitylights/http-types/xhr';

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', (e) => console.log(xhr.responseText));
xhr.open('GET', 'https://www.google.com');
xhr.send();
```

### Type the Node.js HTTP module

```ts
import '@neoncitylights/http-types/node';
```

## License

This library is licensed under the MIT license ([`LICENSE-MIT`](./LICENSE) or http://opensource.org/licenses/MIT).

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.
