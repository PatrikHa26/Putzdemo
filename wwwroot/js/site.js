document.addEventListener('DOMContentLoaded', () => {
    // Burger-Menü
    const burgers = document.querySelectorAll('.navbar-burger');
    burgers.forEach(burger => {
        burger.addEventListener('click', () => {
            const target = document.getElementById(burger.dataset.target);
            burger.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });
    });

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('open');
        });
    });

    // File Input
    const fileInput = document.querySelector("#file-js-example input[type=file]");
    if (fileInput) {
        fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
                const fileName = document.querySelector("#file-js-example .file-name");
                if (fileName) {
                    fileName.textContent = fileInput.files[0].name;
                }
            }
        };
    }

    // Stoppuhr
    const anzeige = document.getElementById("zeiterfassung");
    if (anzeige) {
        let gestoppteZeit = 0;
        let pausiert = true;
        let letzterDurchlauf = Date.now();

        window.start = function () { pausiert = false; };
        window.pause = function () { pausiert = true; };
        window.ende = function () {
            pausiert = true;
            gestoppteZeit = 0;
            aktualisiereAnzeige();
        };

        function aktuelleZeit() {
            const jetzt = Date.now();
            if (!pausiert) {
                gestoppteZeit += jetzt - letzterDurchlauf;
            }
            letzterDurchlauf = jetzt;
            aktualisiereAnzeige();
            setTimeout(aktuelleZeit, 50);
        }

        function aktualisiereAnzeige() {
            const sekunden = Math.floor((gestoppteZeit / 1000) % 60);
            const minuten = Math.floor((gestoppteZeit / (1000 * 60)) % 60);
            const stunden = Math.floor(gestoppteZeit / (1000 * 60 * 60));

            anzeige.innerText =
                String(stunden).padStart(2, '0') + ':' +
                String(minuten).padStart(2, '0') + ':' +
                String(sekunden).padStart(2, '0');
        }

        aktuelleZeit();
    }
});
