import { BrowserContext, Page } from '@playwright/test'
import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask } from '@synthetixio/synpress/playwright'
import { Types } from 'cafe-utility'

const SEED_PHRASE = Types.asString(process.env.TEST_WALLET_SEED_PHRASE)
const PASSWORD = Types.asString(process.env.TEST_WALLET_PASSWORD)

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
    const metamask = new MetaMask(context as BrowserContext, walletPage as Page, PASSWORD)
    await metamask.importWallet(SEED_PHRASE)
})
