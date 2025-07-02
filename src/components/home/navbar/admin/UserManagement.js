import React, { useEffect, useState } from "react";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [confirmRoleChange, setConfirmRoleChange] = useState(null); // { userId, newRole, name }
    const [updatingUserId, setUpdatingUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users", { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleSelect = (userId, name, newRole) => {
        setConfirmRoleChange({ userId, newRole, name });
    };

    const confirmChange = async () => {
        const { userId, newRole } = confirmRoleChange;
        setUpdatingUserId(userId);

        try {
            const res = await fetch("/api/users/update-role", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userId, newRole }),
            });

            if (!res.ok) throw new Error("Failed to update role");

            const data = await res.json();
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, role: data.user.role } : u
                )
            );
            setConfirmRoleChange(null);
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setUpdatingUserId(null);
        }
    };

    const cancelChange = () => {
        setConfirmRoleChange(null);
    };

    if (loading) return <p className="p-4">Loading users...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">User Management</h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Email</th>
                            <th className="text-left px-4 py-3">Role</th>
                            <th className="text-left px-4 py-3">Created At</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No users found.</td>
                            </tr>
                        )}
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 capitalize">{user.role}</td>
                                <td className="px-4 py-2">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleSelect(user._id, user.name, e.target.value)
                                        }
                                        disabled={updatingUserId === user._id}
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="delivery">Delivery</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {confirmRoleChange && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
                        <p className="text-gray-800 font-medium mb-4">
                            Are you sure you want to change the role for <span className="text-cyan-700 font-bold">{confirmRoleChange.name}</span> to <span className="capitalize font-bold">{confirmRoleChange.newRole}</span>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelChange}
                                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmChange}
                                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
