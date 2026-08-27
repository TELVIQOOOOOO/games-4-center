# GAMES FOR CENTER HIGH — from danny(heh)

A no-backend, promo-code-gated arcade. 20 lightweight games (plain HTML5
canvas / JS — no libraries, no big downloads), so they run fine on old
school laptops.

## How it works

- Anyone who opens the site sees a paywall ("$4.99 — Pay & Unlock"). The
  **Pay & Unlock button doesn't actually charge anyone** — it just shows a
  message nudging toward the promo box. There's no real payment processor
  hooked up.
- The only real way in is a **promo code**, typed into the box under the
  price. Once a valid code is entered, that browser is unlocked forever
  (saved in that browser's local storage).
- You generate codes from `admin.html` (see below).

## Hosting it

This is a static site — just files. Easiest free options:
- **GitHub Pages**: create a repo, upload this whole folder, turn on Pages.
- **Netlify / Vercel drop**: drag the folder onto their "deploy" page.
- Or just zip it and have friends open `index.html` directly on their own
  laptop (works fully offline too, no server needed).

## The admin panel

Open `admin.html`. Default password is `danny2026` — **change it** before
you host this anywhere public: open `admin.html`, find the line

```
const ADMIN_PASSWORD = "danny2026";
```

and change the text. Anyone who views the page source can read this
password, so treat `admin.html` as semi-private — don't post the link
around school. (You can also just keep `admin.html` on your own computer
only, and only upload `index.html`, `style.css`, `access.js`, and the
`games/` folder to the public site — the promo codes it generates will
still work there, since validation doesn't need `admin.html` to be online.)

In the admin panel: type a name (just for your notes), hit **Generate
code**, and send the code to that friend. They paste it into the promo box
on the main page. Codes never expire and there's no limit on how many you
generate.

### If a code leaks around school

Open `access.js`, change this line to any different text:

```
const CHG_SALT = "danny-center-high-2026";
```

Save and re-upload the site. Every code you've handed out so far instantly
stops working, and you can generate fresh ones.

## The 20 games

Snake, Block Stacker, 2048, Breakout, Pong (vs CPU or 2P), Flappy Block,
Space Defender, Dino Runner, Whack-a-Mole, Memory Match, Simon Says,
Minesweeper, Sliding Puzzle, Tic Tac Toe (2P), Connect Four (2P), Rock
Paper Scissors (vs CPU), Hangman, Maze Runner, Reaction Test, and Pizza
Clicker.

## Adding more games later

Drop a new `.html` file into `games/`, paste this snippet right after
`<body>` so it respects the paywall:

```html
<script src="../access.js"></script>
<script>if(!chgIsUnlocked()){location.href="../index.html";}</script>
```

Then add an entry to the `GAMES` array near the top of the `<script>` tag
in `index.html`:

```js
{name:"Your Game", file:"yourgame.html", icon:"🎮", genre:"Arcade"},
```

## Notes on scope

Building 100 fully unique games wasn't realistic to do in one go — this
starter pack has 20 real, playable ones built from scratch (not reskins of
existing copyrighted games). Send over ideas for the next batch whenever
you're ready and more can be added the same way.
