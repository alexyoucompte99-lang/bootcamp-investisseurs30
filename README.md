# Bootcamp Investisseurs 3.0 · tunnel d'inscription

Pages statiques (GitHub Pages prévu : `alexyoucompte99-lang/bootcamp-investisseurs30`, rien n'est publié pour l'instant). Source unique du discours : `../BRIEF.md`. Webhook : `../webhook/` (voir son README).

| Page | Rôle |
|---|---|
| `index.html` | Inscription (opt-in), A/B du haut de page, compteur, décompte réel jusqu'au mardi 20/10 20h |
| `merci.html?i=<Id>&v=<a\|b>` | Confirmation : vidéo 60 s, groupe WhatsApp, agenda (3 boutons Google + 1 .ics), 2 questions facultatives |
| `rejoindre.html?i=<Id>` | Lien personnel du direct (e-mails, agenda) : note la présence puis ouvre le direct |
| `direct.html` | Lien commun du direct (groupe WhatsApp, e-mails génériques) : demande l'e-mail, note la présence, ouvre le direct |
| `console.html` | Pilotage (code `bootcamp26`), agrégats seulement |
| `config.js` | Toute la configuration + outils communs (dates, Id, agenda, pixel, vidéo) |

## 1. Ce qu'il faut remplir dans `config.js`

| Clé | Quoi | Si vide |
|---|---|---|
| `WEBHOOK_URL` | URL `/exec` du webhook déployé | rien n'est envoyé, la page marche quand même |
| `VIDEO_URL` | vidéo de présentation (YouTube, Vimeo, Loom, Drive ou .mp4) | visuel « Le Bootcamp » avec la photo de Thomas |
| `VIDEO_MERCI_URL` | vidéo de 60 s de la page merci | encart « Vidéo bientôt disponible » |
| `GROUPES_WHATSAPP` | liens d'invitation, un ou plusieurs (tirage au hasard, mémorisé par navigateur) | bouton masqué, « le lien arrive par e-mail » |
| `LIVE_URLS` | `[soir1, soir2, soir3]`, liens YouTube non répertoriés | « Le lien s'active à 19h45 » |
| `RESERVATION_URL` | événement iClosed « Appel Stratégie - Bootcamp Investisseurs 3.0 » (redirige ensuite vers `appel-confirme.html`) | pas de bouton après le soir 3 |
| `META_PIXEL_ID` | pixel Meta dédié (ne pas reprendre celui du funnel VSL sans arbitrage) | aucun pixel |
| `URL_PAGE` | adresse publique finale (sous-domaine ensuite) | sert aux liens perso et à l'agenda : à mettre à jour si le domaine change, **et** la Script Property `URL_SITE` du webhook |
| `STATS_KEY` | clé de la route stats, identique à `STATS_KEY_DEFAUT` du webhook | déjà générée |

Les dates (`SESSIONS`), les 3 soirs (`SOIRS`) et les titres A/B (`VARIANTES`) reprennent le BRIEF : les changer ici les change partout.

## 2. Tester en local

```bash
cd /Users/alex/Alex/bootcamp-i3/site && python3 -m http.server 8977
```

- `index.html?v=a` ou `?v=b` : force la variante. `&test=1` : tout est marqué test (exclu des stats).
- `?maintenant=2026-10-21T19:50:00%2B02:00` sur `rejoindre.html` / `direct.html` : simule l'heure (marqué test). Fenêtre du direct : 19h45 à 22h30 le jour J. Sans Id pendant la fenêtre, `rejoindre.html` bascule sur `direct.html`.
- `console.html?code=bootcamp26` : ouvre la console sans taper le code.

Testé le 15/09/2026 : Chrome headless (captures dans le scratchpad de la session), parcours complet dans un vrai navigateur contre un faux webhook (visite, inscription, sync, merci, qualif, présence par Id, présence par e-mail, redirection vers le direct), Id identique page/webhook, .ics 3 événements (lignes ≤ 75 octets), aucun débordement horizontal à 298, 390 et 1440 px.

## 3. Le test A/B

- À la première visite, variante `a` ou `b` tirée à 50/50 et gardée dans `localStorage` (`bootcamp-variante`). `?v=a|b` force et mémorise.
- Seul le haut change (titre, sous-titre). Le morceau `accent` du titre passe en sauge.
- Envoyée au webhook avec chaque visite (onglet Visites, visiteur anonyme aléatoire) et chaque inscription (colonne Variante), et au pixel (`PageView`, `Lead`, `CompleteRegistration` avec le paramètre `variante`).
- UTM de l'URL gardés 30 jours sur le navigateur (premier contact) et envoyés avec la visite et l'inscription.
- Lecture dans la console : visiteurs uniques, inscrits, taux par variante, écart en points et test z à 95 % (pas de verdict sous 100 visiteurs par variante). Laisser tourner jusqu'au verdict « significatif » avant de couper une variante.

## 4. Le parcours et l'Id

1. `index.html` calcule l'Id court (8 caractères, SHA-256 de l'e-mail + sel) : même e-mail = même Id, dans la page comme dans le webhook. Envoi plafonné à 2,5 s, puis une balise `sync` part à part pour systeme.io (la personne n'attend pas), puis redirection vers `merci.html?i=<Id>&v=<variante>`.
2. Le prénom passe par `sessionStorage`, l'e-mail est gardé sur le navigateur pour pré-remplir `direct.html`.
3. `rejoindre.html?i=<Id>` est le lien des e-mails et de l'agenda ; `direct.html` est le lien commun. Les deux ouvrent le direct même si le webhook ne répond pas.

## 5. La console

`console.html`, code `bootcamp26` (simple rideau en `sessionStorage`, pas une sécurité : la page est publique). Elle ne lit que `WEBHOOK_URL?action=stats&cle=STATS_KEY`, qui ne renvoie **aucune donnée personnelle** (vérifié en simulation : ni e-mail, ni prénom, ni téléphone, ni Id). Affiche : inscrits vs 3 000, inscrits par jour, A/B, sources et top ads (`utm_content`), accord WhatsApp, réponses « où en êtes-vous », présents par soir vs 750. Rafraîchissement auto toutes les 60 s. Webhook vide ou en erreur : données de démonstration marquées **DÉMO** avec la raison.

## 6. Contrôles avant mise en ligne

```bash
cd /Users/alex/Alex/bootcamp-i3
grep -rc "$(printf '\342\200\224')" site webhook | grep -v ':0$'   # tirets cadratins : doit être vide
grep -ri 'vala[r]' site webhook                                     # marque exclue : doit être vide
```
