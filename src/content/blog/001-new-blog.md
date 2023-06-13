---
title: "New Blog"
description: "Stack, contents, what."
pubDate: "2023-06-12"
updatedDate: "2023-06-12 15:00"
---

This blog is built with Astro as Static Site Generator. After trying to set up a similar blog using [11ty](https://www.11ty.dev/), which was also island capable (using `<is-land>` components), but failing for 4.5 hours I went with Astro, which took 0.5h to set up.

## Islands

Since I might want to add some demo components to my blog posts the island architecture makes a lot of sense, since it creates extra bundles per page, and doesn't blow up the global bundle size. Other approaches would be to embed e.g. a <a href="https://www.codepen.io" target="_blank">pen from Codepen</a> via iFrame. I might switch to iFrames later, if I have to install too many packages to build the example components.

## Misc

- Prettier didn't run for this blog post after an update to VS Code `1.79.0`. There is a workaround for that bug [here](https://github.com/prettier/prettier-vscode/issues/3020).
- VS Codes path autosuggest needs an extra setting to find images in public under the root `/`:

```json
{
	"path-intellisense.mappings": {
		"/": "${workspaceFolder}/public"
	}
}
```

- Use the VS Code Extension [Insert Date String](https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring) to update the frontmatter updatedAt tags of md(x) files in Astro. Will check if a function similar to PHPs `filemtime` can be used.
