document.addEventListener('DOMContentLoaded', function() {

    // ======================================================================
    // 1. ANIMAÇÃO DE SCROLL (Intersection Observer)
    // ======================================================================
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // ======================================================================
    // 2. LÓGICA PARA LISTA COMPLETA DE REPOSITÓRIOS COM PAGINAÇÃO (GITHUB)
    // ======================================================================

    const GITHUB_USERNAME = 'kleysongomes';
    const reposContainer = document.getElementById('github-repos-container');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');
    
    let allRepos = [];
    let currentPage = 1;
    const reposPerPage = 6;

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
                <div class="repo-stats">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 13.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192L.644 8.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.14.67A.75.75 0 0 1 8 .25Z"></path>
                        </svg>
                        ${repo.stargazers_count}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Z"></path>
                        </svg>
                        ${repo.forks_count}
                    </span>
                </div>
            `;

            // Se tiver linguagem, adiciona a tag de linguagem
            if (repo.language) {
                const languageTag = document.createElement('span');
                languageTag.className = 'repo-language';
                languageTag.textContent = repo.language;
                card.appendChild(languageTag);
            }

            reposContainer.appendChild(card);
        });

        updatePaginationButtons();
    }
    
    function updatePaginationButtons() {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
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

    fetchAllGithubRepos();
});
