import Home from "..";
import jobsJson from "../../../json/jobs.json";

export async function getStaticPaths() {
	let paths: { params: { page: string } }[] = [];

	const nPages = Math.ceil(jobsJson.length / 30);

	for (let i = 1; i < nPages + 1; i++) {
		paths.push({ params: { page: i.toString() } });
	}

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const sorted = Object.keys(jobsJson)
		.sort()
		.reduce((accumulator, key) => {
			accumulator[key] = jobsJson[key];

			return accumulator;
		}, {});

	return {
		props: {
			jobsArray: Object.values(sorted).slice(
				(params.page - 1) * 30,
				params.page * 30
			),
			nItems: Object.values(jobsJson).length,
			currentPage: params.page,
		},
	};
}

export default function StartupJobs({ jobsArray, nItems, currentPage }) {
	return (
		<Home jobsArray={jobsArray} nItems={nItems} currentPage={currentPage} />
	);
}
