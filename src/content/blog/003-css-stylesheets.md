---
title: "Style tag not inspectable"
description: "CSS Stylesheets, CSS in JS"
pubDate: "2023-06-19 11:18:44"
---

Today I came upon the strange phenomenon, that I couldn't inspect a certain animation on the [hacktoberfest.com](https://hacktoberfest.com/) site.
It was an CSS animation that was linked in the dev tools via `<style>`, but clicking on that I was just shown an empty `<style></style>` tag in the `<head>`.
Where did the styles go? (In Firefox I couldn't even click on the `::after` element in question.)

## CSSStyleSheets

Inspecting the `document.styleSheets` I found one `CSSStyleSheet` that had an href of null. This object contained more style rules than the bundled CSS files loaded via HTTP request.

Now I tried creating a new StyleSheet via

```javascript
const sheet = new CSSStyleSheet();
```

This worked.

I could now add a new rule with

```javascript
x.insertRule("body { background: teal; }");
```

That successfully gave me a new stylesheet object, but it still didn't show up in `document.styleSheets`, which is a [StyleSheetList](https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList). The list doesn't come with an add function, so what now?

## Add CSSStyleSheet to StyleSheetList

Google was my fried. I found this [gist by TigerWhite](https://gist.github.com/TigerWhite/a48442c7e1f6c5c9d8af9a4d54bd82a7), where it was described. In summary, we need to add a style tag to the head and get a reference to a new CSSStyleSheet, the new stylesheet already in the StyleSheetList. This explains the empty style tag we found in the head earlier.

```javascript
const style = document.createElement("style");

// some webkit workaround? What are you doing webkit?
style.appendChild(document.createTextNode(""));

document.head.appendChild(style);

const sheet = style.sheet;

sheet.insertRule("body { background: green; }");

// append to override (or use sheet.replaceRule)
sheet.insertRule("body { background: blue; }", sheet.rules.length);
```

We now have successfully set a background color for the page.

## Inspect the rule

We now just print out all the rules by mapping all rules to their `cssText` property, which is already in the CSS format.

```javascript
[...document.styleSheets[1].rules].map((rule) => rule.cssText).join("\n");
```

Run it in the console and copy the value over to an editor, we find the animation code, a 4 step change of some text content in the pseudo element:

```css
/* copyright hackathon.com */
...

@keyframes gkzhrW {
  25% { content: "01001000 01100001 01100011 01101011" " " "01001000 01100001 01100011 01101011" " " "01001000 01100001 01100011 01101011"; }
  50% { content: "01000111 01101001 01110100 00100001" " " "01000111 01101001 01110100 00100001" " " "01000111 01101001 01110100 00100001"; }
  75% { content: "01000110 01100101 01110011 01110100" " " "01000110 01100101 01110011 01110100" " " "01000110 01100101 01110011 01110100"; }
  100% { content: "01000111 01001100 01001000 01000110" " " "01000111 01001100 01001000 01000110" " " "01000111 01001100 01001000 01000110"; }
}

...
```

## Summary

CSS-in-JS is (still?) not inspector friendly. If you find yourself inspecting a CSS-in-JS site and can't find the styles, just print them out. Dev Tools should just display some greyed out rules inside the empty style tag.
