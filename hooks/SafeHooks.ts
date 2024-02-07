import React, { useEffect } from 'react'
import { useSignMessage } from 'wagmi';
import { EthersAdapter } from '@safe-global/protocol-kit'
import Safe from '@safe-global/protocol-kit'
import SafeApiKit, {
    OwnerResponse,
    ProposeTransactionProps,
} from '@safe-global/api-kit'
import { MetaTransactionData, SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { useEthersProvider, useEthersSigner } from './ethers'
import { AbstractSigner, Provider, ethers } from 'ethers'


type Props = {}

const SAFE_WALLET = "0xC4445f5bE5BBD7D0dBf297F46EA9FF54c102d8Aa";
const SAFE_OWNER = "0x8D582d98980248F1F0849710bd0626aDE4c44E3D";

export type SafeHooks = {
    signTransaction: () => Promise<void>;
    createTransaction: () => Promise<void>;
    sendTransaction: () => Promise<void>;
}



const useSafeHooks = (props: Props): SafeHooks => {
    const provider = useEthersProvider()
    const signer = useEthersSigner()

    const { signMessage } = useSignMessage()
    const [protocolKit, setProtocolKit] = React.useState<Safe | null>(null);
    const [safeApiKit, setSafeApiKit] = React.useState<SafeApiKit | null>(null);

    useEffect(() => {
        if (signer === undefined) {
            console.log('No signer found');
            return;
        }
        initializeProtocolKit(signer);
        initialiseSafeApiKit(provider);
    }, [signer])

    const initializeProtocolKit = async (signer: ethers.JsonRpcSigner | undefined) => {
        let unwrapperSigner = await signer
        let ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: unwrapperSigner as Provider | AbstractSigner<Provider | null>,
        })

        const protocolKit: Safe = await Safe.create({
            ethAdapter,
            safeAddress: SAFE_WALLET,
        });
        setProtocolKit(protocolKit);
    }

    const initialiseSafeApiKit = async (provider: ethers.JsonRpcProvider | ethers.FallbackProvider) => {

        const safeApiKit = new SafeApiKit({
            chainId: (await provider._detectNetwork()).chainId,
        });

        setSafeApiKit(safeApiKit);
    }


    const signTransaction = async () => {
        signMessage({ message: 'hello world' })
    }

    const createTransaction = async () => {
        if (protocolKit === null) {
            console.log('No protocol kit found');
            return;
        }
        const transactions: MetaTransactionData[] = [
            {
                to: SAFE_OWNER,
                data: '0x',
                value: (100).toString(16),
                // operation: 0 // optional
            }
            // ...
        ]
        const safeTransaction = await protocolKit.createTransaction({ transactions });
        console.log(safeTransaction);

        if (safeApiKit === null) {
            console.log('No safe api kit found');
            return;
        }

        const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)

        const signature = await protocolKit.signHash(safeTxHash)

        safeApiKit.proposeTransaction({
            safeAddress: SAFE_WALLET,
            safeTransactionData: safeTransaction.data,
            safeTxHash: safeTxHash,
            senderAddress: SAFE_OWNER,
            senderSignature: signature.data,
        });

    }


    const sendTransaction = async () => {

    }


    return { signTransaction, createTransaction, sendTransaction }
}

export default useSafeHooks