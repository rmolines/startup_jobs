import kaszekLogo from "../../public/logos/kaszek.png";
import astellaLogo from "../../public/logos/astella.png";
import canaryLogo from "../../public/logos/canary.svg";
import domoLogo from "../../public/logos/domo.jpeg";
import valorLogo from "../../public/logos/valor.svg";
import ycLogo from "../../public/logos/yc.png";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import Image from "next/image";

export function JobList({ data, searchText }) {
	let nJobs = 0;
	let jobsList = [];

	Object.keys(data)
		.sort()
		.forEach((key, ind) => {
			if (data[key].jobsList) {
				data[key].jobsList.forEach((job, indJob) => {
					// if (nJobs > 10) return;
					const searchableText = `${key.toLowerCase()}${job.position.toLowerCase()}${job.location.toLowerCase()}${
						data[key].investors &&
						data[key].investors.map((investor) =>
							investor.toLowerCase()
						)
					}`; // console.log(searchableText);
					// if (
					// 	searchableText.filter((s) => s.includes(searchText))
					// 		.length === 0
					// )
					// 	return;

					if (!searchableText.includes(searchText)) return;
					nJobs += 1;
					jobsList.push(
						<div
							key={key + job.position + nJobs}
							className="rounded-lg relative bg-white shadow p-3 sm:p-6 sm:pt-0 flex sm:flex-col justify-between"
						>
							<Link
								className="sm:hidden absolute h-full w-full z-10 top-0 left-0 rounded-lg"
								href={
									data[key].source === "gupy"
										? data[key].jobsUrl + job.url
										: job.url
								}
								target="_blank"
							/>
							<div className="basis-1/4 flex-none h-full flex items-center">
								<div className="w-full flex items-center relative justify-center sm:h-56 overflow-hidden">
									{data[key].logo ? (
										<img
											src={data[key].logo}
											placeholder={
												"../../public/color-loader.gif"
											}
											alt="logo" // className="absolute inset-x-0"
										/>
									) : (
										<>
											<div className="hidden sm:block text-5xl font-bold text-center">
												{key}
											</div>
											<foreignObject
												width={"100%"}
												height={"100%"}
												xmlns="http://www.w3.org/2000/svg"
												className="sm:hidden"
											>
												<p
													xmlns="http://www.w3.org/1999/xhtml"
													className="text-center font-semibold"
												>
													{key}
												</p>
											</foreignObject>
										</>
									)}
								</div>
							</div>
							<div className="flex flex-col grow justify-between pl-4 sm:pl-0">
								<div>
									<div className="text-lg font-semibold leading-tight">
										{job.position}
									</div>
									<div className="leading-tight mt-1">
										{key}
									</div>
									<div className="text-sm mt-1 font-light text-stone-500">
										{job.location}
									</div>
								</div>
								<div className="mt-2 sm:mt-4">
									<div className="flex flex-col justify-end">
										<div className="text-sm text-stone-700 mb-1">
											Investidores
										</div>
										{data[key].investors.map((investor) => {
											let investorDiv = [];

											if (investor === "Kaszek") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={kaszekLogo}
															alt="logo"
														/>
													</div>
												);
											}

											if (investor === "Canary") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={canaryLogo}
															alt="logo"
														/>
													</div>
												);
											}

											if (investor === "Domo") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={domoLogo}
															alt="logo"
														/>
													</div>
												);
											}

											if (investor === "Astella") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={astellaLogo}
															alt="logo"
														/>
													</div>
												);
											}

											if (investor === "Valor") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={valorLogo}
															alt="logo"
														/>
													</div>
												);
											}

											if (investor === "Y Combinator") {
												investorDiv.push(
													<div className="w-1/3 sm:1/2">
														<Image
															src={ycLogo}
															alt="logo"
														/>
													</div>
												);
											}

											return investorDiv;
										})}
									</div>
									<Link
										className="hidden sm:flex bg-blue-900 py-2 px-3 text-white rounded-lg w-fit sm:mt-4 self-start items-center gap-x-1"
										href={
											data[key].source === "gupy"
												? data[key].jobsUrl + job.url
												: job.url
										}
										target="_blank"
									>
										Aplicar
										<HiExternalLink className="text-lg" />
									</Link>
								</div>
							</div>
						</div>
					);
				});
			}
		});
	return jobsList;
}
