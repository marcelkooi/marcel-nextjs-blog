---
title: Using the Node REPL with packages
date: '2021-05-31'
---

The Node REPL is a useful tool for experimenting with different packages.

<br>

For example, if I wanted to make sure that the functions I'm using in the `date-fns` package behaved as expected, I can start a node REPL session, import the package, and test out some of its functionality:

```sh
$ node
```

```js
const dateFns = require('date-fns')

dateFns.subDays(new Date(), 3) // returns 2021-05-28T16:03:24.476Z
dateFns.formatRelative(dateFns.subDays(new Date(), 3), new Date()) // returns 'last Friday at 12:06 PM'
```

As long as you have the package installed locally or globally, you can enter your Node REPL and try it out.
