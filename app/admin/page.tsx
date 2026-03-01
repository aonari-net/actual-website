"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { Loader2, User, Key, DollarSign, Edit2, Check, X, ShieldAlert } from "lucide-react"

interface AdminUser {
    id: number
    name: string | null
    email: string
    adminNickname: string | null
    plan: string | null
    price: string | null
    licenseKey: string | null
}

export default function AdminPage() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingUserId, setEditingUserId] = useState<number | null>(null)
    const [newNickname, setNewNickname] = useState("")

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users")
            if (res.status === 403) {
                setError("Access Denied: Your IP is not authorized to view this page.")
                setLoading(false)
                return
            }
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            setError("Failed to fetch users. Please make sure the server is healthy.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleUpdateNickname = async (userId: number) => {
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, adminNickname: newNickname }),
            })

            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, adminNickname: newNickname } : u))
                setEditingUserId(null)
            }
        } catch (err) {
            alert("Failed to update nickname")
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-6 border border-red-500/20">
                    <ShieldAlert className="w-12 h-12" />
                </div>
                <h1 className="text-2xl font-bold text-primary mb-2">Admin Panel Access Restricted</h1>
                <p className="text-muted-foreground max-w-sm">{error}</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Control Center</h1>
                        <p className="text-muted-foreground mt-1">Manage user licenses and profile identification.</p>
                    </motion.div>

                    <div className="bg-card/50 border border-border rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-secondary/50 border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">User Profile</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Admin Label</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pricing</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">License Key</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-accent/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-primary">{user.name || "Anonymous User"}</p>
                                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingUserId === user.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={newNickname}
                                                            onChange={(e) => setNewNickname(e.target.value)}
                                                            className="bg-background border border-border rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
                                                            autoFocus
                                                        />
                                                        <button onClick={() => handleUpdateNickname(user.id)} className="text-green-500 hover:text-green-600">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => setEditingUserId(null)} className="text-muted-foreground hover:text-red-500">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 group/nick">
                                                        <span className={`text-xs font-medium ${user.adminNickname ? "text-primary" : "text-muted-foreground italic"}`}>
                                                            {user.adminNickname || "None set"}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                setEditingUserId(user.id)
                                                                setNewNickname(user.adminNickname || "")
                                                            }}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
                                                        >
                                                            <Edit2 className="w-3 h-3 text-muted-foreground" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-bold text-primary dark:text-gray-200 bg-secondary/80 px-2 py-0.5 rounded border border-border">
                                                        ${user.price || "0.00"}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                                        {user.plan || "Free"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.licenseKey ? (
                                                    <div className="flex items-center gap-2 font-mono text-[11px] text-primary bg-primary/5 px-3 py-1 rounded inline-flex">
                                                        <Key className="w-3 h-3 opacity-50" />
                                                        {user.licenseKey}
                                                    </div>
                                                ) : (
                                                    <span className="text-[11px] text-muted-foreground italic">No key assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm italic">
                                                No users found in the system.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
