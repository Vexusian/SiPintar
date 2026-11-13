import React, { useState } from 'react';

export default function UpdateNilai({ user, siswaData, onUpdate, onCancel }) {
    const [nilai, setNilai] = useState(siswaData?.nilai ?? '');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const numericNilai = parseFloat(nilai);
        if (isNaN(numericNilai) || numericNilai < 0 || numericNilai > 100) {
            setErrorMessage('Nilai harus berupa angka antara 0 sampai 100.');
            return;
        }

        setLoading(true);
        try {
            // Memanggil callback onUpdate
            await onUpdate(siswaData.id_siswa, siswaData.id_mapel, numericNilai);
        } catch (err) {
            setErrorMessage('Gagal memperbarui nilai. Silakan coba kembali.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                    <span className="font-bold text-lg tracking-wide">SiPintar</span>
                    <span className="text-xs text-slate-300 hidden md:inline">Sistem Informasi Akademik Sekolah</span>
                </div>
                <div className="text-xs text-slate-300">
                    Guru | {user?.nama_guru || 'Profil'}
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="mb-4">
                        <h1 className="text-xl font-bold text-slate-800">Edit Nilai</h1>
                        <p className="text-xs text-slate-500 mt-1">Data Siswa dan Mata Pelajaran / Edit Nilai</p>
                    </div>

                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
                            {errorMessage}
                        </div>
                    )}

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-sm">
                                <div>
                                    <span className="text-xs text-slate-400 block">Siswa:</span>
                                    <span className="font-semibold text-slate-800">{siswaData?.nama_siswa}</span>
                                    <span className="text-xs text-slate-500 block font-mono">NIS: {siswaData?.nis}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Mata Pelajaran:</span>
                                    <span className="font-semibold text-slate-800">{siswaData?.nama_mapel}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Nilai</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    required
                                    placeholder="Masukkan nilai baru"
                                    value={nilai}
                                    onChange={(e) => setNilai(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <p className="text-[11px] text-slate-400 mt-1">Masukkan satu nilai untuk siswa ini.</p>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition disabled:opacity-50"
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
