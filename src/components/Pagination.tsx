import Link from "next/link";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export function Pagination({ currentPage, nPages, type }) {
	return (
		<div className="flex gap-x-2 justify-center items-center self-baseline text-xl flex-wrap">
			<Link
				// onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : prev))}
				href={{
					pathname: `/${type}/${
						currentPage > 1 ? currentPage - 1 : currentPage
					}`,
				}}
			>
				<BsCaretLeftFill className="text-white" />
			</Link>
			{Array.from(Array(nPages).keys()).map((pageNum) => {
				console.log(
					currentPage,
					pageNum + 1,
					currentPage === pageNum + 1,
					typeof currentPage,
					typeof pageNum
				);
				return (
					<Link
						// onClick={() => setPage(pageNum)}
						href={{ pathname: `/${type}/${pageNum + 1}` }}
						className={`${
							currentPage === pageNum + 1
								? "text-white font-medium"
								: "text-gray-400 font-light hover:text-gray-200"
						}`}
						key={pageNum}
					>
						{pageNum + 1}
					</Link>
				);
			})}
			<Link
				href={{
					pathname: `/${type}/${
						currentPage < nPages ? currentPage + 1 : currentPage
					}`,
				}}
			>
				<BsCaretRightFill className="text-white" />
			</Link>
		</div>
	);
}
