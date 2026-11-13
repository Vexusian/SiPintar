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

        if (!username.trim() || !password.trim()) {
            setErrorMessage('Silakan masukkan username dan password.');
            setLoading(false);
            return;
        }

        // Tampilan awal (Frontend mode): Simulasi login guru
        setTimeout(() => {
            if (onLoginSuccess) {
                onLoginSuccess({ 
                    username: username, 
                    nama_guru: username 
                });
            }
            setLoading(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4 relative font-sans text-slate-800">
            {/* Badge UI-001 */}
            <div className="absolute top-6 left-6">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold border border-[#7ba2c2] text-[#2b6288] bg-white/70 shadow-xs">
                    UI-001
                </span>
            </div>

            {/* Card Login */}
            <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-300 shadow-sm p-8 sm:p-10">
                {/* Header SiPintar */}
                <div className="text-left">
                    <h1 className="text-2xl sm:text-[26px] font-bold text-[#1e3e5c] tracking-tight">
                        SiPintar
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Sistem Informasi Akademik Sekolah
                    </p>
                </div>

                {/* Garis Pembatas */}
                <hr className="my-6 border-slate-200" />

                {/* Sub-header */}
                <div className="text-left mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">
                        Masuk sebagai Guru
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Gunakan akun guru yang telah terdaftar.
                    </p>
                </div>

                {/* Form Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2b6288] focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2b6288] focus:border-transparent transition-all pr-11"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-2.5 sm:py-3 bg-[#2b6288] hover:bg-[#235070] active:bg-[#1b405a] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Memverifikasi...' : 'Masuk'}
                    </button>
                </form>

                <p className={`text-center text-xs mt-4 leading-relaxed transition-colors ${errorMessage ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                    {errorMessage || 'Pesan kesalahan tampil di sini jika data akun tidak sesuai.'}
                </p>
            </div>
        </div>
    );
}
