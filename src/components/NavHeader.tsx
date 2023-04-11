import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";
import router from "next/router";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";

export function NavHeader() {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="h-16 border-white w-full px-4 xl:px-0 bg-blue-950">
			<nav className="container max-w-5xl h-full flex mx-auto items-center justify-between gap-x-4">
				<Link
					href="/"
					className="h-full w-fit flex items-center gap-x-2 md:basis-1/3 justify-start"
				>
					<Image
						src={logo}
						alt="logo"
						className="h-2/5 w-auto my-auto"
					/>
					<h1 className="text-white hidden md:block text-xl whitespace-nowrap font-medium">
						VagasEmStartups.com
					</h1>
				</Link>

				<div className="h-full flex items-center justify-end gap-x-8 md:basis-2/3">
					<Link
						href="/"
						className="text-white text-lg hover:text-stone-200 transition-colors font-light"
					>
						Vagas
					</Link>
					<Link
						href="/startups/1"
						className="text-white text-lg hover:text-stone-200 transition-colors font-light"
					>
						Startups
					</Link>
					{/* <Link
						href="#"
						className="text-white text-lg hover:text-stone-200 transition-colors font-light"
					>
						Blog
					</Link> */}
					<div className="relative flex max-w-xs w-full">
						<HiSearch className="absolute inset-y-0 h-full left-2 text-slate-400" />
						<input
							className="bg-stone-50 mx-auto w-full pl-7 rounded-lg border-2 border-stone-300 px-2 py-0.5"
							placeholder="Pesquisar..."
							value={searchText}
							onChange={(event) => {
								setSearchText(event.target.value);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									router.push({
										pathname: "/search/1",
										query: { search: searchText },
									});
								}
							}}
						/>
					</div>
				</div>
			</nav>
		</div>
	);
}
