# cdqa-ui

[![Build Status](https://travis-ci.com/fmikaelian/cdQA-ui.svg?token=Vzy9RRKRZ41ynd9q2BRX&branch=master)](https://travis-ci.com/fmikaelian/cdQA-ui)
[![NPM Version](https://img.shields.io/npm/v/cdqa-ui.svg)](https://www.npmjs.com/package/cdqa-ui)
[![NPM Downloads](https://img.shields.io/npm/dm/cdqa-ui.svg)](https://www.npmjs.com/package/cdqa-ui)
![NPM Downloads](https://img.shields.io/npm/l/cdqa-ui.svg)

A user interface for cdQA

## Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Import](#import)
- [Usage](#usage)
- [Properties](#properties)
- [Development](#development)
- [License](#license)

## Installation

```shell
npm install cdqa-ui
```

## Import

```javascript
import Vue from 'vue'
import CdqaUI from 'cdqa-ui'

Vue.use(CdqaUI)
```

`cdqa-ui` relies on [`bootstrap-vue`](https://bootstrap-vue.js.org/), an external dependency that is not bundled with the component. Therefore you also need to import `bootstrap-vue` in your app entrypoint:

```javascript
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"

Vue.use(BootstrapVue)

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
```

## Usage

```xml
<CdqaUI api_endpoint="http://localhost:5000/api"></CdqaUI>
```

## Properties

| Name            | Type              | Default     | Description                        |
| ---             | ---               | ---         | ---                                |
| api_endpoint           | string           | `http://localhost:5000/api`       | The url of your `cdQA` REST API. |

## Development

Clone the repository

```shell
git clone https://github.com/fmikaelian/cdQA-ui
cd cdQA-ui
```

Compiles and hot-reloads for development

```shell
npm run serve
```

Compiles and minifies for production

```shell
npm run build
```

This repo is based on [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup), a minimal setup to produce npm-ready vue components. Releases are done automatically on master pushes (see [travis.yml](travis.yml)).

## License

MIT