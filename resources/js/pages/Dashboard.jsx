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
        <div
            className="min-h-screen flex flex-col bg-[#F1F4F6] text-[#354454]"
            style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 400
            }}
        >
            {/* HEADER */}
            <header className="h-[44px] shrink-0 bg-[#193D57] text-white flex items-center justify-between px-[24px]">
                <div className="flex items-center gap-[20px]">
                    <span className="text-[16px] font-bold tracking-normal">
                        SiPintar
                    </span>
                    <span className="text-[10px] font-normal">
                        Sistem Informasi Akademik Sekolah
                    </span>
                </div>

                <div className="text-[12px] font-bold">
                    Guru | Profil
                </div>
            </header>

            {/* LAYOUT */}
            <div className="flex flex-1">
                {/* SIDEBAR */}
                <aside className="w-[170px] shrink-0 bg-[#F8FAFB] border-r border-[#CED8DF] px-[20px] pt-[18px]">
                    <p className="text-[10px] font-bold text-[#607386] mb-[17px]">
                        MENU UTAMA
                    </p>
                    <p className="text-[12px] font-normal text-[#354454]">
                        Data Siswa &amp; Mapel
                    </p>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 px-[24px] pt-[10px] pb-[30px]">
                    <div className="max-w-[850px] mx-auto">
                        {/* IDENTITAS HALAMAN (BADGE UI-002 & TITLE) */}
                        <div className="mb-[18px]">
                            <span className="inline-flex items-center h-[22px] px-[10px] border border-[#7CA9C2] bg-[#EAF2F6] rounded-[5px] text-[11px] font-normal text-[#193D57]">
                                UI-002
                            </span>

                            <h1 className="text-[21px] font-bold text-[#193D57] mt-[7px]">
                                Data Siswa dan Mata Pelajaran
                            </h1>

                            <p className="text-[11px] font-normal text-[#75899A] mt-[5px]">
                                Pilih mata pelajaran dan temukan siswa yang nilainya dikelola.
                            </p>
                        </div>

                        {/* FILTER & CARI */}
                        <div className="flex items-center gap-[20px] mb-[18px]">
                            <div>
                                <label className="block text-[12px] font-bold text-[#263F52] mb-[5px]">
                                    Mata Pelajaran
                                </label>
                                <select
                                    value={selectedMapel}
                                    onChange={(e) => setSelectedMapel(Number(e.target.value))}
                                    className="w-[240px] h-[31px] rounded-[6px] border border-[#BFCBD5] bg-white px-[10px] text-[12px] font-normal text-[#263F52] outline-none focus:border-[#39799E] focus:ring-1 focus:ring-[#D5E7F1]"
                                >
                                    {mapelOptions.map(m => (
                                        <option key={m.id} value={m.id}>{m.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 flex items-end gap-[12px]">
                                <div className="flex-1">
                                    <label className="block text-[12px] font-bold text-[#263F52] mb-[5px]">
                                        Cari Siswa
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nama atau NIS"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        className="w-full h-[31px] rounded-[6px] border border-[#BFCBD5] bg-white px-[10px] text-[12px] font-normal text-[#263F52] outline-none placeholder-[#8293A1] focus:border-[#39799E] focus:ring-1 focus:ring-[#D5E7F1]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-[84px] h-[31px] rounded-[6px] border border-[#C3D0DA] bg-white text-[#193D57] text-[12px] font-bold hover:bg-[#F3F6F8] transition cursor-pointer"
                                >
                                    Cari
                                </button>
                            </div>
                        </div>

                        {/* TABEL DATA SISWA */}
                        <div className="w-full rounded-[11px] border border-[#C8D3DC] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
                            <table className="w-full text-left border-collapse text-[12px]">
                                <thead>
                                    <tr className="bg-[#EAF2F6] border-b border-[#CED8DF] text-[#193D57] font-bold">
                                        <th className="py-[10px] px-[16px] font-bold">NIS</th>
                                        <th className="py-[10px] px-[16px] font-bold">Nama Siswa</th>
                                        <th className="py-[10px] px-[16px] font-bold">Mata Pelajaran</th>
                                        <th className="py-[10px] px-[16px] text-center font-bold">Nilai</th>
                                        <th className="py-[10px] px-[16px] text-center font-bold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E2EAF0]">
                                    {filteredSiswa.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-6 text-[#75899A]">
                                                Tidak ada data siswa ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredSiswa.map((item) => (
                                            <tr key={`${item.id_siswa}-${item.id_mapel}`} className="hover:bg-[#F8FAFB] transition">
                                                <td className="py-[10px] px-[16px] text-[#4A5D6E]">{item.nis}</td>
                                                <td className="py-[10px] px-[16px] font-normal text-[#263F52]">{item.nama_siswa}</td>
                                                <td className="py-[10px] px-[16px] text-[#4A5D6E]">{item.nama_mapel}</td>
                                                <td className="py-[10px] px-[16px] text-center text-[#263F52]">
                                                    {item.nilai !== null && item.nilai !== undefined ? item.nilai : '-'}
                                                </td>
                                                <td className="py-[8px] px-[16px] text-center">
                                                    {item.nilai === null || item.nilai === undefined ? (
                                                        <button
                                                            onClick={() => onNavigateToTambah(item)}
                                                            className="w-[96px] h-[31px] rounded-[6px] bg-[#306F91] hover:bg-[#275E7C] text-white text-[12px] font-bold transition cursor-pointer"
                                                        >
                                                            Tambah
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => onNavigateToEdit(item)}
                                                            className="w-[96px] h-[31px] rounded-[6px] border border-[#C3D0DA] bg-white text-[#193D57] text-[12px] font-bold hover:bg-[#F3F6F8] transition cursor-pointer"
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

                        {/* KETERANGAN DI BAWAH TABEL */}
                        <div className="mt-[10px] text-[11px] text-[#75899A] leading-relaxed">
                            <p>Tambah tersedia jika nilai untuk pasangan siswa dan mata pelajaran belum ada.</p>
                            <p>Edit tersedia jika nilai sudah tersimpan.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
