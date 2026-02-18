(function() {
    // ---- NEURAL BRAIN SVG GENERATION & ANIMATION ----
    const svg = document.getElementById('neuralBrain');
    if (svg) {
        const connsG = document.getElementById('connections');
        const nodesG = document.getElementById('nodes');
        const sigsG = document.getElementById('signals');
        const nodeData = [];

        const regions = [
            { x: 220, y: 200, r: 80, count: 12 },
            { x: 200, y: 320, r: 70, count: 10 },
            { x: 260, y: 150, r: 50, count: 7 },
            { x: 240, y: 400, r: 55, count: 6 },
            { x: 380, y: 200, r: 80, count: 12 },
            { x: 400, y: 320, r: 70, count: 10 },
            { x: 340, y: 150, r: 50, count: 7 },
            { x: 360, y: 400, r: 55, count: 6 },
            { x: 300, y: 260, r: 40, count: 8 },
            { x: 300, y: 340, r: 35, count: 6 },
            { x: 300, y: 460, r: 30, count: 5 },
        ];

        const seededRandom = (function() {
            let s = 42;
            return function() {
                s = (s * 16807 + 0) % 2147483647;
                return (s - 1) / 2147483646;
            };
        })();

        regions.forEach(region => {
            for (let i = 0; i < region.count; i++) {
                const angle = seededRandom() * Math.PI * 2;
                const dist = seededRandom() * region.r;
                nodeData.push({
                    x: region.x + Math.cos(angle) * dist,
                    y: region.y + Math.sin(angle) * dist
                });
            }
        });

        const connectionPairs = [];
        for (let i = 0; i < nodeData.length; i++) {
            for (let j = i + 1; j < nodeData.length; j++) {
                const dx = nodeData[i].x - nodeData[j].x;
                const dy = nodeData[i].y - nodeData[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    connectionPairs.push([i, j, dist]);
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('class', 'brain-connection');
                    line.setAttribute('x1', nodeData[i].x);
                    line.setAttribute('y1', nodeData[i].y);
                    line.setAttribute('x2', nodeData[j].x);
                    line.setAttribute('y2', nodeData[j].y);
                    connsG.appendChild(line);
                }
            }
        }

        nodeData.forEach((node) => {
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('class', 'brain-node');
            c.setAttribute('cx', node.x);
            c.setAttribute('cy', node.y);
            c.setAttribute('r', 2);
            nodesG.appendChild(c);

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            g.setAttribute('class', 'brain-node-core');
            g.setAttribute('cx', node.x);
            g.setAttribute('cy', node.y);
            g.setAttribute('r', 2);
            g.style.animationDelay = (seededRandom() * 5) + 's';
            g.style.animationDuration = (2.5 + seededRandom() * 3) + 's';
            nodesG.appendChild(g);
        });

        // Draw connections from orchestrator (center: 300, 290) to nearby nodes
        const orchX = 300, orchY = 290;
        nodeData.forEach((node) => {
            const dx = node.x - orchX;
            const dy = node.y - orchY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 70) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('class', 'brain-connection');
                line.setAttribute('x1', orchX);
                line.setAttribute('y1', orchY);
                line.setAttribute('x2', node.x);
                line.setAttribute('y2', node.y);
                line.style.opacity = '0.25';
                line.style.stroke = '#00c45a';
                connsG.appendChild(line);
            }
        });

        function createSignal() {
            if (connectionPairs.length === 0) return;
            const pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
            const n1 = nodeData[pair[0]];
            const n2 = nodeData[pair[1]];

            const sig = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            sig.setAttribute('r', 1.5);
            sig.setAttribute('fill', '#00c45a');
            sig.setAttribute('opacity', '0');
            sigsG.appendChild(sig);

            const duration = 800 + Math.random() * 1200;
            const start = performance.now();

            function animateSignal(time) {
                const elapsed = time - start;
                const t = Math.min(elapsed / duration, 1);
                const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                sig.setAttribute('cx', n1.x + (n2.x - n1.x) * ease);
                sig.setAttribute('cy', n1.y + (n2.y - n1.y) * ease);
                let opacity = 1;
                if (t < 0.15) opacity = t / 0.15;
                else if (t > 0.85) opacity = (1 - t) / 0.15;
                sig.setAttribute('opacity', opacity * 0.8);
                if (t < 1) requestAnimationFrame(animateSignal);
                else sig.remove();
            }
            requestAnimationFrame(animateSignal);
        }

        setInterval(createSignal, 300);
        for (let i = 0; i < 5; i++) setTimeout(createSignal, i * 100);
    }

    // ---- TERMINAL TYPING EFFECT ----
    const terminalEl = document.getElementById('terminalText');
    if (terminalEl) {
        const phrases = [
            'HAMON.AI — SYSTEMS INITIALIZED',
            'LOADING AGENT REGISTRY...',
            'NEURAL MESH CONNECTED',
            'READY FOR INTERFACE',
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function typeLoop() {
            const current = phrases[phraseIdx];
            if (!isDeleting) {
                terminalEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 2500);
                    return;
                }
            } else {
                terminalEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                }
            }
            setTimeout(typeLoop, isDeleting ? 30 : (40 + Math.random() * 60));
        }
        setTimeout(typeLoop, 1000);
    }

    // ---- REVEAL ON SCROLL ----
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    // ---- NAV SCROLL ----
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // ---- MOBILE NAV ----
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileNav = document.getElementById('mobileNav');
    if (menuToggle && menuClose && mobileNav) {
        menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
        menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
        document.querySelectorAll('.mobile-link').forEach(l => {
            l.addEventListener('click', () => mobileNav.classList.remove('open'));
        });
    }

    // ---- THEME TOGGLE ----
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const htmlEl = document.documentElement;

    function updateToggleIcons() {
        const isLight = htmlEl.classList.contains('light');
        const icon = isLight ? '\u263E' : '\u2600';  // ☾ or ☀
        if (themeToggle) themeToggle.textContent = icon;
        if (themeToggleMobile) themeToggleMobile.textContent = icon;
    }

    // Apply saved preference on load
    if (localStorage.getItem('theme') === 'light') {
        htmlEl.classList.add('light');
    }
    updateToggleIcons();

    function toggleTheme() {
        htmlEl.classList.toggle('light');
        localStorage.setItem('theme', htmlEl.classList.contains('light') ? 'light' : 'dark');
        updateToggleIcons();
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // ---- SMOOTH SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- PARALLAX BRAIN ON MOUSE MOVE ----
    const brainEl = document.getElementById('brainContainer');
    if (brainEl && window.innerWidth > 991) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            brainEl.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
        }, { passive: true });
    }

    // ---- MARKDOWN PARSER HELPERS ----
    function parseMdSections(text) {
        return text.split(/^---$/m)
            .map(s => s.trim())
            .filter(s => s.length > 0);
    }

    function parseCaseBlock(block) {
        const lines = block.split('\n');
        const trimmed = lines.map(l => l.trim());
        const nonEmpty = trimmed.filter(l => l.length > 0);
        if (nonEmpty.length < 2) return null;

        const tag = nonEmpty[0];
        const titleLine = nonEmpty.find(l => l.startsWith('# '));
        const title = titleLine ? titleLine.replace(/^# /, '') : '';

        let image = '';
        let url = '';
        const imageLine = nonEmpty.find(l => l.startsWith('image:'));
        if (imageLine) image = imageLine.replace(/^image:\s*/, '');
        const urlLine = nonEmpty.find(l => l.startsWith('url:'));
        if (urlLine) url = urlLine.replace(/^url:\s*/, '');

        // Split on first blank line to separate short desc from long desc
        const metaKeys = new Set([tag, titleLine, imageLine, urlLine].filter(Boolean));
        const contentLines = trimmed.slice(trimmed.indexOf(tag.length ? tag : trimmed[0]));

        // Find first blank line index in the original trimmed array (after the tag line)
        const tagIdx = trimmed.indexOf(tag);
        let blankIdx = -1;
        for (let i = tagIdx + 1; i < trimmed.length; i++) {
            if (trimmed[i] === '') { blankIdx = i; break; }
        }

        // Content lines = lines that aren't tag, title, image:, url:, or blank
        const isMetaLine = l => l === tag || l.startsWith('# ') || l.startsWith('image:') || l.startsWith('url:') || l === '';

        let shortDesc = '';
        let longDesc = '';

        if (blankIdx > -1) {
            shortDesc = trimmed.slice(tagIdx, blankIdx).filter(l => !isMetaLine(l)).join(' ');
            longDesc = trimmed.slice(blankIdx + 1).filter(l => l.length > 0).join(' ');
        } else {
            shortDesc = nonEmpty.filter(l => !isMetaLine(l)).join(' ');
        }

        return { tag, title, image, url, shortDesc, longDesc };
    }

    function parsePostBlock(block) {
        const lines = block.split('\n');
        const trimmedLines = lines.map(l => l.trim());
        const date = trimmedLines[0] || '';
        const titleLine = trimmedLines.find(l => l.startsWith('# '));
        const title = titleLine ? titleLine.replace(/^# /, '') : '';
        const titleIdx = trimmedLines.indexOf(titleLine);
        const bodyLines = lines.slice(titleIdx + 1).join('\n').trim();
        const excerpt = bodyLines.replace(/[#*_`\[\]]/g, '').substring(0, 120) + '...';
        return { date, title, excerpt, body: bodyLines };
    }

    // Work card pattern cycling
    const patterns = ['work-pattern-1', 'work-pattern-2', 'work-pattern-3'];

    // ---- DYNAMIC CASE STUDIES FROM cases.md ----
    const casesLoader = document.getElementById('casesLoader');
    const casesGrid = document.getElementById('casesGrid');

    if (casesLoader && casesGrid) {
        fetch('cases.md')
            .then(r => r.text())
            .then(text => {
                const blocks = parseMdSections(text);
                const cases = blocks.map(parseCaseBlock).filter(Boolean);

                casesLoader.classList.add('hidden');
                casesGrid.style.display = '';

                cases.forEach((c, i) => {
                    const visualHTML = c.image
                        ? `<img class="work-card-image" src="${c.image}" alt="${c.title}" loading="lazy">`
                        : `<div class="work-pattern ${patterns[i % patterns.length]}"></div>`;

                    const col = document.createElement('div');
                    col.className = 'col-lg-4';
                    col.innerHTML = `
                        <div class="work-card clickable card-fade-in" style="animation-delay: ${i * 0.1}s" data-case-idx="${i}">
                            <div class="work-card-visual">${visualHTML}</div>
                            <div class="work-card-body">
                                <div class="work-card-tag">${c.tag}</div>
                                <h3 class="work-card-title">${c.title}</h3>
                            </div>
                        </div>`;
                    casesGrid.appendChild(col);

                    // Click handler to open modal
                    col.querySelector('.work-card').addEventListener('click', () => {
                        openCaseModal(c);
                    });
                });
            })
            .catch(() => {
                casesLoader.innerHTML = '<span class="loader-text" style="color: var(--text-muted);">Failed to load case studies</span>';
            });
    }

    // ---- CASE MODAL LOGIC ----
    function openCaseModal(c) {
        const modalEl = document.getElementById('caseModal');
        if (!modalEl) return;

        const imageWrap = document.getElementById('caseModalImageWrap');
        const tagEl = document.getElementById('caseModalTag');
        const titleEl = document.getElementById('caseModalTitle');
        const urlEl = document.getElementById('caseModalUrl');
        const descEl = document.getElementById('caseModalDesc');

        // Image
        if (c.image) {
            imageWrap.innerHTML = `<img src="${c.image}" alt="${c.title}">`;
            imageWrap.classList.add('has-image');
        } else {
            imageWrap.innerHTML = '';
            imageWrap.classList.remove('has-image');
        }

        // Tag & title
        tagEl.textContent = c.tag;
        titleEl.textContent = c.title;

        // URL
        if (c.url) {
            urlEl.href = c.url;
            urlEl.textContent = c.url.replace(/^https?:\/\//, '');
            urlEl.style.display = '';
        } else {
            urlEl.style.display = 'none';
        }

        // Description — show long desc if available, otherwise short
        const descText = c.longDesc || c.shortDesc;
        descEl.textContent = descText;

        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    // ---- DYNAMIC BLOG FROM posts.md ----
    const blogLoader = document.getElementById('blogLoader');
    const blogGrid = document.getElementById('blogGrid');
    const blogList = document.getElementById('blogList');

    if (blogLoader && blogGrid) {
        fetch('posts.md')
            .then(r => r.text())
            .then(text => {
                const blocks = parseMdSections(text);
                const posts = blocks.map(parsePostBlock).filter(p => p.title);

                blogLoader.classList.add('hidden');
                blogGrid.style.display = '';

                // First post as a featured card
                if (posts.length > 0) {
                    const p = posts[0];
                    const col = document.createElement('div');
                    col.className = 'col-lg-8';
                    col.innerHTML = `
                        <a href="blog.html?post=0" class="blog-card card-fade-in">
                            <div class="blog-card-date">${p.date}</div>
                            <h3 class="blog-card-title">${p.title}</h3>
                            <p class="blog-card-excerpt">${p.excerpt}</p>
                            <span class="blog-card-link">Read transmission &rarr;</span>
                        </a>`;
                    blogGrid.appendChild(col);
                }

                // Remaining posts as a compact list
                if (posts.length > 1 && blogList) {
                    blogList.style.display = '';
                    posts.slice(1).forEach((p, i) => {
                        const a = document.createElement('a');
                        a.href = `blog.html?post=${i + 1}`;
                        a.className = 'blog-list-item card-fade-in';
                        a.style.animationDelay = `${i * 0.05}s`;
                        a.innerHTML = `
                            <span class="blog-list-date">${p.date}</span>
                            <span class="blog-list-title">${p.title}</span>`;
                        blogList.appendChild(a);
                    });
                }
            })
            .catch(() => {
                blogLoader.innerHTML = '<span class="loader-text" style="color: var(--text-muted);">No transmissions found</span>';
            });
    }
})();
