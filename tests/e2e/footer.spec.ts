import { expect, test } from '@playwright/test'
/*
const footerLinks = [
  {
    linkName: 'Ambassador Program',
    linkAddress:
      'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/ambassador-program',
  },
  {
    linkName: 'Artist Ambassador',
    linkAddress:
      'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/artist-ambassador-program',
  },
  {
    linkName: 'Referral Program',
    linkAddress:
      'https://hello.kodadot.xyz/be-part-of-kodadot/kodadots-programs/artist-referral-program',
  },
  {
    linkName: 'Developers',
    linkAddress: 'https://developers.kodadot.xyz/',
  },
  {
    linkName: 'FAQ',
    linkAddress: 'https://hello.kodadot.xyz/ecosystem/faq',
  },
  {
    linkName: 'Tutorial',
    linkAddress: 'https://hello.kodadot.xyz/tutorial/wallet',
  },
  {
    linkName: 'About',
    linkAddress: 'https://hello.kodadot.xyz/about-us/who-are-we',
  },
  {
    linkName: 'Careers',
    linkAddress:
      'https://hello.kodadot.xyz/be-part-of-kodadot/join-as-a-developer/hiring',
  },
  {
    linkName: 'Press Kit',
    linkAddress: 'https://github.com/kodadot/kodadot-presskit/tree/main/pre-v4',
  },
  {
    linkName: 'MerchShop',
    linkAddress: 'https://shop.kodadot.xyz/',
  },
]
*/
const footerSocialMediaLinks = [
  {
    linkName: 'Twitter',
    linkAddress: 'https://twitter.com/KodaDot',
  },
  {
    linkName: 'Discord',
    linkAddress: 'https://discord.com/invite/u6ymnbz4PR',
  },
  {
    linkName: 'Substack',
    linkAddress: 'https://kodadot.substack.com',
  },
  //{
  //  linkName: 'Medium',
  //  linkAddress: 'https://medium.com/kodadot',
  //},
  {
    linkName: 'Youtube',
    linkAddress: 'https://www.youtube.com/channel/UCEULduld5NrqOL49k1KVjoA',
  },
  //{
  //  linkName: 'Instagram',
  //  linkAddress: 'https://instagram.com/kodadot.xyz',
  // },
  {
    linkName: 'Reddit',
    linkAddress: 'https://www.reddit.com/r/KodaDot/',
  },
]

test('Check Footer Subscription', async ({ page }) => {
  await page.goto('/')
  const footerSubscribe = page.getByTestId('footer-subscribe')
  await page.getByPlaceholder('jane.doe@kodadot.xyz').fill('a')
  await footerSubscribe.locator('button').click()
  await expect(footerSubscribe.locator('.error')).toBeVisible()
})
/*
test('Check Footer links', async ({ page }) => {
  await page.goto('/')
  for (const data of footerLinks) {
    const footer = page.getByTestId('footer-container')
    const newTabPromise = page.waitForEvent('popup')
    await footer.getByRole('link', { name: data.linkName }).click()
    const newTab = await newTabPromise
    await newTab.waitForLoadState()
    await expect(newTab).toHaveURL(data.linkAddress)
    await newTab.close()
  }
})
*/
test('Check blog link', async ({ page }) => {
  await page.goto('/')
  const footer = page.getByTestId('footer-container')
  await footer.getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL('http://localhost:9090/blog')
})

test('Check Social Media Links', async ({ page }) => {
  await page.goto('/')
  for (const data of footerSocialMediaLinks) {
    const socialMedia = page.locator('.footer-container-socials-list')
    const newTabPromise = page.waitForEvent('popup')
    await socialMedia.locator(`[aria-label="${data.linkName}"]`).click()
    const newTab = await newTabPromise
    await newTab.waitForLoadState()
    await expect(newTab).toHaveURL(data.linkAddress)
    await newTab.close()
  }
})
