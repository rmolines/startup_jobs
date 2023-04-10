import { HiSearch } from "react-icons/hi";
import { Pagination } from "./Pagination";

export function Gallery(props: {
	page: number;
	setPage: (arg0: number) => any;
	setSearchText: (arg0: string) => void;
	gridItems: string | any[];
	itemsPage: number;
}) {
	console.log(props.page, props.itemsPage, props.gridItems);
	return (
		<>
			{props.gridItems && props.gridItems.length > 0 ? (
				<div className="flex flex-col items-center gap-y-12 mt-16">
					<div>
						<Pagination
							currentPage={props.page}
							nPages={Math.ceil(
								props.gridItems.length / props.itemsPage
							)}
							setPage={props.setPage}
						/>
					</div>
					<div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
						{props.gridItems.slice(
							props.page * props.itemsPage,
							(props.page + 1) * props.itemsPage
						)}
					</div>
					<div className="mb-16">
						<Pagination
							currentPage={props.page}
							nPages={Math.ceil(
								props.gridItems.length / props.itemsPage
							)}
							setPage={props.setPage}
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-y-12 h-full grow">
					<span className="text-xl font-medium text-white pb-16">
						Não existe resultado para sua busca
					</span>
				</div>
			)}
		</>
	);
}
