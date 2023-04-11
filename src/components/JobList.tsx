import kaszekLogo from "../../public/logos/kaszek.png";
import astellaLogo from "../../public/logos/astella.png";
import canaryLogo from "../../public/logos/canary.svg";
import domoLogo from "../../public/logos/domo.jpeg";
import valorLogo from "../../public/logos/valor.svg";
import ycLogo from "../../public/logos/yc.png";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import Image from "next/image";

export function JobList({ jobsArray, searchText }) {
	let nJobs = 0;
	let jobs = [];

	jobsArray.forEach((job, ind) => {
		const searchableText = `${job.companyName}${job.position}${
			job.location
		}${
			job.investors && job.investors.map((investor) => investor)
		}`.toLowerCase();

		if (!searchableText.includes(searchText.toLowerCase())) return;
		nJobs += 1;

		jobs.push(
			<div
				key={job.companyName + job.position + nJobs}
				className="rounded-lg relative bg-white shadow p-3 sm:p-6 sm:pt-0 flex sm:flex-col justify-between"
			>
				<Link
					className="sm:hidden absolute h-full w-full z-10 top-0 left-0 rounded-lg"
					href={
						job.source === "gupy"
							? job.jobsUrl + job.url.slice(1, -1)
							: job.url
					}
					target="_blank"
				/>
				<div className="basis-1/4 flex-none h-full flex items-center">
					<div className="w-full flex items-center relative justify-center h-full sm:h-56 overflow-hidden">
						{job.logo ? (
							<Image
								placeholder="blur"
								blurDataURL={"/companyLogos" + job.logo}
								src={"/companyLogos" + job.logo}
								alt="logo" // className="absolute inset-x-0"
								className="h-full w-auto object-scale-down"
								fill
							/>
						) : (
							<>
								<div className="hidden sm:block text-5xl font-bold text-center">
									{job.companyName}
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
										{job.companyName}
									</p>
								</foreignObject>
							</>
						)}
					</div>
				</div>
				<div className="flex flex-col grow justify-between pl-4 sm:pl-0">
					<div>
						<div className="leading-tight font-medium text-xs mb-1 text-gray-500	">
							{job.level}
						</div>
						<div className="text-lg font-semibold leading-tight">
							{job.position}
						</div>
						<div className="leading-tight mt-1">
							{job.companyName}
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
							<div className="flex flex-wrap items-center gap-x-2">
								{job.investors.map((investor) => {
									let investorDiv = [];

									if (investor === "Kaszek") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
												<Image
													src={kaszekLogo}
													alt="logo"
												/>
											</div>
										);
									}

									if (investor === "Canary") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
												<Image
													src={canaryLogo}
													alt="logo"
												/>
											</div>
										);
									}

									if (investor === "Domo") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
												<Image
													src={domoLogo}
													alt="logo"
												/>
											</div>
										);
									}

									if (investor === "Astella") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
												<Image
													src={astellaLogo}
													alt="logo"
												/>
											</div>
										);
									}

									if (investor === "Valor") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
												<Image
													src={valorLogo}
													alt="logo"
												/>
											</div>
										);
									}

									if (investor === "Y Combinator") {
										investorDiv.push(
											<div className="basis-1/3 sm:1/2">
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
						</div>
						<Link
							className="hidden sm:flex bg-blue-900 py-2 px-3 text-white rounded-lg w-fit sm:mt-8 self-start items-center gap-x-1"
							href={
								job.source === "gupy"
									? job.jobsUrl + job.url.slice(1, -1)
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
	return jobs;
}
