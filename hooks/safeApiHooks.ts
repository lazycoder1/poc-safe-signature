import React from 'react'

type Props = {}

const safeApiUrl = "https://safe-transaction-sepolia.safe.global/"
const actionPathMap = {
    sendConfirmations: "/v1/multisig-transactions/{safe_tx_hash}/confirmations/",
    getConfirmations: "/v1/multisig-transactions/{safe_tx_hash}/confirmations/",
    createTransaction: "/v1/safes/{address}/multisig-transactions/",

}


const safeApiHooks = (props: Props) => {

}

export default safeApiHooks