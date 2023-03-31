import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import useSWR from "swr";
import { HiExternalLink } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import kaszekLogo from "../../public/logos/kaszek.png";
import astellaLogo from "../../public/logos/astella.png";
import canaryLogo from "../../public/logos/canary.svg";
import domoLogo from "../../public/logos/domo.jpeg";
import valorLogo from "../../public/logos/valor.svg";
import ycLogo from "../../public/logos/yc.png";

const inter = Inter({ subsets: ["latin"] });

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format

function JobsList({ data, page, itemsPage, searchText }) {
	let nJobs = 0;
	let jobsList = [];

	Object.keys(data).forEach((key, ind) => {
		if (data[key].jobsList) {
			data[key].jobsList.forEach((job, indJob) => {
				// if (nJobs > 10) return;

				const searchableText =
					`${key.toLowerCase()} ${job.position.toLowerCase()} ${job.location.toLowerCase()} ${
						job.investors &&
						job.investors.map((investor) => investor).toLowerCase()
					}`.split(" ");

				if (
					searchableText.filter((s) => s.startsWith(searchText))
						.length === 0
				)
					return;

				nJobs += 1;
				jobsList.push(
					<div
						key={nJobs}
						className="rounded bg-white shadow p-6 flex flex-col justify-between"
					>
						<div>
							<div className="w-full flex items-center justify-center h-64 overflow-hidden">
								{data[key].logo ? (
									<img src={data[key].logo} />
								) : (
									<div className="text-5xl font-bold text-center">
										{key}
									</div>
								)}
							</div>
						</div>
						<div className="flex flex-col grow justify-between">
							<div>
								<div className="text-lg font-semibold leading-tight">
									{job.position}
								</div>
								<div className="text-sm mt-2 text-stone-700">
									{job.location}
								</div>
							</div>
							<div className="mt-8">
								<div className="flex flex-col">
									<div className="text-sm text-stone-700 font-semibold">
										Investidores
									</div>
									<div className="flex flex-wrap mt-2"></div>
									{data[key].investors.map((investor) => {
										let investorDiv = [];
										console.log(data[key]);

										if (investor === "Kaszek") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={kaszekLogo} />
												</div>
											);
										}
										if (investor === "Canary") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={canaryLogo} />
												</div>
											);
										}
										if (investor === "Domo") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={domoLogo} />
												</div>
											);
										}
										if (investor === "Astella") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={astellaLogo} />
												</div>
											);
										}
										if (investor === "Valor") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={valorLogo} />
												</div>
											);
										}
										if (investor === "Y Combinator") {
											investorDiv.push(
												<div className="w-1/2">
													<Image src={ycLogo} />
												</div>
											);
										}
										return investorDiv;
									})}
								</div>
								<a
									className="bg-blue-900 py-2 px-3 text-white rounded-lg w-fit mt-8 self-start flex items-center gap-x-1"
									href={
										data[key].source === "gupy"
											? data[key].jobsUrl + job.url
											: job.url
									}
									target="_blank"
								>
									Aplicar
									<HiExternalLink className="text-lg" />
								</a>
							</div>
						</div>
					</div>
				);
			});
		}
	});

	return jobsList;
}

function Pagination({ currentPage, setPage, nPages }) {
	return (
		<div className="flex gap-x-2 justify-center mt-16 items-center self-baseline text-xl flex-wrap">
			<button
				onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : prev))}
			>
				<BsCaretLeftFill className="text-white" />
			</button>
			{Array.from(Array(nPages).keys()).map((pageNum) => (
				<button
					onClick={() => setPage(pageNum)}
					className={`${
						currentPage == pageNum
							? "text-white font-medium"
							: "text-slate-500 font-light"
					}`}
					key={pageNum}
				>
					{pageNum + 1}
				</button>
			))}
			<button
				onClick={() =>
					setPage((prev) => (prev < nPages - 1 ? prev + 1 : prev))
				}
			>
				<BsCaretRightFill className="text-white" />
			</button>
		</div>
	);
}

export default function Home() {
	const [page, setPage] = useState(0);
	const [itemsPage, setItemsPage] = useState(30);
	const [searchText, setSearchText] = useState("");
	const [jobsList, setJobsList] = useState([]);

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR("/api/startupdata", fetcher);

	useEffect(() => {
		if (data) {
			setJobsList(JobsList({ data, page, itemsPage, searchText }));
		}
	}, [data]);

	return (
		<>
			<Head>
				<title>Vagas em Startups</title>
				<meta
					name="description"
					content="Trabalhe nas melhores startups do Brasil"
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
					content="Trabalhe nas melhores startups do Brail"
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
					content="Trabalhe nas melhores startups do Brail"
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
					content="Trabalhe nas melhores startups do Brail"
				/>
				<meta property="twitter:image" content="meta_img.png"></meta>
			</Head>
			<main className="w-full bg-blue-950 min-h-screen px-4">
				<div className="mx-auto container max-w-4xl pt-16 md:pt-32 pb-8">
					<h1 className="text-8xl text-white font-bold mx-auto text-center">
						Vagas em Startups
					</h1>
					<h3 className="text-3xl font-light text-white mx-auto text-center mt-8">
						Trabalhe nas melhores startups do Brasil
					</h3>
					<Pagination
						currentPage={page}
						nPages={Math.ceil(jobsList.length / itemsPage)}
						setPage={setPage}
					/>
					<input
						className="bg-stone-50 w-96 rounded-lg border-2 border-stone-300 px-2.5 py-1 mt-8"
						placeholder="Pesquisar..."
						onChange={(event) => {
							page > 0 && setPage(0);
							setSearchText(event.target.value);
						}}
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-12">
						{jobsList &&
							jobsList.slice(
								page * itemsPage,
								(page + 1) * itemsPage
							)}
					</div>
					<Pagination
						currentPage={page}
						nPages={Math.ceil(jobsList.length / itemsPage)}
						setPage={setPage}
					/>
				</div>
			</main>
		</>
	);
}
