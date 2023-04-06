import Home from "..";
import startupJson from "../../../json/startups.json";

export async function getStaticPaths() {
	let paths: { params: { pageParam: Number } }[] = [];

	const nPages = Math.ceil(Object.keys(startupJson).length / 30);

	for (let i = 0; i++; i < nPages) {
		paths.push({ params: { pageParam: i } });
	}

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params: { pageParam } }) {
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			startupData: startupJson,
		},
	};
}

export default function StartupJobs({ startupData }) {
	return <Home startupData={startupData} />;
}
