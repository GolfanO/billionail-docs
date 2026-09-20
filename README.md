# Billionail Docs

คู่มือแคชเชียร์แบบสแตติกสำหรับ **https://docs.billionail.com/**

เขียนภาษาไทยก่อน อ่านบนมือถือได้ โทนชมพูร้านแบบ [billionail.com/crm](https://billionail.com/crm/) หมวดแยกชัด เติมหมวดใหม่ได้เรื่อยๆ

| หน้าที่แคชเชียร์เปิด | URL |
| --- | --- |
| หน้าแรก (อ่านอะไรก่อน) | https://docs.billionail.com/ |
| สะสมแต้ม (CRM) | https://docs.billionail.com/crm/ |
| เครดิตสมาชิก | https://docs.billionail.com/credit/ |

เดพลอยด้วย GitHub Actions → GitHub Pages ทุกครั้งที่ push `main` (Vercel ลิงก์รีโปนี้ไม่ได้เพราะ GitHub App)

DNS ของ `docs.billionail.com` **ยังไม่ตั้งในงานนี้** — Golf ตั้งที่ผู้ให้บริการโดเมนเอง

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

1. สร้างโฟลเดอร์ใต้ `src/pages/` ชื่อสั้นภาษาอังกฤษ เช่น `pos`, `reports`, `timeclock`
2. ใส่ `index.astro` ในโฟลเดอร์นั้น ใช้ `GuideLayout` จาก `src/layouts/GuideLayout.astro`

```astro
---
import GuideLayout from '../../layouts/GuideLayout.astro';
---

<GuideLayout
	title="จุดขาย"
	description="คู่มือแคชเชียร์จอคิดเงิน"
	heading="คู่มือแคชเชียร์ — จุดขาย"
	current="home"
>
	<section class="hero">
		<h2>จุดขาย</h2>
		<p>เขียนขั้นตอนภาษาไทยสั้นๆ ที่นี่</p>
	</section>
</GuideLayout>
```

3. เปิด `src/layouts/GuideLayout.astro` แล้วเพิ่มลิงก์ในแถบหมวดด้านบน (`hub`)
4. ใส่การ์ดหรือลิงก์ใน `src/pages/index.astro` หมวดคู่มือตอนนี้ และย้ายชื่อออกจากหมวดที่จะเพิ่ม
5. รัน `pnpm build` ให้ผ่าน แล้วเปิดพรีวิวเช็กมือถือ

หมวดที่ยังไม่มีหน้า: จุดขาย (`/pos/`), รายงาน (`/reports/`), ลงเวลา (`/timeclock/`)

## เดพลอย GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml`  
คำสั่งบิลด์: `pnpm i && pnpm build` แล้วอัปโหลดโฟลเดอร์ `dist/`  
โดเมนในบิลด์: `public/CNAME` = `docs.billionail.com` (Astro คัดลอกเข้า `dist/`)

### สิ่งที่ต้องเปิดในรีโป (ครั้งเดียว)

GitHub App / Vercel ลิงก์รีโปนี้ไม่ได้ — ใช้ Pages แทน ตั้งค่าด้วยมือ:

1. **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**  
   ถ้ายังไม่เลือก รัน workflow รอบแรกจะเดพลอยไม่ขึ้น — เลือกแล้วไปที่ Actions กด **Re-run** ของ workflow `Deploy docs to GitHub Pages`
2. **Settings → Pages → Custom domain** ใส่ `docs.billionail.com` แล้ว Save  
   ไฟล์ `CNAME` ในรีโปอย่างเดียวไม่พอ GitHub ต้องบันทึกโดเมนในหน้า Settings ด้วย
3. รอใบรับรองแล้วติ๊ก **Enforce HTTPS**
4. รีโปนี้เป็น private: ไซต์ Pages ยังเปิดสาธารณะบนอินเทอร์เน็ต ถ้าแพ็กเกจบัญชีไม่รองรับ Pages จากรีโป private ให้เช็กแผน GitHub

หลังเดพลอยสำเร็จ GitHub จะโชว์ URL ประมาณ `https://golfano.github.io/billionail-docs/` จนกว่า DNS จะชี้โดเมนจริง

### DNS ที่ Golf ต้องตั้ง (งานนี้ไม่ตั้งให้)

ที่โซน `billionail.com`:

| Type | Name | Target |
| --- | --- | --- |
| **CNAME** | **`docs`** | **`GolfanO.github.io`** |

นั่นคือ `docs.billionail.com` → `GolfanO.github.io` (ไม่ใส่ path ท้าย เช่น `/billionail-docs` — CNAME ชี้ได้แค่โฮสต์)  
ถ้าหน้า Settings → Pages โชว์โฮสต์คนละตัว ให้ใช้โฮสต์ที่ GitHub แสดงแทน

อย่าสร้างระเบียนอื่นทับชื่อ `docs` (เช่น A หรือ CNAME ชี้ Vercel)

## สแต็ก

- Astro เพจสแตติก (`output: 'static'`) — ไม่มีเซิร์ฟเวอร์ เดพลอยด้วย GitHub Pages
- เลย์เอาต์โทนชมพูร้านตาม [billionail.com/crm](https://billionail.com/crm/) (ฟอนต์ Prompt + Noto Sans Thai, การ์ดอุ่น, แถบหมวดด้านบน)
- ภาษาหลักคือไทย (`lang="th"`) ไม่มี prefix `/th/`

## รูปหน้าจอ

แคปจอ POS ของสะสมแต้มอยู่ที่ `public/images/crm/`  
หน้า `/crm/` โชว์การ์ดชมพู หน้าต่างแลกรางวัล และรหัส LINE 6 หลัก แล้ว
