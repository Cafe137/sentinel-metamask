import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import walletSetup from './wallet-setup/basic.setup'

const test = testWithSynpress(metaMaskFixtures(walletSetup))

test('Buy stamps with BZZ on Gnosis', async ({ context, page, metamaskPage, extensionId }) => {
    const metamask = new MetaMask(context, metamaskPage, walletSetup.walletPassword, extensionId)
    await page.goto('/')
    await page.locator('data-testid=rk-connect-button').click()
    await page.locator('data-testid=rk-wallet-option-io.metamask').click()
    await metamask.connectToDapp()
    await page.locator('img[alt="Ethereum"]').click()
    await page.locator('img[alt="Gnosis"]').click()
    await metamask.approveNewNetwork()
    await metamask.approveSwitchNetwork()
    await page.locator('span').filter({ hasText: '7.7GB' }).click()
    await page.locator('span').filter({ hasText: '110MB' }).click()
    await page.locator('span').filter({ hasText: 'Please select duration' }).click()
    await page.locator('span').filter({ hasText: '2 days' }).click()
    await page.locator('button').filter({ hasText: 'Execute Swap' }).click()
    await metamask.confirmTransaction()
    await page
        .locator('div')
        .filter({
            hasText: '⏱️ New storage created: It takes around 1 minute before it becomes accessible on the network.'
        })
        .waitFor()
})
