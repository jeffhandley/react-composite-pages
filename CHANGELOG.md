# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.3.4"></a>
## [0.3.4](https://github.com/jeffhandley/react-composite-pages/compare/0.3.3...0.3.4) (2018-05-10)



# Change Log

## 0.3.3

Update `getContainerState` to guard against `window.ContainerState` being null or undefined.

## 0.3.2

Upgrade to React 15.1.0

## 0.2.0

### API changes

- RenderContainer --> Container
- RenderState --> ContainerState
- RenderClient --> ContainerClient
- RenderContainer.renderTemplate --> renderTemplate
	- renderTemplate no longer returns `state` and `clients` as components
	- Instead, `state` and `clients` are returned as an object and array respectively
- PageState and PageClients are introduced
	- These replace the components that were previously returned from `renderTemplate`

### Bug Fixes

- Fixes [#1](https://github.com/jeffhandley/react-composite-pages/issues/1)


## 0.1.3

- Initial publication
