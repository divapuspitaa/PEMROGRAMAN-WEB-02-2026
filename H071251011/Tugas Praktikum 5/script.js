let currentTodos = [];
let selectedUserBtn = null;

// F1. Menampilkan Daftar Anggota
async function loadUsers() {
  const userList = document.getElementById("user-list");
  const statusUser = document.getElementById("status-user");

  statusUser.textContent = "Memuat anggota...";
  userList.innerHTML = ""; 

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Gagal mengambil data anggota server.");

    const users = await res.json();
    statusUser.textContent = "";

    users.forEach((user, index) => {
      const btn = document.createElement("button");
      
      const numFormatted = String(index + 1).padStart(2, '0');
      
      const numSpan = document.createElement("span");
      numSpan.textContent = numFormatted;
      numSpan.className = "font-bold text-[11px] px-2 py-1 rounded-xl bg-slate-100 text-slate-400 transition-all";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = user.name;
      nameSpan.className = "font-semibold text-sm flex-1 text-left";

      btn.className = "w-full px-3.5 py-3 rounded-2xl transition-all duration-200 text-slate-600 hover:bg-slate-100/80 flex items-center gap-3 border border-transparent cursor-pointer";
      btn.appendChild(numSpan);
      btn.appendChild(nameSpan);

      // Event listener klik anggota
      btn.addEventListener("click", () => {
        if (selectedUserBtn) {
          selectedUserBtn.classList.remove("bg-lime-600", "text-white", "shadow-lg", "shadow-lime-600/20", "border-lime-500");
          selectedUserBtn.classList.add("text-slate-600", "border-transparent");
          const oldNum = selectedUserBtn.querySelector("span");
          if (oldNum) {
            oldNum.classList.remove("bg-white/20", "text-white");
            oldNum.classList.add("bg-slate-100", "text-slate-400");
          }
        }

        btn.classList.add("bg-lime-600", "text-white", "shadow-lg", "shadow-lime-600/20", "border-lime-500");
        btn.classList.remove("text-slate-600", "border-transparent");
        
        numSpan.classList.remove("bg-slate-100", "text-slate-400");
        numSpan.classList.add("bg-white/20", "text-white");

        selectedUserBtn = btn;
        loadTodos(user.id, user.name);
      });

      userList.appendChild(btn);
    });
  } catch (err) {
    statusUser.textContent = err.message;
  }
}

// F2. Menampilkan Tugas Anggota
async function loadTodos(userId, userName) {
  const todoHeader = document.getElementById("todo-header");
  const todoList = document.getElementById("todo-list");
  const statusTodo = document.getElementById("status-todo");

  todoHeader.textContent = `Tugas ${userName}`;
  statusTodo.textContent = "Memuat tugas...";
  todoList.innerHTML = "";

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    if (!res.ok) throw new Error("Gagal mengambil data tugas server.");

    const todos = await res.json();
    statusTodo.textContent = "";
    currentTodos = todos;

    if (todos.length === 0) {
      statusTodo.textContent = "Belum ada tugas untuk anggota ini.";
      updateSummary();
      return;
    }

    todos.forEach((todo) => renderTodoItem(todo));
    updateSummary();
  } catch (err) {
    statusTodo.textContent = err.message;
  }
}

// Render Item Tugas (Ikon Check Cermin Interactive Immersive UI)
function renderTodoItem(todo, prepend = false) {
  const todoList = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.className = "flex items-center justify-between p-3.5 px-4 bg-slate-50/50 hover:bg-lime-100/60 rounded-2xl border border-slate-100/80 transition-all duration-200 group";

  // Container Left Wrapper
  const leftWrapper = document.createElement("div");
  leftWrapper.className = "flex items-center gap-3.5 flex-1 mr-4";

  // Ikon SVG Ceklis / Ring Checkbox
  const svgNS = "http://www.w3.org/2000/svg";
  const iconSvg = document.createElementNS(svgNS, "svg");
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("fill", "none");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("stroke-width", "2");

  if (todo.completed) {
    iconSvg.setAttribute("class", "w-5 h-5 flex-shrink-0 text-emerald-500 transition-transform duration-300 group-hover:scale-110");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");
  } else {
    iconSvg.setAttribute("class", "w-5 h-5 flex-shrink-0 text-slate-300 transition-colors");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("d", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z");
  }
  iconSvg.appendChild(path);

  // Judul Tugas (textContent)
  const span = document.createElement("span");
  span.textContent = todo.title;
  span.className = "text-sm text-slate-700 font-medium transition-colors";

  if (todo.completed) {
    span.classList.add("line-through", "text-slate-400");
  }

  leftWrapper.appendChild(iconSvg);
  leftWrapper.appendChild(span);

  // Container Action Buttons
  const btnContainer = document.createElement("div");
  btnContainer.className = "flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity";

  // Tombol Tandai Selesai (F5.1)
  if (!todo.completed) {
    const btnDone = document.createElement("button");
    btnDone.textContent = "Tandai selesai";
    btnDone.className = "text-xs font-semibold text-slate-600 hover:text-emerald-600 bg-white hover:bg-emerald-50 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer";

    btnDone.addEventListener("click", () => {
      todo.completed = true;
      span.classList.add("line-through", "text-slate-400");
      
      // Ubah ikon ke Centang Hijau
      iconSvg.setAttribute("class", "w-5 h-5 flex-shrink-0 text-emerald-500 transition-transform duration-300");
      path.removeAttribute("stroke");
      path.setAttribute("fill", "currentColor");
      path.setAttribute("d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");

      btnDone.remove();
      updateSummary();
    });

    btnContainer.appendChild(btnDone);
  }

  // Tombol Hapus (F5.2)
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";
  btnDelete.className = "text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer";

  btnDelete.addEventListener("click", () => {
    li.remove();
    currentTodos = currentTodos.filter((t) => t !== todo);
    updateSummary();
  });

  btnContainer.appendChild(btnDelete);

  li.appendChild(leftWrapper);
  li.appendChild(btnContainer);
  todoList.appendChild(li);
}

// Update Summary Text & Percentage Progress Bar
function updateSummary() {
  const summary = document.getElementById("todo-summary");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  
  const total = currentTodos.length;
  const completed = currentTodos.filter((t) => t.completed).length;

  summary.textContent = `${completed} dari ${total} tugas selesai`;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
}

// F3. Pencarian Tugas
document.getElementById("search-input").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase().trim();
  const listItems = document.querySelectorAll("#todo-list li");
  let visibleCount = 0;

  listItems.forEach((li) => {
    const titleText = li.querySelector("span").textContent.toLowerCase();
    if (titleText.includes(keyword)) {
      li.classList.remove("hidden");
      visibleCount++;
    } else {
      li.classList.add("hidden");
    }
  });

  const emptySearch = document.getElementById("empty-search");
  if (visibleCount === 0 && listItems.length > 0) {
    emptySearch.classList.remove("hidden");
  } else {
    emptySearch.classList.add("hidden");
  }
});

// F4. Simulasi Menyimpan Tugas ke Server
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isExist = currentTodos.some(
        (t) => t.title.toLowerCase() === judul.toLowerCase()
      );
      if (isExist) {
        reject(new Error("Tugas dengan judul ini sudah ada!"));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

document.getElementById("add-todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("todo-input");
  const btnSave = document.getElementById("btn-save");
  const formError = document.getElementById("form-error");
  const notif = document.getElementById("notification");

  const judul = input.value.trim();
  formError.classList.add("hidden");
  formError.textContent = "";

  if (judul.length < 5) {
    formError.textContent = "Judul tugas minimal harus 5 karakter.";
    formError.classList.remove("hidden");
    return;
  }

  btnSave.textContent = "Menyimpan...";
  btnSave.disabled = true;

  try {
    const todoBaru = await simpanTugas(judul);
    currentTodos.unshift(todoBaru);

    renderTodoItem(todoBaru);
    const todoList = document.getElementById("todo-list");
    todoList.insertBefore(todoList.lastChild, todoList.firstChild);

    updateSummary();
    input.value = "";

    // Notifikasi Otomatis Hilang 3 Detik (F4.5)
    notif.textContent = "Tugas berhasil ditambahkan.";
    notif.classList.remove("hidden");
    setTimeout(() => {
      notif.classList.add("hidden");
    }, 3000);

  } catch (err) {
    formError.textContent = err.message;
    formError.classList.remove("hidden");
  } finally {
    btnSave.textContent = "Simpan";
    btnSave.disabled = false;
  }
});

// Init
document.addEventListener("DOMContentLoaded", loadUsers);