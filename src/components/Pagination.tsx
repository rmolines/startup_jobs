import Link from "next/link";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export function Pagination({ currentPage, setPage, nPages }) {
	return (
		<div className="flex gap-x-2 justify-center items-center self-baseline text-xl flex-wrap">
			<Link
				// onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : prev))}
				href={{
					pathname: "",
					query: {
						pageParam:
							currentPage > 0 ? currentPage - 1 : currentPage,
					},
				}}
			>
				<BsCaretLeftFill className="text-white" />
			</Link>
			{Array.from(Array(nPages).keys()).map((pageNum) => (
				<Link
					// onClick={() => setPage(pageNum)}
					href={{ pathname: "", query: { pageParam: pageNum } }}
					className={`${
						currentPage == pageNum
							? "text-white font-medium"
							: "text-stone-500 font-light hover:text-stone-200"
					}`}
					key={pageNum}
				>
					{pageNum + 1}
				</Link>
			))}
			<Link
				// onClick={() =>
				// 	setPage((prev) => (prev < nPages - 1 ? prev + 1 : prev))
				// }
				href={{
					pathname: "",
					query: {
						pageParam:
							currentPage < nPages - 1
								? currentPage + 1
								: currentPage,
					},
				}}
			>
				<BsCaretRightFill className="text-white" />
			</Link>
		</div>
	);
}
