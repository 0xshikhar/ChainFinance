import Navbar from "../components/navigation/navbar";

export default function MainLayout({ children }) {
	return (
		<div className="bg-gradient-to-r from-blue-500 to-blue-900 ">
            <Navbar />
            {children}
		</div>
	);
}
// bg-gradient-to-t from-blue-500 to-blue-600
// bg-gradient-to-r from-gray-700 via-gray-900 to-black