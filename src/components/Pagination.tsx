import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export function Pagination({ currentPage, setPage, nPages }) {
	return (
		<div className="flex gap-x-2 justify-center items-center self-baseline text-xl flex-wrap">
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
							: "text-stone-500 font-light hover:text-stone-200"
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
