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
$ curl -X POST localhost:3000 \
    --data '{ "input": 20 }' \
    -H "Content-Type: application/json"
The new number is: 30
```

Sweet. Seems to be working.

The next day, you try entering 50. But this time, you put quotes around your input for some reason.

```
$ curl -X POST localhost:3000 \
    --data '{ "input": "50" }' \
    -H "Content-Type: application/json"
The new number is: 5010
```

Hmmm, OK. Not what you were expecting. Let's check out the code.

The `addTen` function says the `input` variable is a number. So it must always be a number, right?

Not quite.

With TypeScript, you can't explicity enter a string as an argument to the `addTen` function (without throwing a TS error), but it will let you enter an argument of type `any` for an argument that has to be a number, which is what anything coming off the request body will be.