# up.front

Website for [Up.front](https://upfrontug.github.io/) — a Berlin meetup for the web design and frontend community (2010–2019).

Built with [Jekyll 4](https://jekyllrb.com/) and plain CSS. Deployed via GitHub Actions to GitHub Pages.

## Local development

Requirements: Ruby 3.3+ and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000

To reach the site from another device on your network:

```bash
bundle exec jekyll serve --host 0.0.0.0
```

After changing `_config.yml`, restart the Jekyll server.

## Deployment

Pushes to the `gh-pages` branch trigger the [GitHub Actions workflow](.github/workflows/pages.yml), which builds the site with Jekyll 4.4 and deploys to GitHub Pages.

**One-time setup** (if not done yet): in the repository settings under **Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

## Project structure

| Path | Purpose |
|------|---------|
| `_posts/` | Meetup posts (YAML front matter + optional HTML body) |
| `_layouts/`, `_includes/` | HTML templates |
| `css/` | Plain CSS stylesheets |
| `images/` | Site and speaker images |
| `*.html` | Static pages (about, archive, submit, …) |

Styles are plain CSS files linked from `_includes/head.html` — there is no Sass/SCSS build step.

## Adding a meetup post

Create a new file in `_posts/` named `YYYY-MM-DD-meetup.html`:

```yaml
---
counter: "87"
intro: >
  Short intro shown on the event page.
meetup: "https://www.meetup.com/up-front-ug/events/…"
talks:
  - name: "Speaker Name"
    title: "Talk title"
    desc: "Talk abstract."
    bio: "Speaker bio."
    picture: "speaker-slug.jpg"
    links:
      - title: "@handle"
        url: "https://twitter.com/handle"
---
```

Speaker photos go in `images/talks/`. The default event time is `7:45pm` (set in `_config.yml`).

Browse existing posts in `_posts/` for examples.

## Contributing

1. Fork the repository
2. Create a branch, make your changes
3. Verify locally with `bundle exec jekyll build`
4. Open a pull request against `gh-pages`

For content or design changes beyond bug fixes, please open an issue first so we can align on scope.
