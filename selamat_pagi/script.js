document.addEventListener("DOMContentLoaded", function () {

    // ================= ELEMENT =================
    const typingEl = document.getElementById("typing");
    const suratEl = document.getElementById("suratText");
    const hariEl = document.getElementById("hari");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");
    const music = document.getElementById("music");
    const canvas = document.getElementById("hearts");

    // stop kalau elemen penting tidak ada
    if (!typingEl || !suratEl || !hariEl || !canvas) {
        console.error("❌ HTML belum lengkap!");
        return;
    }

    const ctx = canvas.getContext("2d");

    // ================= TYPING JUDUL =================
    const text = "Untuk Kamu, Sayangku ACIL ❤️";
    let i = 0;

    function typingJudul() {
        if (i < text.length) {
            typingEl.innerHTML += text[i++];
            setTimeout(typingJudul, 80);
        }
    }
    typingJudul();

    // ================= SURAT =================
    const suratFull = "Aku bersyukur setiap hari karena kamu 💕 Kamu rumah terbaikku.";
    let j = 0;
    let suratStarted = false;

    function typingSurat() {
        if (j < suratFull.length) {
            suratEl.innerHTML += suratFull[j++];
            setTimeout(typingSurat, 40);
        }
    }

    // ================= HARI =================
    const startDate = new Date("2023-03-23");

    function hitungHari() {
        const diff = new Date() - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hariEl.innerHTML = `Kita sudah bersama selama ${days} hari 💖`;
    }
    hitungHari();

    // ================= MUSIC =================
    window.playMusic = function () {
        if (!music) return;

        music.volume = 0.5;
        music.play().catch(() => {
            alert("Klik sekali lagi ya sayang 💖 (browser block autoplay)");
        });
    };

    // ================= POPUP ROMANTIS =================
    window.surprise = function () {
        if (!popup || !popupText) return;

        const textPopup =
            "Aku sayang kamu lebih dari segalanya 💖 Kamu adalah rumah tempat aku pulang 🥺";

        popup.classList.add("show");
        popupText.innerHTML = "";

        let k = 0;
        function type() {
            if (k < textPopup.length) {
                popupText.innerHTML += textPopup[k++];
                setTimeout(type, 30);
            }
        }
        type();

        // love effect
        for (let l = 0; l < 25; l++) {
            const love = document.createElement("div");
            love.className = "love";
            love.innerHTML = Math.random() > 0.5 ? "💖" : "✨";
            love.style.left = Math.random() * window.innerWidth + "px";
            love.style.top = window.innerHeight - 20 + "px";

            document.body.appendChild(love);
            setTimeout(() => love.remove(), 2500);
        }
    };

    window.closePopup = function () {
        popup?.classList.remove("show");
    };

    // ================= NAVIGATION =================
    window.showPage = function (pageId) {
        const current = document.querySelector(".page.active");
        const next = document.getElementById(pageId);

        if (!next || current === next) return;

        if (current) {
            current.classList.remove("active");
            current.classList.add("exit");
        }

        setTimeout(() => {
            current?.classList.remove("exit");
            next.classList.add("active");

            if (pageId === "surat" && !suratStarted) {
                suratStarted = true;
                typingSurat();
            }
        }, 300);
    };

    // ================= HEART ANIMATION =================
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let hearts = Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5
    }));

    function drawHeart(x, y, size) {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
        ctx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y + size);
        ctx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y);
        ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(h => {
            drawHeart(h.x, h.y, h.size);
            h.y -= h.speed;

            if (h.y < 0) {
                h.y = canvas.height;
                h.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});