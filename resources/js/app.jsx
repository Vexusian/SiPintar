import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InputNilai from './pages/InputNilai';
import UpdateNilai from './pages/UpdateNilai';

function App({ defaultPage }) {
    // Navigasi halaman: 'login' | 'dashboard' | 'tambah' | 'edit'
    const [currentPage, setCurrentPage] = useState(() => {
        if (defaultPage) return defaultPage;

        const path = window.location.pathname;

        if (path.includes('/dashboard')) return 'dashboard';
        if (path.includes('/nilai/tambah')) return 'tambah';
        if (path.includes('/nilai/edit')) return 'edit';

        return 'login';
    });

    const [user, setUser] = useState({
        nama_guru: 'Guru Pengampu',
        username: 'guru'
    });

    const [selectedMapel, setSelectedMapel] = useState(1);

    // Data siswa dan nilai diambil dari database
    const [siswaList, setSiswaList] = useState([]);

    // Data siswa aktif untuk form tambah / edit
    const [activeSiswa, setActiveSiswa] = useState(() => {
        const path = window.location.pathname;

        if (defaultPage === 'edit' || path.includes('/nilai/edit')) {
            return {
                id_siswa: 2,
                nis: 'S-002',
                nama_siswa: 'Siswa 2',
                id_mapel: 1,
                nama_mapel: 'Matematika',
                nilai: 82.00
            };
        }

        return {
            id_siswa: 1,
            nis: 'S-001',
            nama_siswa: 'Siswa 1',
            id_mapel: 1,
            nama_mapel: 'Matematika',
            nilai: null
        };
    });

    // Mengambil data siswa dan nilai dari database
    const loadDashboardData = useCallback(async () => {
        const response = await fetch('/dashboard/data', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || 'Gagal mengambil data dashboard.'
            );
        }

        setSiswaList(result.data);
    }, []);

    // Memuat data setiap kali dashboard dibuka
    useEffect(() => {
        if (currentPage === 'dashboard') {
            loadDashboardData().catch(error => {
                console.error('Kesalahan mengambil data dashboard:', error);
            });
        }
    }, [currentPage, loadDashboardData]);

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
        const response = await fetch('/nilai/tambah', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute('content'),
            },
            body: JSON.stringify({
                id_siswa,
                id_mapel,
                nilai: nilaiBaru,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Gagal menyimpan nilai.');
        }

        // Kembali ke dashboard dan ambil data terbaru dari database
        setCurrentPage('dashboard');
    };

    // Update Nilai
    const handleUpdateNilai = async (id_siswa, id_mapel, nilaiBaru) => {
        const response = await fetch('/nilai/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute('content'),
            },
            body: JSON.stringify({
                id_siswa,
                id_mapel,
                nilai: nilaiBaru,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Gagal memperbarui nilai.');
        }

        // Kembali ke dashboard dan ambil data terbaru dari database
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
