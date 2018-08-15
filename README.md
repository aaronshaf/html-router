Drop-in router.

## Quick start

```html
<script src="https://unpkg.com/@aaronshaf/html-router@0.0.1/index.js" type="module"></script>
```

```html
<ul>
  <li><a href="#/foo">Foo</a></li>
  <li><a href="#/bar">Bar</a></li>
  <li><a href="#/baz">Baz</a></li>
</ul>
```

```html
<hash-switch>
  <div data-path="/foo">
    <h1>Foo</h1>
  </div>

  <div data-path="/bar">
    <h1>Bar</h1>
  </div>

  <div data-path="(.*)">
    <h1>Not found</h1>
  </div>
</hash-switch>
```

## Web components polyfill

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js"></script>
```
