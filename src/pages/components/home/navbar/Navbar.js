import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                setIsLoggedIn(false);
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
        setIsLoggedIn(false);
        router.push('/login/login');
    };


    return (
        <nav className="bg-white shadow-md fixed w-full z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-xl font-bold text-gray-800">Courier.Jx</div>

                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>

                        {isLoggedIn ? (
                            <button onClick={handleLogout} className='py-1 px-5 border-2 rounded-xl bg-red-900 text-red-100'>Logout</button>
                        ) : (
                            <Link href='/login/login'>
                                <button className='py-1 px-5 border-2 rounded-xl bg-cyan-900 text-cyan-100'>Login</button>
                            </Link>
                        )}
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

                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="block w-full text-left text-green-700">Logout</button>
                        ) : (
                            <Link href="/login/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
