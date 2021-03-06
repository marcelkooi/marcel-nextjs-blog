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

You might have [code](https://github.com/marcelkooi/typescript-example/blob/095eb7e1821e56389380a8e6b4b76e092d00ddea/src/index.ts) that looks like the following:

```typescript
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

const addTen = (input: number): number => {
  return input + 10;
}

app
  .use(bodyParser.json())
  .post('/', (req: Request, res: Response) => {
    const { input } = req.body;
    const newNum = addTen(input);
    res.send(`The new number is: ${newNum}`);
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
```

You CURL your API locally and see what you get when you enter 20.

```
$ curl -X POST localhost:3000 --data '{ "input": 20 }' -H "Content-Type: application/json"
The new number is: 30
```

Sweet. Seems to be working.

The next day, you try entering 50. But this time, you put quotes around your input for some reason.

```
$ curl -X POST localhost:3000 --data '{ "input": "50" }' -H "Content-Type: application/json"
The new number is: 5010
```

Hmmm, OK. Not what you were expecting. Let's check out the code.

The `addTen` function says the `input` variable is a number. So it must always be a number, right?

Not quite.

With TypeScript, you can't explicity enter a string as an argument to the `addTen` function without throwing a TS error. If you wrote a unit test for that function, you would get a compiler error when trying to use a string input. However, you are able to  enter an argument of type `any` for an argument that has to be a number. In this case, anything coming off the request body will be of type `any`, and to the compiler that means it _could_ be a number, so no complaints there.

So what now?

You have a few options:
1. Leave the code as is, and make sure you only send in numbers (integers or floats) and not strings
2. Change the code so that if you pass in a string, it gets parsed as an integer (e.g. `parseInt(input, 10)`)
3. Add a runtime data validation library such as [joi](https://github.com/sideway/joi) or [io-ts](https://github.com/gcanti/io-ts)
4. Keep returning wrong data (no judgment)

The key takeaway is to remember that the inputs to your app might be different than what you were expecting. Things like user inputs, database queries, and API requests can return data that is a different type than you may have specified it would be, and it's important to be aware of that.

Hope that helps!
