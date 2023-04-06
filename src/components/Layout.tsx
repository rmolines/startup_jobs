import { NavHeader } from "./NavHeader";

export default function Layout({ children }) {
	return (
		<>
			<NavHeader />
			<main>{children}</main>
		</>
	);
}
