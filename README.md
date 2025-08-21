Easy way to allow people to remix your code.

Usage:

1. Place a `SPEC.md` in the folder you want to remix
2. Link to https://remix.forgithub.com/owner/repo (add branch and path if it's not the `main` branch or not `/` folder)

Demo:

- URL: https://remix.forgithub.com/janwilmake/forgithub.remix
- Button: [![](https://remix.forgithub.com/badge)](https://remix.forgithub.com/OWNER/REPO)
- Script: https://remix.forgithub.com/js.js

Use the button:

```
[![](https://remix.forgithub.com/badge)](https://remix.forgithub.com/OWNER/REPO)
```

Use the script in your website to add a remix button (or edit it to get your own variant). Please note that it will scan your html for a GitHub URL upon load, and will only render if it finds one.

```html
<script src="https://remix.forgithub.com/js.js"></script>
```
