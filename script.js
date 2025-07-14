document.addEventListener('DOMContentLoaded', function() {

    // ======================================================================
    // 1. LÓGICA DO TEMA (DARK/LIGHT) - VERSÃO CORRIGIDA
    // ======================================================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Ícones SVG mais simples e confiáveis
    const sunIcon = `<path fill="currentColor" d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zM11 1h2v3h-2V1zM11 20h2v3h-2v-3zM3.55 4.96l1.41-1.41 2.12 2.12-1.41 1.41L3.55 4.96zM16.92 18.33l1.41-1.41 2.12 2.12-1.41 1.41-2.12-2.12zM1 11h3v2H1v-2zM20 11h3v2h-3v-2zM4.96 16.92l-1.41 1.41 2.12 2.12 1.41-1.41-2.12-2.12zM18.33 3.55l-1.41 1.41 2.12 2.12 1.41-1.41-2.12-2.12z"></path>`;
    const moonIcon = `<path fill="currentColor" d="M9.5 2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65C6.02 21.49 7.71 22 9.5 22c5.52 0 10-4.48 10-10S15.02 2 9.5 2z"></path>`;

    function updateThemeIcon() {
        if (body.classList.contains('light-theme')) {
            // Se o tema é claro, o botão deve mostrar o ícone da LUA (para mudar para escuro)
            themeIcon.innerHTML = moonIcon;
        } else {
            // Se o tema é escuro, o botão deve mostrar o ícone do SOL (para mudar para claro)
            themeIcon.innerHTML = sunIcon;
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        updateThemeIcon();
    });
    
    // Apenas chama a função para definir o ícone correto na inicialização
    updateThemeIcon();

    // ======================================================================
    // 2. LÓGICA DE NAVEGAÇÃO E SCROLL (Intersection Observer)
    // ======================================================================
    const sections = document.querySelectorAll('.editor-content section');
    const navLinks = document.querySelectorAll('.explorer-nav a');
    const tabs = document.querySelectorAll('.tab');
    const editorContent = document.querySelector('.editor-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Atualiza links da sidebar
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });

                // Atualiza abas
                tabs.forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.section === id);
                });
            }
        });
    }, { root: editorContent, threshold: 0.4 });

    sections.forEach(section => observer.observe(section));

    // Scroll suave ao clicar nos links/abas
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = `#${tab.dataset.section}`;
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ======================================================================
    // 3. LÓGICA PARA LISTA DE REPOSITÓRIOS DO GITHUB
    // ======================================================================
    const GITHUB_USERNAME = 'kleysongomes';
    const reposContainer = document.getElementById('github-repos-container');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');
    
    let allRepos = [];
    let currentPage = 1;
    const reposPerPage = 8;

    async function fetchAllGithubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
            if (!response.ok) throw new Error('Falha ao buscar repositórios.');
            
            allRepos = await response.json();
            renderReposPage(currentPage);

        } catch (error) {
            console.error(error);
            reposContainer.innerHTML = '<p class="loading-message">Não foi possível carregar os repositórios.</p>';
        }
    }
    
    function renderReposPage(page) {
        reposContainer.innerHTML = '';
        currentPage = page;
        
        const startIndex = (page - 1) * reposPerPage;
        const endIndex = page * reposPerPage;
        const reposToShow = allRepos.slice(startIndex, endIndex);

        reposToShow.forEach(repo => {
            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = '_blank';
            card.className = 'project-card repo-card';
            card.style.textDecoration = 'none';
            card.style.color = 'inherit';
            
            card.innerHTML = `
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sem descrição.'}</p>
                </div>
            `;
            reposContainer.appendChild(card);
        });

        updatePaginationButtons();
    }
    
    function updatePaginationButtons() {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= totalPages;
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            renderReposPage(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(allRepos.length / reposPerPage)) {
            renderReposPage(currentPage + 1);
        }
    });

    // Inicia a busca apenas se o container existir na página
    if(reposContainer) {
        fetchAllGithubRepos();
    }
});
