---
title: 'How TypeScript Can Fool You'
date: '2020-07-29'
---

[TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript that allows you to add optional static typing. It's a great tool for large projects with a lot of moving parts and multiple developers making changes. It's also useful for smaller projects where you want to be more confident that the changes you're making won't blow up in production. With that said, there are some "gotchas" that I wasn't aware of with TypeScript that seem obvious to me now, but I wish I had known sooner.

<div class="flex justify-center my-8">
  <img src="/images/3/typescript-trollface.png" alt="typescript-trollface" class="h-56 rounded" />
</div>

One thing to understand about TypeScript is that it helps you catch type errors at compile time, and _not_ runtime. It's a development tool for writing JavaScript. This means that once you compile your TypeScript code, you're still running JavaScript on your server or browser.


Let's see how this works in practice. Say you had an API that lets users enter a number, and it will return that number plus 10. Probably not the most useful API, but someone is paying you to build it, so why not.

You might have code that looks like the following:

<script src="http://gist-it.appspot.com/https://github.com/marcelkooi/typescript-example/blob/f5e99a2e8a4d886b55ed9fbd4342ea5a3ce4e602/src/index.ts"></script>

You CURL your API locally and see what you get when you enter 20.

```
$ curl -X POST localhost:3000 --data '{ "input": 20 }' -H "Content-Type: application/json"
The new number is: 30
```

Sweet. Seems to be working.

The next day, you try 30. But this time, you put quotes around your input for some reason.

```
$ curl -X POST localhost:3000 --data '{ "input": "30" }' -H "Content-Type: application/json"
The new number is: 3010
```

Hmmm, OK. Not what you were expecting.
