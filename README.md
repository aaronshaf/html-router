Drop-in router.

## Quick start

### Hash router

Renders first match.

```html
<script src="https://unpkg.com/@aaronshaf/html-router@0/hash.js" type="module"></script>
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

### Pathname router

Renders first match.

```html
<script src="https://unpkg.com/@aaronshaf/html-router@0/pathname.js" type="module"></script>
```

```html
<ul>
  <li>
    <pushstate-link><a href="/foo">Foo</a></pushstate-link>
  </li>
  <li>
    <pushstate-link><a href="/bar">Bar</a></pushstate-link>
  </li>
  <li>
    <pushstate-link><a href="/baz">Baz</a></pushstate-link>
  </li>
</ul>
```

```html
<pathname-switch>
  <div data-path="/foo">
    <h1>Foo</h1>
  </div>

  <div data-path="/bar">
    <h1>Bar</h1>
  </div>

  <div data-path="(.*)">
    <h1>Not found</h1>
  </div>
</pathname-switch>
```

## Prevent flash of undefined content

```html
<style>
hash-switch:not(:defined),
pathname-switch:not(:defined) {
  visibility: hidden;
}
</style>
```

## Web components polyfill

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.4/webcomponents-loader.js"></script>
```
