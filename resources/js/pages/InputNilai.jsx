import React, { useState } from 'react';

export default function InputNilai({ user, siswaData, onSave, onCancel }) {
    const [nilai, setNilai] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const numericNilai = Number(nilai);

        if (
            nilai === '' ||
            !Number.isFinite(numericNilai) ||
            numericNilai < 0 ||
            numericNilai > 100
        ) {
            setErrorMessage('Nilai harus berupa angka antara 0 sampai 100.');
            return;
        }

        setLoading(true);

        try {
            await onSave(
                siswaData?.id_siswa || 1,
                siswaData?.id_mapel || 1,
                numericNilai
            );
        } catch (error) {
            setErrorMessage('Gagal menyimpan nilai. Silakan coba kembali.');
        } finally {
            setLoading(false);
        }
    };

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
                <main className="flex-1 px-[24px] pt-[10px]">
                    <div className="max-w-[850px] mx-auto">
                        {/* IDENTITAS HALAMAN (BADGE UI-003 & TITLE) */}
                        <div className="mb-[18px]">
                            <span className="inline-flex items-center h-[22px] px-[10px] border border-[#7CA9C2] bg-[#EAF2F6] rounded-[5px] text-[11px] font-normal text-[#193D57]">
                                UI-003
                            </span>

                            <h1 className="text-[21px] font-bold text-[#193D57] mt-[7px]">
                                Tambah Nilai
                            </h1>

                            <p className="text-[11px] font-normal text-[#75899A] mt-[5px]">
                                Data Siswa dan Mata Pelajaran / Tambah Nilai
                            </p>
                        </div>

                        {/* PESAN GAGAL */}
                        {errorMessage && (
                            <div
                                role="alert"
                                className="ml-[36px] mb-[12px] max-w-[680px] rounded-[5px] border border-red-200 bg-red-50 px-[12px] py-[9px] text-[12px] font-normal text-red-600"
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* KARTU FORM TAMBAH NILAI */}
                        <section className="ml-[36px] w-full max-w-[680px] min-h-[301px] rounded-[11px] border border-[#C8D3DC] bg-white px-[30px] pt-[19px] pb-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <h2 className="text-[16px] font-bold text-[#193D57] mb-[13px]">
                                Tambah Nilai
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {/* INFORMASI SISWA */}
                                <div className="grid grid-cols-2 border-b border-[#D4DDE4] pb-[11px] mb-[20px]">
                                    <p className="text-[12px] font-bold text-[#263F52]">
                                        Siswa: {siswaData?.nama_siswa || 'Siswa 1'}
                                    </p>

                                    <p className="text-[12px] font-bold text-[#263F52]">
                                        Mata Pelajaran: {siswaData?.nama_mapel || 'Matematika'}
                                    </p>
                                </div>

                                {/* INPUT FIELD NILAI */}
                                <div className="mb-[39px]">
                                    <label
                                        htmlFor="nilai"
                                        className="block text-[12px] font-bold text-[#263F52] mb-[6px]"
                                    >
                                        Nilai
                                    </label>

                                    <input
                                        id="nilai"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        required
                                        value={nilai}
                                        onChange={(e) => {
                                            setNilai(e.target.value);
                                            setErrorMessage('');
                                        }}
                                        placeholder="Masukkan satu nilai angka"
                                        className="w-full h-[31px] rounded-[6px] border border-[#BFCBD5] bg-white px-[10px] text-[12px] font-normal text-[#263F52] outline-none focus:border-[#39799E] focus:ring-1 focus:ring-[#D5E7F1]"
                                    />

                                    <p className="text-[10px] font-normal text-[#8293A1] mt-[3px]">
                                        Masukkan satu nilai untuk siswa ini.
                                    </p>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex items-center gap-[17px]">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-[198px] h-[35px] rounded-[6px] bg-[#306F91] text-white text-[12px] font-bold hover:bg-[#275E7C] transition disabled:opacity-50"
                                    >
                                        {loading ? 'Menyimpan...' : 'Simpan Nilai'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onCancel}
                                        disabled={loading}
                                        className="w-[130px] h-[35px] rounded-[6px] border-2 border-[#C3D0DA] bg-white text-[#193D57] text-[12px] font-bold hover:bg-[#F3F6F8] transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
