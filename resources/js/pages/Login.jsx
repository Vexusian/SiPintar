import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        if (!username || !password) {
            setErrorMessage('Silakan masukkan username dan password.');
            setLoading(false);
            return;
        }

        // Tampilan awal (Frontend mode): Guru bisa login dengan username & password apa saja secara bebas
        setTimeout(() => {
            onLoginSuccess({ 
                username: username, 
                nama_guru: username 
            });
            setLoading(false);
        }, 300);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-slate-200 p-8">
                {/* Header Login */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800 mt-2">SiPintar</h1>
                    <p className="text-sm text-slate-500">Sistem Informasi Akademik Sekolah</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-base font-semibold text-slate-800">Masuk sebagai Guru</h2>
                    <p className="text-xs text-slate-500">Gunakan akun guru yang telah terdaftar.</p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showPassword ? 'Tutup' : 'Lihat'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow transition disabled:opacity-50"
                    >
                        {loading ? 'Memverifikasi...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
}
