# Change Log

## 0.3.0

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
