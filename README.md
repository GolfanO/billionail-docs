# Billionail Docs

คู่มือแคชเชียร์แบบสแตติกสำหรับ **https://docs.billionail.com/**

เขียนภาษาไทยก่อน อ่านบนมือถือได้ หมวดแยกชัด เติมหมวดใหม่ได้เรื่อยๆ

| หน้าที่แคชเชียร์เปิด | URL |
| --- | --- |
| หน้าแรก (อ่านอะไรก่อน) | https://docs.billionail.com/ |
| สะสมแต้ม (CRM) | https://docs.billionail.com/crm/ |
| เครดิตสมาชิก | https://docs.billionail.com/credit/ |

DNS ของ `docs.billionail.com` ยังไม่ตั้งในรีโปนี้ — เดพลอยสแตติกบน Vercel หรือ Cloudflare Pages แล้วชี้โดเมนทีหลัง

## รันบนเครื่อง

ต้องการ Node 22+ และ [pnpm](https://pnpm.io/)

```bash
pnpm install
pnpm dev
```

เปิด http://localhost:4321/ — หน้าแรก แล้วไล่ `/crm/` กับ `/credit/`

บิลด์สแตติก (ต้องผ่านก่อนเดพลอย):

```bash
pnpm build
```

ไฟล์พร้อมเสิร์ฟอยู่ที่ `dist/` ดูตัวอย่างโลคอลด้วย `pnpm preview`

## เพิ่มหมวดใหม่ (เช่น จุดขาย / รายงาน / ลงเวลา)

ไม่ต้องแตะ DNS แค่เพิ่มหน้าแล้วบิลด์ใหม่

1. สร้างโฟลเดอร์ใต้ `src/content/docs/` ชื่อสั้นภาษาอังกฤษ เช่น `pos`, `reports`, `timeclock`
2. ใส่ `index.mdx` ในโฟลเดอร์นั้น อย่างน้อยมี `title` กับ `description`

```mdx
---
title: จุดขาย
description: คู่มือแคชเชียร์จอคิดเงิน
---

เขียนขั้นตอนภาษาไทยสั้นๆ ที่นี่
```

3. เปิด `astro.config.mjs` แล้วเพิ่มกลุ่มใน `sidebar` — นี่คือเมนูด้านข้างที่แคชเชียร์เห็น

```js
{
  label: 'จุดขาย',
  items: [{ label: 'คู่มือจุดขาย', slug: 'pos' }],
}
```

`slug: 'pos'` จะได้ URL `/pos/` เพราะตั้ง `trailingSlash: 'always'` ไว้แล้ว

4. ใส่การ์ดหรือลิงก์ใน `src/content/docs/index.mdx` หมวดคู่มือตอนนี้ และย้ายชื่อออกจากตารางหมวดที่จะเพิ่ม
5. รัน `pnpm build` ให้ผ่าน แล้วเปิดพรีวิวเช็กมือถือ

หมวดที่ยังไม่มีหน้า: จุดขาย (`/pos/`), รายงาน (`/reports/`), ลงเวลา (`/timeclock/`)

## สแต็ก

- [Astro Starlight](https://starlight.astro.build/) — แถบหมวด + ค้นหา Pagefind
- `output: 'static'` ใน `astro.config.mjs` — ไม่ต้องมีเซิร์ฟเวอร์ เดพลอย Vercel หรือ Cloudflare Pages ได้
- ภาษาหลักคือไทย (`locales.root.lang = 'th'`) ไม่มี prefix `/th/`

## รูปหน้าจอ

ถ้ายังไม่มีแคปจอ POS อย่าใส่ไฟล์ปลอม ใช้ลำดับขั้นตอนไปก่อน  
มีรูปแล้ววางใน `src/assets/` แล้วอ้างใน `.mdx`
