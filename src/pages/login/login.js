import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { alumni, lilita } from '@/lib/font';
import Navbar from '@/components/home/navbar/Navbar';
const Loader = dynamic(() => import('../../components/Loader'), { ssr: false });
export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            const userRole = data.user?.role;

            // Validate the selected role matches the actual role
            if (role && role !== userRole) {
                throw new Error('Selected role does not match your account role.');
            }

            // Redirect based on role
            if (userRole === 'admin') {
                router.push('/dashboard/admin');
            } else if (userRole === 'delivery') {
                router.push('/dashboard/delivery_agent');
            } else {
                router.push('/dashboard/customer');
            }

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
                <div className="bg-cyan-50 p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-[30px] font-bold mb-6 text-center"><span className={lilita.className}>Login</span></h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="space-y-4 text-[20px]" onSubmit={handleLogin}>
                        <div>
                            <label className="block mb-1 font-medium"><span className={alumni.className}>Email</span></label>
                            <input
                                type="email"
                                className="w-full border rounded p-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium"> <span className={alumni.className}>Password </span></label>
                            <input
                                type="password"
                                className="w-full border rounded p-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium"><span className={alumni.className}> Role</span></label>
                            <select
                                className="w-full border rounded p-2"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="delivery">Delivery Agent</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-900 text-white py-2 rounded hover:bg-cyan-700"
                        >
                            Login
                        </button>
                    </form>
                    <p className='text-center mt-3 text-[15px] font-bold'>Dont have an account? <Link href='/login/signup'><span className='text-blue-700 underline'>Signup</span></Link></p>
                </div>
            </div>
        </div>
    );
}
