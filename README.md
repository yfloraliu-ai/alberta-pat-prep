# Alberta PAT Prep 🍁

AI-powered practice platform for Alberta Grade 6 students preparing for the
Provincial Achievement Tests (PATs).

一個幫助 Alberta 省六年級學生準備省考（PAT）的 AI 學習平台。

## Features / 功能

- **Practice Questions 練習題** — AI generates PAT-style multiple-choice
  questions for all four subjects (ELA Reading, Mathematics, Science, Social
  Studies), by topic and difficulty, with explanations for every answer.
- **Writing Coach 作文批改** — Submit narrative or functional writing (the two
  ELA Part A assignments) and get rubric-based scores and feedback aligned
  with the official marking categories.
- **Demo mode 演示模式** — Works without an API key using sample data, so you
  can try the interface before setting up billing.

## Getting Started / 快速開始

```bash
npm install
cp .env.example .env.local   # then put your Anthropic API key in .env.local
npm run dev
```

Open http://localhost:3000.

**API key（API 金鑰）**: create one at https://console.anthropic.com and set it
in `.env.local` as `ANTHROPIC_API_KEY=sk-ant-...`. The key is only read on the
server (API routes) and is never sent to the browser. Never commit `.env.local`
to git（金鑰只在伺服器端使用，不會傳到瀏覽器，也絕對不要 commit 進 git）.

Without a key, the app runs in demo mode and returns sample questions and
feedback.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) —
  Claude generates questions and marks writing

## Roadmap / 開發計劃

- [ ] Student accounts and progress tracking（學生帳號與學習進度）
- [ ] Mistake book: retry the questions you got wrong（錯題本）
- [ ] Personalized practice targeting weak areas（針對弱項的個人化出題）
- [ ] Timed full mock exams（計時模擬考）
- [ ] School ranking lookup from public Fraser Institute data（學校排名查詢）
- [ ] French Language Arts / Français support

## Disclaimer

Independent study tool — not affiliated with or endorsed by Alberta Education.
Question styles are modelled on publicly documented PAT formats.
