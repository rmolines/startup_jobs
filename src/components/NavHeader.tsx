import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

export function NavHeader(props: {}) {
	return (
		<div className="h-16 border-white w-full px-4 xl:px-0 bg-blue-950">
			<nav className="container max-w-5xl h-full flex mx-auto items-center justify-between gap-x-4">
				<Link
					href="/"
					className="h-full w-fit flex items-center gap-x-2 basis-1/3 justify-start"
				>
					<Image
						src={logo}
						alt="logo"
						className="h-2/5 w-auto my-auto"
					/>
					<h1 className="text-white hidden sm:block text-xl whitespace-nowrap">
						VagasEmStartups.com
					</h1>
				</Link>

				<div className="h-full flex items-center justify-end gap-x-8 basis-1/3">
					<Link
						href="/"
						className="text-white text-lg hover:text-stone-200 transition-colors"
					>
						Vagas
					</Link>
					<Link
						href="/startups"
						className="text-white text-lg hover:text-stone-200 transition-colors"
					>
						Startups
					</Link>
					<Link
						href="#"
						className="text-white text-lg hover:text-stone-200 transition-colors"
					>
						Blog
					</Link>
				</div>
			</nav>
		</div>
	);
}
