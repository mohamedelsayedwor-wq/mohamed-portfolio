/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader")
            .classList.add("hide");

    }, 900);

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* =========================
   TYPING EFFECT
========================= */

const typing = document.getElementById("typing");

const words = [
    "PHP Developer",
    "Laravel Developer",
    "Backend Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const word = words[wordIndex];

    if (!deleting) {

        typing.textContent =
            word.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === word.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typing.textContent =
            word.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );

}

typeEffect();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   MOUSE PARALLAX
========================= */

const screen =
    document.querySelector(".screen");

document.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth < 900)
            return;

        const x =
            (window.innerWidth / 2 - event.clientX) / 80;

        const y =
            (window.innerHeight / 2 - event.clientY) / 80;

        screen.style.transform =
            `rotateY(${-8 + x}deg)
             rotateX(${4 + y}deg)`;

    }
);


/* =========================
   ACTIVE NAV
========================= */

const sections =
    document.querySelectorAll("section");

const links =
    document.querySelectorAll(".navbar nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 150;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });


    links.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.style.color =
                "var(--cyan)";

        }

    });

});
/* =========================
   PROJECT VISUAL PARALLAX
========================= */

const projectVisuals =
    document.querySelectorAll(".project-visual");


projectVisuals.forEach(visual => {

    visual.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect =
            visual.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (centerY - y) / 35;

        const rotateY =
            (x - centerX) / 35;

        visual.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    visual.addEventListener("mouseleave", () => {

        visual.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});
/* =========================
   REAL PROJECT GALLERIES
========================= */

document.querySelectorAll(".project-gallery").forEach(gallery => {

    const images = Array.from(
        gallery.querySelectorAll(".gallery-track img")
    );

    const next =
        gallery.querySelector(".gallery-next");

    const prev =
        gallery.querySelector(".gallery-prev");

    const current =
        gallery.querySelector(".gallery-current");

    let index = 0;


    /* =========================
       SHOW IMAGE
    ========================= */

    function showImage(number) {

        images.forEach((img, i) => {

            img.classList.toggle(
                "active",
                i === number
            );

        });

        current.textContent =
            String(number + 1).padStart(2, "0");

    }


    /* =========================
       NEXT
    ========================= */

    next.addEventListener("click", () => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        showImage(index);

    });


    /* =========================
       PREVIOUS
    ========================= */

    prev.addEventListener("click", () => {

        index--;

        if (index < 0) {
            index = images.length - 1;
        }

        showImage(index);

    });


    /* =========================
       AUTO SLIDE
    ========================= */

    let autoSlide = setInterval(() => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        showImage(index);

    }, 4500);


    /* =========================
       PAUSE
    ========================= */

    gallery.addEventListener("mouseenter", () => {

        clearInterval(autoSlide);

    });


    gallery.addEventListener("mouseleave", () => {

        clearInterval(autoSlide);

        autoSlide = setInterval(() => {

            index++;

            if (index >= images.length) {
                index = 0;
            }

            showImage(index);

        }, 4500);

    });


    /* =========================
       TOUCH SWIPE
    ========================= */

    let startX = 0;

    gallery.addEventListener("touchstart", event => {

        startX =
            event.touches[0].clientX;

    }, { passive: true });


    gallery.addEventListener("touchend", event => {

        const endX =
            event.changedTouches[0].clientX;

        const difference =
            startX - endX;


        if (Math.abs(difference) < 50) {
            return;
        }


        if (difference > 0) {

            index++;

            if (index >= images.length) {
                index = 0;
            }

        } else {

            index--;

            if (index < 0) {
                index = images.length - 1;
            }

        }

        showImage(index);

    }, { passive: true });


    /* =========================
       FIRST IMAGE
    ========================= */

    showImage(0);

});