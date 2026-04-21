/**
 * Decap CMS - Blog Fetcher for Vanilla JS
 * Fetches JSON posts from the /content/blog folder via GitHub API
 * and renders them into the blog grid.
 */

async function loadDynamicPosts() {
    const blogGrid = document.querySelector('.services-grid');
    if (!blogGrid) return;

    // GitHub Repo Details (matching config.yml)
    const owner = 'fatehaliyev';
    const repo = 'dayday';
    const path = 'public/content/blog';

    try {
        // Keş yaddaşını təmizləmək üçün timestamp əlavə edirik
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=main&t=${new Date().getTime()}`);
        
        if (!response.ok) {
            console.warn('Dynamic posts not found or folder empty.');
            return;
        }

        const files = await response.json();

        // 2. Filter for JSON files and fetch each one's content
        for (const file of files) {
            if (file.name.endsWith('.json')) {
                const postResponse = await fetch(file.download_url);
                const postData = await postResponse.json();

                // 3. Create the HTML for the blog card (matching the existing style)
                const postCard = document.createElement('a');
                postCard.className = 'service-card fade-in visible';
                postCard.href = `blog-detail.html?slug=${file.name.replace('.json', '')}`;
                
                // Add content
                postCard.innerHTML = `
                    <img src="${postData.featured_image || 'assets/images/photo-1.jpg'}" class="service-thumb" alt="${postData.title}">
                    <div class="service-icon" style="top: 180px;"><i class="fas fa-newspaper"></i></div>
                    <h3>${postData.title}</h3>
                    <p>${postData.seo_description || 'Daha fazlası için tıklayın...'}</p>
                    <span class="date" style="display: block; margin-top: 10px; font-size: 0.8rem; color: #666;">
                        ${new Date(postData.publish_date).toLocaleDateString('tr-TR')}
                    </span>
                `;

                // 4. Prepend to the grid (newest first)
                blogGrid.prepend(postCard);
            }
        }
    } catch (error) {
        console.error('Error loading dynamic posts:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadDynamicPosts);
