import { HiSearch } from "react-icons/hi";
import { Pagination } from "./Pagination";
import { type } from "os";

export function Gallery(props: {
	type: string;
	page: number;
	gridItems: string | any[];
	itemsPage: number;
	nItems: number;
}) {
	return (
		<>
			{props.gridItems && props.nItems > 0 ? (
				<div className="flex flex-col items-center gap-y-12 mt-16">
					<div>
						<Pagination
							type={props.type}
							currentPage={props.page}
							nPages={Math.ceil(props.nItems / props.itemsPage)}
						/>
					</div>
					<div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
						{props.gridItems}
					</div>
					<div className="mb-16">
						<Pagination
							type={props.type}
							currentPage={props.page}
							nPages={Math.ceil(props.nItems / props.itemsPage)}
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
