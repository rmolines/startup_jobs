import Head from "next/head";
import Image from "next/image";
import { Inter, Leckerli_One, Lily_Script_One } from "next/font/google";
import useSWR from "swr";
import { HiExternalLink, HiSearch } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import Lottie from "react-lottie-player";
import loader from "../../../json/color-loader.json";
import { Gallery } from "@/components/Gallery";
import { JobList } from "@/components/JobList";
import { NavHeader } from "@/components/NavHeader";
import { StartupList } from "@/components/StartupList";
import startupJson from "../../../json/startups.json";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticPaths() {
	let paths: { params: { page: string } }[] = [];

	const nPages = Math.ceil(Object.keys(startupJson).length / 30);

	for (let i = 1; i < nPages + 1; i++) {
		paths.push({ params: { page: i.toString() } });
	}

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const sorted = Object.keys(startupJson)
		.sort()
		.reduce((accumulator, key) => {
			accumulator[key] = startupJson[key];

			return accumulator;
		}, {});

	return {
		props: {
			startupsArray: Object.values(sorted).slice(
				(params.page - 1) * 30,
				params.page * 30
			),
			nItems: Object.keys(sorted).length,
			currentPage: params.page,
		},
	};
}

export default function Home({ startupsArray, nItems, currentPage }) {
	const [itemsPage, setItemsPage] = useState(30);
	const [searchText, setSearchText] = useState("");
	const [gridItems, setGridItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (startupsArray) {
			setGridItems(StartupList({ startupsArray, searchText }));
			setLoading(false);
		}
	}, [searchText, startupsArray]);

	return (
		<>
			<Head>
				<title>As Melhores Startups do Brasil</title>
				<meta
					name="description"
					content="Encontre as melhores startups do Brasil investidas por fundos de venture capital como Y Combinator, Canary, Valor Capital, KASZEK, Domo Invest e Astella"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest"></link>
				{/* <!-- Primary Meta Tags --> */}
				<title>Vagas em Startups</title>
				<meta name="title" content="Vagas em Startups" />
				<meta
					name="description"
					content="Trabalhe nas melhores startups do Brasil"
				/>

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://www.vagasemstartups.com"
				/>
				<meta property="og:title" content="Vagas em Startups" />
				<meta
					property="og:description"
					content="Trabalhe nas melhores startups do Brasil"
				/>
				<meta property="og:image" content="meta_img.png" />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://www.vagasemstartups.com"
				/>
				<meta property="twitter:title" content="Vagas em Startups" />
				<meta
					property="twitter:description"
					content="Trabalhe nas melhores startups do Brasil"
				/>
				<meta property="twitter:image" content="meta_img.png"></meta>
			</Head>
			<main
				className={`w-full bg-blue-950 min-h-screen sm:pb-8 px-2 sm:px-4 xl:px-0 ${inter.className}`}
			>
				<div className="mx-auto container max-w-5xl flex flex-col items-center min-h-screen">
					<div className="max-w-full w-[56rem]">
						<h1 className="text-4xl sm:text-6xl px-8 font-semibold text-white mx-auto text-center mt-16">
							Encontre as melhores startups do Brasil
						</h1>
						<h3 className="text-xl sm:text-2xl font-extralight px-4 md:px-20 tracking-wide text-stone-200 mx-auto text-center mt-2">
							Procure por startups brasileiras investidas pelos
							maiores fundos de Venture Capital do mundo
						</h3>
					</div>
					<div className="border-b border-stone-300 w-full mt-16"></div>
					{loading ? (
						<div className="flex items-center justify-center grow h-full">
							<Lottie
								loop
								animationData={loader}
								play
								style={{ width: 250, height: 250 }}
							/>
						</div>
					) : (
						<>
							<Gallery
								type={"startups"}
								page={parseInt(currentPage)}
								itemsPage={itemsPage}
								setSearchText={setSearchText}
								gridItems={gridItems}
								nItems={nItems}
							/>
						</>
					)}
				</div>
			</main>
		</>
	);
}
