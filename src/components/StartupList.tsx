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

export function StartupList({ data, searchText }) {
	let nJobs = 0;
	return Object.keys(data)
		.sort()
		.map((key, ind) => {
			const searchableText = `${key.toLowerCase()} ${
				data[key].investors &&
				data[key].investors.map((investor) => investor.toLowerCase())
			}`.split(" ");
			if (
				searchableText.filter((s) => s.startsWith(searchText))
					.length === 0
			)
				return;
			return (
				<div
					key={key}
					className="rounded bg-white shadow p-6 pt-0 flex flex-col justify-between"
				>
					<div>
						<div className="w-full flex items-center justify-center h-56 overflow-hidden">
							{data[key].logo ? (
								<img
									src={data[key].logo}
									placeholder={loaderGif}
									alt="logo"
								/>
							) : (
								<div className="text-5xl font-bold text-center">
									{key}
								</div>
							)}
						</div>
					</div>
					<div>
						<div className="text-lg font-semibold leading-tight">
							{key}
						</div>
						<div className="leading-tight mt-1">
							{data[key].companyInfo}
						</div>
					</div>
					<div className="flex flex-col grow justify-end">
						<div className="mt-8">
							<div className="flex flex-col">
								<div className="text-sm text-stone-700 font-semibold">
									Investidores
								</div>
								<div className="flex flex-wrap mt-2"></div>
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
							<div className="flex justify-start gap-x-2 items-center w-full">
								<Link
									className="bg-blue-900 border-blue-900 border-2 py-1.5 px-2.5 text-white h-full rounded-lg w-fit mt-8 self-end flex items-center gap-x-1"
									href={{
										pathname: "/",
										query: {
											searchParam: key.toLowerCase(),
										},
									}}
								>
									Vagas
								</Link>
								<Link
									className="border-blue-900 border-2 py-1.5 px-2.5 h-full text-blue-900 rounded-lg w-fit mt-8 self-end flex items-center gap-x-1"
									href={data[key].companyUrl}
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
}
