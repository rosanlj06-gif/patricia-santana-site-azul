document.addEventListener("DOMContentLoaded", async function () {
    async function carregarComponente(seletor, arquivo) {
        const alvo = document.querySelector(seletor);

        if (!alvo) {
            return;
        }

        try {
            const resposta = await fetch(arquivo);

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar " + arquivo);
            }

            alvo.innerHTML = await resposta.text();
        } catch (erro) {
            console.error(erro);
        }
    }

    await Promise.all([
        carregarComponente("#site-header-slot", "components/header.html"),
        carregarComponente("#site-footer-slot", "components/footer.html")
    ]);

    const menuButton = document.getElementById("siteMenuToggle");
    const navigation = document.getElementById("siteNavigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const aberto = navigation.classList.toggle("open");

            menuButton.classList.toggle("is-open", aberto);
            menuButton.setAttribute("aria-expanded", aberto ? "true" : "false");
            menuButton.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuButton.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) {
                navigation.classList.remove("open");
                menuButton.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            }
        });
    }

    const pagina = window.location.pathname.split("/").pop() || "index.html";
    const hash = window.location.hash;

    document.querySelectorAll(".site-header-v2__nav a").forEach(function (link) {
        link.classList.remove("active");
    });

    let ativo = null;

    if (pagina === "sobre.html") {
        ativo = document.querySelector('[data-nav="sobre"]');
    } else if (pagina === "agenda.html") {
        ativo = document.querySelector('[data-nav="agenda"]');
    } else if (pagina === "ofertas.html") {
        ativo = document.querySelector('[data-nav="ofertas"]');
    } else if (hash === "#cursos") {
        ativo = document.querySelector('[data-nav="cursos"]');
    } else if (hash === "#contato") {
        ativo = document.querySelector('[data-nav="contato"]');
    } else {
        ativo = document.querySelector('[data-nav="inicio"]');
    }

    if (ativo) {
        ativo.classList.add("active");
    }
});
