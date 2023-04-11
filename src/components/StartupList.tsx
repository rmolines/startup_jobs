import { HiExternalLink } from "react-icons/hi";
import loaderGif from "../../public/color-loader.gif";
import kaszekLogo from "../../public/logos/kaszek.png";
import astellaLogo from "../../public/logos/astella.png";
import canaryLogo from "../../public/logos/canary.svg";
import domoLogo from "../../public/logos/domo.jpeg";
import valorLogo from "../../public/logos/valor.svg";
import ycLogo from "../../public/logos/yc.png";
import Image from "next/image";
import Link from "next/link";

export function StartupList({ startupsArray, searchText }) {
	let startupList = [];

	startupsArray.forEach((startup, ind) => {
		const searchableText = `${startup.companyName}${
			startup.investors && startup.investors.map((investor) => investor)
		}`.toLowerCase();

		if (!searchableText.includes(searchText.toLowerCase())) return;

		startupList.push(
			<div
				key={startup.companyName}
				className="rounded bg-white shadow p-6 pt-0 flex flex-col justify-between"
			>
				<div>
					<div className="w-full flex relative items-center justify-center h-56 overflow-hidden">
						{startup.logo ? (
							<Image
								placeholder="blur"
								blurDataURL={"/companyLogos" + startup.logo}
								src={"/companyLogos" + startup.logo}
								alt="logo" // className="absolute inset-x-0"
								className="h-full w-auto object-scale-down"
								fill
							/>
						) : (
							<div className="text-5xl font-bold text-center">
								{startup.companyName}
							</div>
						)}
					</div>
				</div>
				<div>
					<div className="text-lg font-semibold leading-tight">
						{startup.companyName}
					</div>
					<div className="leading-tight mt-1">
						{startup.companyInfo}
					</div>
				</div>
				<div className="flex flex-col grow justify-end">
					<div className="mt-8">
						<div className="flex flex-col">
							<div className="text-sm text-stone-700 font-semibold">
								Investidores
							</div>
							<div className="flex flex-wrap items-center gap-x-2">
								{startup.investors &&
									startup.investors.map((investor) => {
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
						<div className="flex justify-start gap-x-2 items-center w-full">
							{startup.jobsList &&
							startup.jobsList.length === 0 ? (
								<div className="bg-gray-300 border-gray-300 border-2 py-1.5 px-2.5 text-white h-full rounded-lg w-fit mt-8 self-end flex items-center gap-x-1">
									{`${
										startup.jobsList &&
										startup.jobsList.length
									} vagas`}
								</div>
							) : (
								<Link
									className="bg-blue-900 border-blue-900 border-2 py-1.5 px-2.5 text-white h-full rounded-lg w-fit mt-8 self-end flex items-center gap-x-1"
									href={{
										pathname: "/search/1",
										query: {
											search: startup.companyName.toLowerCase(),
										},
									}}
								>
									{`${
										startup.jobsList &&
										startup.jobsList.length
									} vagas`}
								</Link>
							)}
							<Link
								className="border-blue-900 border-2 py-1.5 px-2.5 h-full text-blue-900 rounded-lg w-fit mt-8 self-end flex items-center gap-x-1"
								href={startup.companyUrl}
								target="_blank"
							>
								Home
								<HiExternalLink className="text-lg" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return startupList;
}
