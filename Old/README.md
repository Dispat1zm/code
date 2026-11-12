# code
npm i -g bun
bun --watch platform/src/index.ts
git add . && git commit -m "" && git push origin master
bun i @hono/zod-validator