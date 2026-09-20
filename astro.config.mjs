// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Static export so Vercel or Cloudflare Pages can serve docs.billionail.com
// without a server runtime. Parent wires DNS separately.
export default defineConfig({
	site: 'https://docs.billionail.com',
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'คู่มือแคชเชียร์ BillioNail',
			description: 'ศูนย์รวมคู่มือคิดเงินสำหรับแคชเชียร์ — สะสมแต้มและเครดิตสมาชิก',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'ไทย',
					lang: 'th',
				},
			},
			logo: {
				src: './src/assets/logo.svg',
				alt: 'BillioNail',
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			lastUpdated: true,
			pagination: true,
			sidebar: [
				{ label: 'หน้าแรก', link: '/' },
				{
					label: 'สะสมแต้ม (CRM)',
					items: [{ label: 'คู่มือสะสมแต้ม', slug: 'crm' }],
				},
				{
					label: 'เครดิตสมาชิก',
					items: [{ label: 'คู่มือเครดิต', slug: 'credit' }],
				},
			],
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#c2185b',
					},
				},
			],
		}),
	],
});
