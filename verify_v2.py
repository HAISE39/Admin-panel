import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 2000})
        await page.goto('http://localhost:3001')
        await asyncio.sleep(5)  # Wait for animations

        # Home
        await page.screenshot(path='/home/jules/verification/home_v2.png')

        # Scroll to About
        await page.evaluate("window.scrollTo(0, 1500)")
        await asyncio.sleep(2)
        await page.screenshot(path='/home/jules/verification/about_section.png')

        # Scroll to Skills
        await page.evaluate("window.scrollTo(0, 2500)")
        await asyncio.sleep(2)
        await page.screenshot(path='/home/jules/verification/skills_section.png')

        await browser.close()

asyncio.run(run())
