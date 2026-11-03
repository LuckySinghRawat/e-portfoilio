# Lucky Singh Rawat | Cybersecurity Portfolio

A responsive, single-file portfolio built with HTML, CSS, and vanilla JavaScript. No build step, framework, or external runtime dependency is required.

## Personalize before publishing

1. Replace `profile.jpg` with your profile photo, or update `SITE_CONFIG.assets.photo`.
2. Add your `resume.pdf` to the site root, or update `SITE_CONFIG.assets.resume`.
3. Edit the `SITE_CONFIG` object near the bottom of `index.html`. Replace the GitHub, LinkedIn, email, and blog placeholders.
4. Update platform usernames, profile URLs, statistics, and `profilesUpdated`.
5. Replace the project descriptions, results, technologies, learning notes, and proof links with verified details.
6. Replace achievement bullets and set progress values to numbers from `0` to `100`; use `null` until you have a real value.
7. Review the skills and their proficiency labels so they reflect your current experience.

All profile, skill, project, achievement, and contact data is stored in the `SITE_CONFIG` object in `index.html`. No live profile API calls are made.

## Deploy to Netlify

1. Put `index.html`, `_headers`, `profile.jpg`, and `resume.pdf` in the site root. The image and PDF are optional until you add them.
2. Push the folder to a Git provider and import the repository in Netlify, or drag the folder into Netlify Drop.
3. For this static site, leave the build command empty and set the publish directory to the repository root (`.`).
4. After deployment, check the deployed response headers in your browser's developer tools. The `_headers` file sets the requested security headers; HSTS should only be served on the HTTPS Netlify site.

## Security note

The single-file design requires `unsafe-inline` in the Content Security Policy for its inline CSS and JavaScript. The policy blocks external scripts and objects and disallows framing. If you later split CSS/JavaScript into files, remove `unsafe-inline` from the corresponding directives.