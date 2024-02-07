import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSafeHooks from "../hooks/SafeHooks";
import { useAccount, useChainId, useConfig, useWalletClient } from "wagmi";
import { useEthersSigner } from "../hooks/ethers";
import { useEffect, useState } from "react";
import { use } from "chai";
import { Account, Chain, Client, Transport } from "viem";

const Home: NextPage = () => {
    const { createTransaction } = useSafeHooks({});
    const signer = useEthersSigner();

    return (
        <div className={styles.container}>
            <Head>
                <title>RainbowKit App</title>
                <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <main className={styles.main}>
                <ConnectButton />

                <h1 className={styles.title}>
                    Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> + <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing <code className={styles.code}>pages/index.tsx</code>
                </p>

                <div className={styles.grid}></div>
                <a className={styles.card}>
                    <button onClick={createTransaction}>Sign</button>
                </a>

                <a className={styles.card} href="https://nextjs.org/learn">
                    <h2>Learn &rarr;</h2>
                    <p>Learn about Next.js in an interactive course with quizzes!</p>
                </a>
            </main>

            <footer className={styles.footer}>
                <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
                    Made with ❤️ by your frens at 🌈
                </a>
            </footer>
        </div>
    );
};

export default Home;
