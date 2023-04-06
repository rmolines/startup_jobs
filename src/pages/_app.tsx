import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function reportWebVitals(metric: NextWebVitalsMetric) {
	if (metric.label === "web-vital") {
		window.gtag("event", name, {
			event_category: "web-vital",
			value: Math.round(
				metric.name === "CLS" ? metric.value * 1000 : metric.value
			), // values must be integers
			event_label: metric.id, // id unique to current page load
			non_interaction: true, // avoids affecting bounce rate.
		});
	}
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<GoogleAnalytics trackPageViews />
			<Component {...pageProps} />
		</Layout>
	);
}
