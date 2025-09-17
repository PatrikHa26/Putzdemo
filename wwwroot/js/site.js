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

    // Camera
    const camera = document.getElementById("video");
    if (camera) {
        let width = window.innerWidth;
        let height = 0;
        let streaming = false;
        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");
        const photo = document.getElementById("photo");
        const startButton = document.getElementById("start-button");
        const allowButton = document.getElementById("permissions-button")

        // Permission Button
        allowButton.addEventListener("click", () => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error(`An error occured: ${err}`);
                });
        });

        video.addEventListener(
            "canplay",
            (ev) => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false,
        );

        // Trigger Button
        startButton.addEventListener(
            "click",
            (ev) => {
                takePicture();
                ev.preventDefault();
            },
            false,
        );

        function clearPhoto() {
            const context = canvas.getContext("2d");
            context.fillStyle = "#aaaaaa";
            context.fillRect(0, 0, canvas.width, canvas.height);

            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
        }

        function takePicture() {
            const context = canvas.getContext("2d");
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);

                const data = canvas.toDataURL("image/png");
                photo.setAttribute("src", data);
            } else {
                clearPhoto();
            }
        }
    }
    
});
