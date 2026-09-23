document.addEventListener("DOMContentLoaded", async function () {

    /* =====================================================
       FUNÇÃO PARA CARREGAR COMPONENTES
    ====================================================== */

    async function carregarComponente(seletor, arquivo) {

        const alvo = document.querySelector(seletor);

        if (!alvo) {
            return;
        }

        try {

            const resposta = await fetch(arquivo);

            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível carregar " + arquivo
                );
            }

            const html = await resposta.text();

            alvo.innerHTML = html;

        } catch (erro) {

            console.error(
                "Erro ao carregar componente:",
                arquivo,
                erro
            );

        }

    }


    /* =====================================================
       CARREGA CABEÇALHO E RODAPÉ
    ====================================================== */

    await Promise.all([

        carregarComponente(
    "#site-header-slot",
    "components/header.html?v=4"
),

        carregarComponente(
    "#site-footer-slot",
    "components/footer.html?v=4"
)

    ]);


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    const menuButton =
        document.getElementById("siteMenuToggle");

    const navigation =
        document.getElementById("siteNavigation");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                const aberto =
                    navigation.classList.toggle("open");

                menuButton.classList.toggle(
                    "is-open",
                    aberto
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    aberto ? "true" : "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    aberto
                        ? "Fechar menu"
                        : "Abrir menu"
                );

            }
        );


        /* FECHA MENU DEPOIS DO CLIQUE */

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove("open");

                        menuButton.classList.remove(
                            "is-open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuButton.setAttribute(
                            "aria-label",
                            "Abrir menu"
                        );

                    }
                );

            });


        /* VOLTA AO DESKTOP */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 820) {

                    navigation.classList.remove("open");

                    menuButton.classList.remove(
                        "is-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }

            }
        );

    }


    /* =====================================================
       IDENTIFICA A PÁGINA ATUAL
    ====================================================== */

    let pagina =
        window.location.pathname
            .split("/")
            .pop();


    /* QUANDO ESTIVER NA RAIZ */

    if (!pagina) {
        pagina = "index.html";
    }


    /* =====================================================
       REMOVE TODOS OS ATIVOS
    ====================================================== */

    document
        .querySelectorAll(
            ".site-header-v2__nav a"
        )
        .forEach(function (link) {

            link.classList.remove("active");

        });


    /* =====================================================
       DEFINE QUAL MENU DEVE FICAR ATIVO
    ====================================================== */

    let nomeMenu = "inicio";


    switch (pagina) {

        case "sobre.html":

            nomeMenu = "sobre";

            break;


        case "cursos.html":

            nomeMenu = "cursos";

            break;


        case "contato.html":

            nomeMenu = "contato";

            break;


        case "ofertas.html":

            nomeMenu = "ofertas";

            break;


        case "index.html":

        default:

            nomeMenu = "inicio";

            break;

    }


    /* =====================================================
       MARCA O MENU ATIVO
    ====================================================== */

    const linkAtivo =
        document.querySelector(
            '[data-nav="' + nomeMenu + '"]'
        );


    if (linkAtivo) {

        linkAtivo.classList.add("active");

    }

});
