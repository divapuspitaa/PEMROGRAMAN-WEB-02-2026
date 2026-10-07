const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

let inputNama = prompt("Masukkan Nama Anda (Asisten Lab):");

if (inputNama && inputNama.trim().toLowerCase() === "diva") {
    let hasilEvaluasi = [];
    let totalLulus = 0;
    let totalGagal = 0;
    let totalSemuaRata = 0;

    for (let i = 0; i < dataPraktikan.length; i++) {
        let mhs = dataPraktikan[i];

        let total = 0;
        for (let j = 0; j < mhs.nilaiTugas.length; j++) {
            total += mhs.nilaiTugas[j];
        }

        let rataRata = Number((total / mhs.nilaiTugas.length));
        totalSemuaRata += rataRata;

        let status;
        if(rataRata >= 75) {
          status = "LULUS";
          totalLulus++;
        } else {
          status = "TIDAK LULUS";
          totalGagal++;
        }

        let predikat = "-";

        hasilEvaluasi.push({
            nama: mhs.nama,
            nilaiTugas: mhs.nilaiTugas,
            rataRata: rataRata,
            predikat: predikat,
            status: status
        });
    }

    let totalPraktikan = hasilEvaluasi.length;
    let RatarataKeseluruhan = (totalSemuaRata / totalPraktikan);

    document.write(`
        <div class="max-w-5xl mx-auto my-8"> 
          <div class="flex flex-col items-center justify-center mb-8 text-center"> 
            <h1 class="text-3xl font-extrabold text-sky-400 tracking-tight mb-2">
              Sistem Evaluasi Praktikum Interaktif
            </h1> 
            <p class="text-slate-400 text-sm"> 
              Selamat Datang <span class="font-bold text-slate-200">${inputNama.trim()}</span>!
            </p> 
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div class="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Praktikan</h4>
              <p class="text-2xl font-bold text-sky-400">${totalPraktikan}</p>
            </div>
            <div class="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Lulus</h4>
              <p class="text-2xl font-bold text-emerald-400">${totalLulus}</p>
            </div>
            <div class="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Gagal</h4>
              <p class="text-2xl font-bold text-rose-400">${totalGagal}</p>
            </div>
            <div class="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
              <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Rata-Rata Kelas</h4>
              <p class="text-2xl font-bold text-sky-400">${RatarataKeseluruhan}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `);
  hasilEvaluasi.forEach(function (p) {
    let isLulus = p.status === "LULUS";
    let statusColor;

    if(isLulus) {
      statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    } else {
      statusColor = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
        document.write(`
          <div class="bg-slate-800 border border-slate-700 hover:border-sky-400/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center pb-3 mb-4 border-b border-slate-700">
                <h3 class="text-xl font-bold text-slate-100">${p.nama}</h3>
                <span class="bg-sky-400/10 text-sky-400 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  Predikat ${p.predikat || "-"}
                </span> 
              </div>
              <div class="space-y-2 text-sm text-slate-400 mb-6">
                <p>Nilai Tugas: <span class="bg-slate-900 text-slate-200 font-mono px-2 py-1 rounded">${p.nilaiTugas.join(" | ")}</span></p>
                <p>Rata-Rata: <strong class="text-slate-200">${p.rataRata}</strong></p>
              </div>
            </div>
            <div class="text-center font-bold text-sm tracking-wider py-2 rounded-lg border ${statusColor}">
              ${p.status}
            </div>
          </div>
        `);
    });

    document.write(`
          </div>
        </div>
    `);

    console.log("=== DATA EVALUASI PRAKTIKAN (ARRAY OF OBJECTS) ===");
    console.log(hasilEvaluasi);

} else if (!inputNama || inputNama.trim() === "") {
    alert("Peringatan!! Anda belum memasukkan nama");
    document.write(`
        <div class="max-w-md mx-auto my-12 bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl text-center">
            <h2 class="text-xl font-bold text-amber-400 mb-2">Input Kosong</h2>
            <p class="text-slate-300 text-sm">Silakan refresh halaman dan masukkan nama yang benar!</p>
        </div>
    `);

} else {
    alert("Akses Ditolak!!!! Only Diva");
    document.write(`
        <div class="max-w-md mx-auto my-12 bg-rose-500/10 border border-rose-500/30 p-6 rounded-xl text-center">
            <h2 class="text-xl font-bold text-rose-400 mb-2">Akses Ditolak</h2>
            <p class="text-slate-300 text-sm">Maaf <strong>${inputNama}</strong>, sistem ini khusus untuk Asisten Lab bernama <strong>diva</strong>.</p>
        </div>
    `);
}