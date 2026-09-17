# In Loving Memory of Vanessa Wheyland — website

A simple, free memorial site that runs on GitHub Pages. No coding needed after setup:
everything you'll ever change lives in **one file, `config.js`**.

Time to get live: **about 10 minutes** for the site itself, plus **~15 minutes** if you set up the
message board and shared photo album (both optional and can be added later).

---

## Files in this folder

| File / folder | What it is |
|---|---|
| `index.html`, `style.css`, `app.js` | The site. You should not need to touch these. |
| `config.js` | **The only file you edit.** Name, GoFundMe link, events, updates, photo list, message-board links. |
| `photos/` | Put photos of Vanessa here (JPG/PNG, ideally under 2 MB each). |
| `assets/` | The vigil flyer (JPG + PDF). |
| `.nojekyll` | Tells GitHub to serve the files exactly as they are. Leave it. |

---

## Step 1 — Put the site on GitHub (≈10 min)

1. Sign in at github.com (create a free account if needed).
2. Click the **+** (top right) → **New repository**.
   - Name: `vanessa` (or anything). Set it to **Public** — GitHub Pages is free only on public repos.
   - Do **not** add a README or .gitignore. Click **Create repository**.
3. On the empty repo page click **uploading an existing file**.
4. Drag **all** the files and folders from this download into the upload area
   (`index.html`, `style.css`, `app.js`, `config.js`, `.nojekyll`, the `assets` and `photos` folders).
   Click **Commit changes**.
5. Go to **Settings → Pages** (left sidebar). Under *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**.
6. Wait 1–2 minutes and refresh. GitHub shows your link:
   `https://YOUR-USERNAME.github.io/vanessa/`

That link is what you share. Every time you edit `config.js` on GitHub and commit, the site updates in about a minute.

**To edit `config.js` later:** open the repo → click `config.js` → the pencil icon (Edit) → change the text → **Commit changes**.

> Optional: a nicer address like `rememberingvanessa.com` costs ~$12/yr at any registrar; GitHub's
> Pages settings has a *Custom domain* box for it. Not needed for tomorrow.

---

## Step 2 — Add the GoFundMe link (1 min)

In `config.js`:

```js
gofundmeUrl: "https://www.gofundme.com/f/your-campaign-name",
```

The GoFundMe section and the "Support the Family" nav button appear automatically once the link is filled in.

Vanessa's portrait (`photos/vanessa.jpg`) and the two family photos in the gallery are already in place.
To use a real photo of the Carlsbad coast behind the top of the page instead of the illustrated beach scene,
upload it to `photos` and set `heroBackground: "photos/your-file.jpg"` — the dreamy sunset wash is applied automatically.

---

## Step 3 — Message board (Google Form + Google Sheet) — ✅ ALREADY SET UP

**Done for this site.** Form: *Messages for Vanessa's Family*; responses land in the Google Sheet *Vanessa Memorial - Messages* in Jason's Google Drive. To moderate, open that sheet and delete a row. The steps below are only for reference or if you ever need to rebuild it.

Visitors type a message in a Google Form embedded on the page; the responses land in a Google Sheet;
the page reads that sheet and shows the messages. The family removes anything unwanted by deleting the row.

1. Go to **forms.google.com** → **Blank form**. Title it *Messages for Vanessa's family*.
2. Add two questions, in this order:
   - **Your name** — Short answer. (Optional, so people may sign "A friend".)
   - **Your message** — Paragraph. Mark **Required**.
   Keep the form open to everyone: **Settings → Responses → turn OFF "Collect email addresses" and "Limit to 1 response"** (the latter requires sign-in).
3. Click **Send** (top right) → the **link icon** → copy the link. Paste it into `config.js`:
   ```js
   messageFormUrl: "https://docs.google.com/forms/d/e/XXXXXXXX/viewform",
   ```
4. Back in the form, open the **Responses** tab → click the green **Sheets icon** ("Link to Sheets") → **Create a new spreadsheet**.
5. In that spreadsheet: **File → Share → Publish to web**.
   - First dropdown: choose the responses sheet (usually *Form Responses 1*), **not** "Entire document".
   - Second dropdown: **Comma-separated values (.csv)**.
   - Click **Publish**, confirm, and copy the link (it ends in `output=csv`). Paste it into `config.js`:
   ```js
   messageSheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/XXXXXXXX/pub?gid=0&single=true&output=csv",
   ```
6. Commit `config.js`. Post a test message on the site, wait a minute, refresh — it should appear.

**Moderating:** open the spreadsheet and delete any row you don't want shown. It disappears from the site within ~5 minutes (Google republishes on a schedule).

**Optional: approve-before-showing.** Add a column to the sheet with the header `Approved`. Only rows where you type `yes` in that column will show. (Without that column, everything shows unless you delete it.)

> Why not comments that need a login? Most friends and family won't have a GitHub account, and a
> grieving visitor shouldn't have to create one. The form works from any phone with no sign-in.

---

## Step 4 — Shared photo album (Google Photos) — ✅ ALREADY SET UP

**Done for this site.** Album: *Remembering Vanessa* in Jason's Google Photos, link sharing + Collaborate on, location sharing off. Link: https://photos.app.goo.gl/4WuMcfr7T3oaMacq6. To remove a photo, open the album and delete it. Steps below are for reference only.

1. Open **photos.google.com** (or the Google Photos app) → **Albums → Create album**. Name it *Remembering Vanessa*.
2. Add one or two photos to start.
3. Open the album → **Share** icon → **Create link**. Turn on **Collaborate** (lets anyone with the link add photos). Copy the link.
4. Paste it into `config.js`:
   ```js
   photoAlbumUrl: "https://photos.app.goo.gl/XXXXXXXX",
   ```
   The "Add your photos to the shared album" button appears automatically.

**Curating photos onto the page itself:** download your favorites from the album, upload them to the `photos` folder on GitHub,
and list them in `config.js`:

```js
gallery: [
  { src: "photos/beach-2019.jpg", caption: "Tamarack Beach, summer 2019" },
  { src: "photos/family.jpg",     caption: "" },
],
```

Tip: keep images under ~2 MB so the page loads quickly on phones. On a Mac, Preview → Tools → Adjust Size (width 2000 px) is enough.

---

## Posting updates and adding events

In `config.js`, add a new block at the **top** of the `updates` list:

```js
updates: [
  {
    date: "September 18, 2026",
    title: "Thank you",
    text: "To everyone who came to Tamarack Beach last night — thank you. ..."
  },
  // ...older updates below
],
```

For a memorial service or celebration of life, copy the vigil block inside `events` and change the details.
Leave `flyerImage`/`flyerPdf` as `""` if there's no flyer.

---

## Checklist before sharing the link

- [ ] Site loads at `https://YOUR-USERNAME.github.io/vanessa/`
- [ ] Vigil details correct (date, sunset time, meeting point)
- [ ] GoFundMe link works and opens the right campaign
- [ ] Vanessa's portrait shows at the top with the glow and light rays
- [ ] Test message posted and appears on the page
- [ ] Album link opens and allows adding photos
- [ ] Looks right on a phone (most visitors will be on one)

---

## If something isn't working

- **Site shows a 404**: Pages can take up to 5 minutes the first time. Check Settings → Pages says the branch is `main` and folder is `/ (root)`, and that `index.html` is at the top level of the repo (not inside a subfolder).
- **Messages say "could not be loaded"**: the sheet must be *published to web* as CSV (Step 3.5), not just "shared". Re-check the link ends in `output=csv`.
- **Form doesn't appear**: the link must be the `/viewform` link from the Send dialog, not the editing link.
- **Photo doesn't show**: file names are case-sensitive. `Photo.JPG` and `photo.jpg` are different files.
