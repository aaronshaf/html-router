Drop-in router.

## Usage

### Hash router

```html
<script src="https://unpkg.com/@aaronshaf/html-router@1/hash.js" type="module"></script>
```

#### Render first match ([example](https://aaronshaf.github.io/html-router/examples/hash-switch.html))

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

#### Standalone routes ([example](https://aaronshaf.github.io/html-router/examples/hash-route.html))

```html
<ul>
  <li><a href="#/">Home</a></li>
  <li><a href="#/foo">Foo</a></li>
  <li><a href="#/foo/bar">Foo and Bar</a></li>
</ul>
```

```html
<hash-route path="/">
  <h2>Home</h2>
</hash-route>

<hash-route path="/foo(.*)">
  <h2>Foo</h2>
</hash-route>

<hash-route path="/foo/bar">
  <h2>Bar</h2>
</hash-route>
```

### Pathname router

```html
<script src="https://unpkg.com/@aaronshaf/html-router@1/pathname.js" type="module"></script>
```

#### Render first match ([example](https://aaronshaf.github.io/html-router/examples/pathname-switch.html))

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

#### Standalone routes ([example](https://aaronshaf.github.io/html-router/examples/pathname-route.html))

```html
<ul>
  <li>
    <pushstate-link><a href="/foo">Foo</a></pushstate-link>
  </li>
  <li>
    <pushstate-link><a href="/foo/bar">Foo & Bar</a></pushstate-link>
  </li>
</ul>
```

```html
<pathname-route path="/foo(.*)">
  <h2>Foo</h2>
</pathname-route>

<pathname-route path="/foo/bar">
  <h2>Bar</h2>
</pathname-route>
```

## Access match params

Custom elements that are children of a route or switch can access match data at `this.match`.

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
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```
