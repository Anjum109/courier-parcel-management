import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { BsPersonCircle } from "react-icons/bs";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null); // { email, role } or null
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            }
        };

        // Initial check
        checkLogin();

        // Re-check login on route change
        router.events.on('routeChangeComplete', checkLogin);
        return () => {
            router.events.off('routeChangeComplete', checkLogin);
        };
    }, [router.events]);

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        setUser(null);
        router.push('/login/login');
    };

    // Helper to show dashboard label
    const getDashboardLabel = (role) => {
        switch (role) {
            case 'admin':
                return 'Admin Dashboard';
            case 'delivery':
                return 'Delivery Agent Dashboard';
            default:
                return 'User Dashboard';
        }
    };

    // Helper to get dashboard link
    const getDashboardLink = (role) => {
        switch (role) {
            case 'admin':
                return '/dashboard/admin';
            case 'delivery':
                return '/dashboard/delivery';
            default:
                return '/dashboard/customer';
        }
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-xl font-bold text-gray-800">Courier.Jx</div>

                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>

                        {user && (
                            <Link
                                href={getDashboardLink(user.role)}
                                className="py-1 px-4 border rounded bg-green-700 text-white hover:bg-green-600"
                            >
                                {getDashboardLabel(user.role)}
                            </Link>
                        )}

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="py-1 px-5 border-2 rounded-xl bg-red-900 text-red-100"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login/login">
                                <button className="py-1 px-5 border-2 rounded-xl bg-cyan-900 text-cyan-100">Login</button>
                            </Link>
                        )}
                        <div className="text-[25px]"><BsPersonCircle />

                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 py-3 space-y-1">
                        <Link href="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
                        <Link href="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>

                        {user && (
                            <Link
                                href={getDashboardLink(user.role)}
                                className="block text-green-700 font-semibold"
                            >
                                {getDashboardLabel(user.role)}
                            </Link>
                        )}

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left text-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
                        )}
                    </div>

                </div>
            )}
        </nav>
    );
}
