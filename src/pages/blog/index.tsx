import Head from "next/head";
import { Inter } from "next/font/google";
import { getSortedPostsData } from "../../../lib/posts";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Blog({ allPostsData }) {
	console.log(allPostsData);
	return (
		<>
			<Head>
				<title>Vagas em Startups</title>
				<meta
					name="description"
					content="Encontre vagas de trabalho nas melhores startups do Brasil investidas por fundos de venture capital como Y Combinator, Canary, Valor Capital, KASZEK, Domo Invest e Astella"
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
					<section className="">
						<div className="">
							<h2 className="text-white">Blog</h2>
							<ul className="grid grid-cols-3 gap-x-2">
								{allPostsData.map(({ id, date, title }) => (
									<li className="bg-white rounded" key={id}>
										{title}
										<br />
										{id}
										<br />
										{date}
									</li>
								))}
							</ul>
						</div>
					</section>
				</div>
			</main>
		</>
	);
}
