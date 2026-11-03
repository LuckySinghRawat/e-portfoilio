let SITE_CONFIG;

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
const iconMarkup = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.2-6-2.5m12 5v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.3 4.3 0 0 0-.1-3.1S17.4 3.6 15 5a13.2 13.2 0 0 0-6 0C6.6 3.6 5.6 3.9 5.6 3.9A4.3 4.3 0 0 0 5.5 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.9 5.7 5.6 6A2.7 2.7 0 0 0 9 18.4V21"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6m-8-10v10"/><path d="M2 2h20v20H2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>',
    blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m-11 5L20 4M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>'
};
const externalAttrs = 'target="_blank" rel="noopener noreferrer"';

function renderSocialLinks() {
    const labels = { github: "GitHub", linkedin: "LinkedIn", email: "Email", blog: "Blog" };
    document.getElementById("hero-socials").innerHTML = Object.entries(SITE_CONFIG.links).map(([key, url]) =>
        `<a class="icon-link" href="${escapeHTML(url)}" ${key === "email" ? "" : externalAttrs} aria-label="${labels[key]}">${iconMarkup[key]}</a>`
    ).join("");
    document.getElementById("connect-actions").innerHTML = ["linkedin", "email", "github", "blog"].map((key) => {
        const label = { linkedin: "LinkedIn", email: "Email", github: "GitHub", blog: "Read Blogs" }[key];
        return `<a class="button" href="${escapeHTML(SITE_CONFIG.links[key])}" ${key === "email" ? "" : externalAttrs}>${iconMarkup[key]}${label}</a>`;
    }).join("");
}

function renderFacts() {
    document.getElementById("quick-facts").innerHTML = SITE_CONFIG.quickFacts.map(({ label, value }) =>
        `<div class="fact"><span>${escapeHTML(label)}</span><span>${escapeHTML(value)}</span></div>`
    ).join("");
}

function renderProfiles() {
    document.getElementById("profiles-updated").textContent = SITE_CONFIG.profilesUpdated;
    document.getElementById("profile-grid").innerHTML = SITE_CONFIG.profiles.map((profile) => `
        <article class="profile-card">
          <div class="profile-title"><span class="platform-mark" aria-hidden="true">${escapeHTML(profile.mark)}</span><h4>${escapeHTML(profile.name)}</h4></div>
          <p class="profile-handle">@${escapeHTML(profile.username)}</p>
          <div class="profile-stats">${profile.stats.map((stat) => `<div class="profile-stat"><span class="profile-stat-value">${escapeHTML(stat.value)}</span><span class="profile-stat-label">${escapeHTML(stat.label)}</span></div>`).join("")}</div>
          <a class="profile-visit" href="${escapeHTML(profile.url)}" ${externalAttrs}>View Profile</a>
        </article>`).join("");
}

function renderSkills() {
    document.getElementById("skills-grid").innerHTML = SITE_CONFIG.skills.map((group) => `
        <article class="skill-group"><div class="skill-group-head"><h3>${escapeHTML(group.category)}</h3><span class="level">${escapeHTML(group.level)}</span></div>
          <div class="skill-tags">${group.items.map((skill) => `<span class="tag">${escapeHTML(skill)}</span>`).join("")}</div>
        </article>`).join("");
}

function renderProjects() {
    document.getElementById("projects-track").innerHTML = SITE_CONFIG.projects.map((project, index) => `
        <article class="project-card" aria-label="${escapeHTML(project.title)}">
          <div class="project-inner">
            <div class="card-topline"><span class="card-kicker">PROJECT / STUDY</span><span class="card-index">${String(index + 1).padStart(2, "0")}</span></div>
            <h3>${escapeHTML(project.title)}</h3><p class="project-description">${escapeHTML(project.description)}</p>
            <div class="detail-block"><h4>Goal achieved</h4><ul class="project-points">${project.goal.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul></div>
            <div class="skill-tags">${project.technologies.map((technology) => `<span class="tag">${escapeHTML(technology)}</span>`).join("")}</div>
            <div class="detail-block"><h4>Learning &amp; impact</h4><ul class="project-points">${project.learning.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul></div>
            <div class="project-bottom"><a class="proof-link" href="${escapeHTML(project.proof)}" ${externalAttrs}>View Proof</a><span class="placeholder-note">Replace sample content</span></div>
          </div>
        </article>`).join("");
}

function renderAchievements() {
    document.getElementById("achievements-track").innerHTML = SITE_CONFIG.achievements.map((achievement, index) => {
        const progress = Number.isFinite(achievement.progress) ? Math.min(100, Math.max(0, achievement.progress)) : 0;
        const progressText = achievement.progressText || "[Set your progress]";
        return `<article class="achievement-card" aria-label="${escapeHTML(achievement.title)}">
          <div class="achievement-inner"><div class="card-topline"><span class="card-kicker">MILESTONE LOG</span><span class="card-index">${String(index + 1).padStart(2, "0")}</span></div>
            <h3>${escapeHTML(achievement.title)}</h3><ul class="achievement-list">${achievement.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
            <div class="progress-block"><div class="progress-meta"><span>${escapeHTML(achievement.progressLabel)}</span><span class="progress-value">${escapeHTML(progressText)}</span></div>
              <div class="progress-track" role="progressbar" aria-label="${escapeHTML(achievement.progressLabel)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><div class="progress-fill" style="width:${progress}%"></div></div>
            </div>
          </div>
        </article>`;
    }).join("");
}

function setupCarousel(name) {
    const shell = document.querySelector(`[data-carousel="${name}"]`);
    const track = shell.querySelector(".carousel-track");
    const cards = [...track.children];
    const buttons = [...shell.querySelectorAll(".carousel-button")];
    const status = document.getElementById(`${name}-status`);
    let scheduled = false;

    function updateActive() {
        scheduled = false;
        const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;
        cards.forEach((card, index) => {
            const bounds = card.getBoundingClientRect();
            const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
            if (distance < closestDistance) { closestDistance = distance; closestIndex = index; }
            card.classList.toggle("is-active", distance <= closestDistance);
        });
        cards.forEach((card, index) => card.classList.toggle("is-active", index === closestIndex));
        status.textContent = `${String(closestIndex + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
        buttons[0].disabled = closestIndex === 0;
        buttons[1].disabled = closestIndex === cards.length - 1;
    }

    function scheduleUpdate() {
        if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive); }
    }

    function move(direction) {
        const current = cards.findIndex((card) => card.classList.contains("is-active"));
        const next = Math.min(cards.length - 1, Math.max(0, current + direction));
        cards[next].scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest", inline: "center" });
    }

    buttons[0].addEventListener("click", () => move(-1));
    buttons[1].addEventListener("click", () => move(1));
    track.addEventListener("scroll", scheduleUpdate, { passive: true });
    track.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
        }
    });
    let pointerStart = null;
    track.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button === 0) pointerStart = { x: event.clientX, scroll: track.scrollLeft };
    });
    track.addEventListener("pointermove", (event) => {
        if (pointerStart && event.buttons === 1) track.scrollLeft = pointerStart.scroll - (event.clientX - pointerStart.x);
    });
    track.addEventListener("pointerup", () => { pointerStart = null; });
    track.addEventListener("pointercancel", () => { pointerStart = null; });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    const initialCard = cards[Math.min(1, cards.length - 1)];
    const trackBounds = track.getBoundingClientRect();
    const initialBounds = initialCard.getBoundingClientRect();
    track.scrollLeft += initialBounds.left - trackBounds.left - (track.clientWidth - initialBounds.width) / 2;
    updateActive();
}

function setupTypingEffect() {
    const target = document.getElementById("typed-tagline");
    const phrase = "securing systems from the compiler up";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        target.textContent = phrase;
        return;
    }
    target.textContent = "";
    let characterIndex = 0;
    const typeNextCharacter = () => {
        if (characterIndex >= phrase.length) return;
        target.textContent += phrase[characterIndex++];
        window.setTimeout(typeNextCharacter, 38);
    };
    window.setTimeout(typeNextCharacter, 320);
}

function setupNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const links = [...document.querySelectorAll(".nav-link")];
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        navLinks.classList.toggle("is-open", !isOpen);
    });
    links.forEach((link) => link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        navLinks.classList.remove("is-open");
    }));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
                if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        });
    }, { rootMargin: "-25% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

function setupPhoto() {
    const photo = document.getElementById("profile-photo");
    const shell = document.getElementById("avatar-shell");
    const showPhoto = () => shell.classList.add("image-loaded");
    photo.addEventListener("load", showPhoto);
    photo.addEventListener("error", () => photo.remove());
    photo.src = SITE_CONFIG.assets.photo;
    if (photo.complete && photo.naturalWidth > 0) showPhoto();
}

async function initializePortfolio() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error(`Could not load data.json (${response.status})`);
        SITE_CONFIG = await response.json();

        renderSocialLinks();
        renderFacts();
        renderProfiles();
        renderSkills();
        renderProjects();
        renderAchievements();
        setupNavigation();
        setupPhoto();
        setupCarousel("projects");
        setupCarousel("achievements");
        setupTypingEffect();
        document.getElementById("resume-link").href = SITE_CONFIG.assets.resume;
        document.getElementById("copyright-year").textContent = new Date().getFullYear();
    } catch (error) {
        console.error("Portfolio initialization failed:", error);
    }
}

initializePortfolio();