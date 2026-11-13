import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InputNilai from './pages/InputNilai';
import UpdateNilai from './pages/UpdateNilai';

function App({ defaultPage }) {
    // Navigasi halaman: 'login' | 'dashboard' | 'tambah' | 'edit'
    // Mendukung direct URL load maupun SPA navigation
    const [currentPage, setCurrentPage] = useState(() => {
        if (defaultPage) return defaultPage;
        const path = window.location.pathname;
        if (path.includes('/dashboard')) return 'dashboard';
        if (path.includes('/nilai/tambah')) return 'tambah';
        if (path.includes('/nilai/edit')) return 'edit';
        return 'login';
    });

    const [user, setUser] = useState({ nama_guru: 'Guru Pengampu', username: 'guru' });
    const [selectedMapel, setSelectedMapel] = useState(1);

    // Initial dummy data sesuai Kamus Data dan Wireframe UI-002
    const [siswaList, setSiswaList] = useState([
        { id_siswa: 1, nis: 'S-001', nama_siswa: 'Siswa 1', id_mapel: 1, nama_mapel: 'Matematika', nilai: null },
        { id_siswa: 2, nis: 'S-002', nama_siswa: 'Siswa 2', id_mapel: 1, nama_mapel: 'Matematika', nilai: 82.00 },
        { id_siswa: 3, nis: 'S-003', nama_siswa: 'Siswa 3', id_mapel: 1, nama_mapel: 'Matematika', nilai: null },
        { id_siswa: 1, nis: 'S-001', nama_siswa: 'Siswa 1', id_mapel: 2, nama_mapel: 'Bahasa Indonesia', nilai: 78.50 },
        { id_siswa: 2, nis: 'S-002', nama_siswa: 'Siswa 2', id_mapel: 2, nama_mapel: 'Bahasa Indonesia', nilai: null },
    ]);

    // Data siswa aktif untuk form tambah / edit
    const [activeSiswa, setActiveSiswa] = useState(() => {
        const path = window.location.pathname;
        if (defaultPage === 'edit' || path.includes('/nilai/edit')) {
            return { id_siswa: 2, nis: 'S-002', nama_siswa: 'Siswa 2', id_mapel: 1, nama_mapel: 'Matematika', nilai: 82.00 };
        }
        return { id_siswa: 1, nis: 'S-001', nama_siswa: 'Siswa 1', id_mapel: 1, nama_mapel: 'Matematika', nilai: null };
    });

    // Handle Login
    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setCurrentPage('dashboard');
    };

    // Handle Logout
    const handleLogout = () => {
        setUser(null);
        setCurrentPage('login');
    };

    // Navigasi ke Form Tambah Nilai (UI-003)
    const handleNavigateToTambah = (siswa) => {
        setActiveSiswa(siswa);
        setCurrentPage('tambah');
    };

    // Navigasi ke Form Edit Nilai (UI-004)
    const handleNavigateToEdit = (siswa) => {
        setActiveSiswa(siswa);
        setCurrentPage('edit');
    };

    // Simpan Nilai Baru
    const handleSaveNilai = async (id_siswa, id_mapel, nilaiBaru) => {
        setSiswaList(prev => prev.map(s => {
            if (s.id_siswa === id_siswa && s.id_mapel === id_mapel) {
                return { ...s, nilai: nilaiBaru };
            }
            return s;
        }));
        setCurrentPage('dashboard');
    };

    // Update Nilai
    const handleUpdateNilai = async (id_siswa, id_mapel, nilaiBaru) => {
        setSiswaList(prev => prev.map(s => {
            if (s.id_siswa === id_siswa && s.id_mapel === id_mapel) {
                return { ...s, nilai: nilaiBaru };
            }
            return s;
        }));
        setCurrentPage('dashboard');
    };

    return (
        <div className="font-sans antialiased text-slate-800">
            {currentPage === 'login' && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}

            {currentPage === 'dashboard' && (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                    onNavigateToTambah={handleNavigateToTambah}
                    onNavigateToEdit={handleNavigateToEdit}
                    siswaList={siswaList}
                    selectedMapel={selectedMapel}
                    setSelectedMapel={setSelectedMapel}
                />
            )}

            {currentPage === 'tambah' && (
                <InputNilai
                    user={user}
                    siswaData={activeSiswa}
                    onSave={handleSaveNilai}
                    onCancel={() => setCurrentPage('dashboard')}
                />
            )}

            {currentPage === 'edit' && (
                <UpdateNilai
                    user={user}
                    siswaData={activeSiswa}
                    onUpdate={handleUpdateNilai}
                    onCancel={() => setCurrentPage('dashboard')}
                />
            )}
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const page = rootElement.dataset.page;
    createRoot(rootElement).render(<App defaultPage={page} />);
}
