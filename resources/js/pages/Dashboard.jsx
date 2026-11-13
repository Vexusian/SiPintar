import React, { useState } from 'react';

export default function Dashboard({ user, onLogout, onNavigateToTambah, onNavigateToEdit, siswaList, selectedMapel, setSelectedMapel }) {
    const [searchKeyword, setSearchKeyword] = useState('');

    const mapelOptions = [
        { id: 1, nama: 'Matematika' },
        { id: 2, nama: 'Bahasa Indonesia' },
    ];

    const filteredSiswa = siswaList.filter(item => {
        const matchMapel = selectedMapel ? item.id_mapel === Number(selectedMapel) : true;
        const matchSearch = item.nama_siswa.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                            item.nis.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchMapel && matchSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                    <span className="font-bold text-lg tracking-wide">SiPintar</span>
                    <span className="text-xs text-slate-300 hidden md:inline">Sistem Informasi Akademik Sekolah</span>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                    <span className="text-slate-300 font-medium">Guru | {user?.nama_guru || 'Profil'}</span>
                    <button
                        onClick={onLogout}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                    >
                        Keluar
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar Menu */}
                <aside className="w-56 bg-slate-100 border-r border-slate-200 p-4 hidden md:block">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Menu Utama</h3>
                    <nav className="space-y-1">
                        <div className="px-3 py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md flex items-center justify-between">
                            <span>Data Siswa & Mapel</span>
                        </div>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Data Siswa dan Mata Pelajaran</h1>
                            <p className="text-xs text-slate-500 mt-1">Pilih mata pelajaran dan temukan siswa yang nilainya dikelola.</p>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="w-full md:w-1/3">
                                <label className="block text-xs font-medium text-slate-600 mb-1">Mata Pelajaran</label>
                                <select
                                    value={selectedMapel}
                                    onChange={(e) => setSelectedMapel(Number(e.target.value))}
                                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    {mapelOptions.map(m => (
                                        <option key={m.id} value={m.id}>{m.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full md:w-1/2 flex items-end gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Cari Siswa</label>
                                    <input
                                        type="text"
                                        placeholder="Nama atau NIS"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg"
                                >
                                    Cari
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                                        <th className="py-3 px-4">NIS</th>
                                        <th className="py-3 px-4">Nama Siswa</th>
                                        <th className="py-3 px-4">Mata Pelajaran</th>
                                        <th className="py-3 px-4 text-center">Nilai</th>
                                        <th className="py-3 px-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredSiswa.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-6 text-slate-400">Tidak ada data siswa ditemukan.</td>
                                        </tr>
                                    ) : (
                                        filteredSiswa.map((item) => (
                                            <tr key={item.id_siswa} className="hover:bg-slate-50/50">
                                                <td className="py-3 px-4 font-mono text-slate-600">{item.nis}</td>
                                                <td className="py-3 px-4 font-medium text-slate-800">{item.nama_siswa}</td>
                                                <td className="py-3 px-4 text-slate-600">{item.nama_mapel}</td>
                                                <td className="py-3 px-4 text-center font-semibold">
                                                    {item.nilai !== null && item.nilai !== undefined ? item.nilai : '-'}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {item.nilai === null || item.nilai === undefined ? (
                                                        <button
                                                            onClick={() => onNavigateToTambah(item)}
                                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium shadow-sm transition"
                                                        >
                                                            Tambah
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => onNavigateToEdit(item)}
                                                            className="px-3 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded text-xs font-medium shadow-sm transition"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-[11px] text-slate-500">
                            * Tombol <strong>Tambah</strong> tersedia jika nilai untuk pasangan siswa dan mata pelajaran belum ada. Tombol <strong>Edit</strong> tersedia jika nilai sudah tersimpan.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
