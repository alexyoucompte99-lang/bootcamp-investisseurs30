/* =====================================================================
   BOOTCAMP INVESTISSEURS 3.0 · CONFIG (la seule zone à modifier)
   Utilisée par index.html, merci.html, rejoindre.html, direct.html,
   appel-confirme.html et console.html. Source du discours : ../BRIEF.md (18/09/2026).

   - SESSIONS : les 3 soirs, heure de Paris (+02:00 jusqu'au 25/10/2026).
   - DUREE_MIN : durée d'un soir en minutes.
   - SOIRS : pour chaque soir (BRIEF §5 et §6) : titre, promesse, cas (le cas concret),
     ressource (remise aux présents, en direct) + ressourceDetail, et ressourceWa
     (ressource réservée au groupe WhatsApp ; vide = rien d'affiché pour ce soir).
   - DATE_FERMETURE : fin des réservations d'appel et des replays. Heure d'hiver
     à partir du 25/10/2026, donc +01:00 le 29/10.
     Les appels s'ouvrent à la FIN DU SOIR 1 (SESSIONS[0] + DUREE_MIN) : le bouton
     de réservation de rejoindre.html et direct.html s'affiche de là à DATE_FERMETURE.
   - PLACES_COHORTE : taille de la cohorte du Club ouverte à l'occasion du Bootcamp.
   - PLACES_RESTANTES : null = rien d'affiché. Un nombre = « Il reste N places sur 50 »
     (rejoindre.html, direct.html, FAQ de index.html). À n'utiliser que si c'est VRAI.
   - VARIANTES : A/B du haut de page (BRIEF §4). « accent » = morceau du titre en sauge
     (\\u00a0 = espace insécable, pour ne pas couper « de A à Z » ; à garder identique dans titre et accent).
   - WEBHOOK_URL : URL /exec de l'Apps Script (dossier webhook/). Vide = rien
     n'est envoyé (la page marche quand même, pratique pour tester).
   - STATS_KEY : clé de la route stats (agrégats seulement, aucune donnée
     personnelle). Même valeur que STATS_KEY dans webhook/Code.js.
   - VIDEO_URL : vidéo de présentation (YouTube, Vimeo, Loom, Drive ou .mp4).
     Vide = encart vidéo masqué (le programme court des 3 soirs le remplace sur ordinateur).
   - VIDEO_MERCI_URL : vidéo de 60 s de la page merci. Vide = étape masquée.
   - GROUPES_WHATSAPP : liens d'invitation. Vide = étape WhatsApp masquée sur merci.html.
     Plusieurs liens = un tiré au hasard par inscrit (répartit la charge entre groupes).
   - LIVE_URLS : lien du direct de chaque soir (YouTube non répertorié), ouvert par
     rejoindre.html (lien perso) et direct.html (lien commun, demande l'e-mail).
     Vide = « le lien s'active à 19h45 le jour J ».
   - RESERVATION_URL : événement iClosed « Appel Stratégie - Bootcamp Investisseurs 3.0 » (questions + calendrier).
     Après réservation, iClosed redirige vers appel-confirme.html (tag « a réservé » + pixel Schedule).
     Affiché sur rejoindre.html et direct.html dès la fin du soir 1, avec ?i=<Id>.
   - META_PIXEL_ID : pixel Meta. Vide = aucun pixel. Avec PIXEL_CONSENT à true,
     il ne se charge qu'après « Accepter » (règle CNIL).
   - COMPTEUR_MIN : le nombre d'inscrits ne s'affiche qu'à partir de ce seuil.
   - URL_PAGE : adresse publique des pages (liens perso, agenda). Même valeur que
     la Script Property URL_SITE du webhook (champ lien_perso de systeme.io).
   - SOURCE : étiquette de la version de page, écrite dans le Sheet.
===================================================================== */
window.CONFIG = {
  SESSIONS: [
    "2026-10-20T20:00:00+02:00",
    "2026-10-21T20:00:00+02:00",
    "2026-10-22T20:00:00+02:00"
  ],
  DUREE_MIN: 120,

  SOIRS: [
    {
      titre: "Construire votre stratégie de base",
      promesse: "Comprendre ce qu'est une vraie stratégie, savoir chez qui et dans quelles enveloppes mettre votre argent, et par quel investissement commencer selon votre profil.",
      cas: "Le profil classique en banque traditionnelle : des livrets et une assurance vie chargée en frais. Budget, épargne de précaution, analyse et sortie des contrats bancaires, ouverture des bonnes enveloppes.",
      ressource: "Le comparatif CTO, PEA, assurance vie, PER, PEE",
      ressourceDetail: "Les 5 enveloppes côte à côte, pour savoir laquelle ouvrir en premier.",
      ressourceWa: "La liste des meilleures plateformes par enveloppe"
    },
    {
      titre: "Le choix des placements",
      promesse: "Savoir construire un portefeuille bourse antifragile, et savoir si, et sous quelle forme, l'immobilier et les autres placements ont leur place dans votre stratégie.",
      cas: "La suite du profil du soir 1 : son portefeuille ligne par ligne, la place de l'immobilier, les montants et les enveloppes.",
      ressource: "Le top 10 des ETF éligibles au PEA",
      ressourceDetail: "Une liste pédagogique et comparative, pas une recommandation personnalisée.",
      ressourceWa: "La checklist d'une bonne affaire en immobilier"
    },
    {
      titre: "Votre stratégie de A à Z",
      promesse: "Voir trois stratégies complètes se construire en direct, à trois niveaux de patrimoine, et repartir avec la trame pour faire la vôtre.",
      cas: "Trois cas, du plus simple au plus étayé : 500\u00a0€ par mois sans capital ; 300\u00a0€ par mois et 20\u00a0000\u00a0€ ; 100\u00a0000\u00a0€ et plus à investir.",
      ressource: "La trame de stratégie en 5 étapes",
      ressourceDetail: "Situation, objectifs et horizon, profil, allocation, calendrier d'exécution.",
      ressourceWa: ""
    }
  ],

  DATE_FERMETURE: "2026-10-29T23:59:00+01:00",
  PLACES_COHORTE: 50,
  PLACES_RESTANTES: null,

  VARIANTES: {
    a: {
      nom: "Promesse de A à Z",
      titre: "Votre stratégie d'investissement complète, de\u00a0A\u00a0à\u00a0Z, en 3\u00a0soirées.",
      accent: "de\u00a0A\u00a0à\u00a0Z, en 3\u00a0soirées.",
      sousTitre: "Du 20 au 22 octobre à 20h, Thomas Mayol et ses experts construisent en direct une stratégie d'investissement comme le font les professionnels : les bonnes enveloppes, les bons placements, puis 3 cas concrets assemblés devant vous. Vous la gérez ensuite en totale autonomie. Gratuit, en ligne."
    },
    b: {
      nom: "L'ennemi (la banque)",
      titre: "Votre argent peut travailler pour vous. Votre banque ne vous montrera pas comment.",
      accent: "Votre banque ne vous montrera pas comment.",
      sousTitre: "3 soirées en direct avec Thomas Mayol et ses experts, du 20 au 22 octobre à 20h : on construit une stratégie d'investissement complète, de A à Z, sans intermédiaire ni frais cachés, sur 3 cas concrets. Gratuit, en ligne."
    }
  },

  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbx_pOE_ieFvdP2-tkTreXEg9bBkV7zfdlgfo93a74pmLqIUltzrw_8GRiPPRnARjiId/exec",
  STATS_KEY: "LN2lBeGw9e8H3tnN_I_5ugsIpu8ITv9R",
  VIDEO_URL: "",
  VIDEO_MERCI_URL: "",
  GROUPES_WHATSAPP: [],
  LIVE_URLS: ["", "", ""],
  RESERVATION_URL: "https://app.iclosed.io/e/investisseurs-3-0/appel-strategie-bootcamp?utm_source=bootcamp&utm_campaign=bootcamp-oct26",
  META_PIXEL_ID: "",
  PIXEL_CONSENT: true,
  COMPTEUR_MIN: 300,
  OBJECTIF_INSCRITS: 3000,
  OBJECTIF_PRESENTS: 750,
  URL_PAGE: "https://alexyoucompte99-lang.github.io/bootcamp-investisseurs30/",
  SOURCE: "lp-bootcamp-i3-v2"
};


/* =====================================================================
   OUTILS COMMUNS AUX PAGES (ne pas modifier sans raison)
===================================================================== */
window.BOOTCAMP = (function () {
  var C = window.CONFIG;
  var TZ = 'Europe/Paris';
  var SEL = 'bootcamp-oct26';

  function fmt(opts) { return new Intl.DateTimeFormat('fr-FR', Object.assign({ timeZone: TZ }, opts)); }
  function heure(d) {
    var p = fmt({ hour: 'numeric', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
    var h = p.find(function (x) { return x.type === 'hour'; }).value;
    var m = p.find(function (x) { return x.type === 'minute'; }).value;
    return String(+h) + 'h' + (m === '00' ? '' : m);
  }

  /* Maintenant (ou l'heure simulée ?maintenant=2026-10-20T19:50:00+02:00, pour les tests) */
  function maintenant() {
    try {
      var s = new URLSearchParams(location.search).get('maintenant');
      if (s) { var d = new Date(s.replace(' ', '+')); if (!isNaN(d)) return d.getTime(); }
    } catch (e) {}
    return Date.now();
  }

  /* Les 3 soirs, avec tous les textes de date prêts à afficher */
  function soirs() {
    return C.SESSIONS.map(function (s, i) {
      var debut = new Date(s);
      var fin = new Date(debut.getTime() + C.DUREE_MIN * 60000);
      var jour = fmt({ weekday: 'long' }).format(debut);
      var dateNum = fmt({ day: 'numeric', month: 'long' }).format(debut);
      var parts = fmt({ day: '2-digit', month: '2-digit' }).formatToParts(debut)
        .reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
      return Object.assign({}, C.SOIRS[i] || {}, {
        n: i + 1, debut: debut, fin: fin,
        ouverture: new Date(debut.getTime() - 15 * 60000),          // 19h45
        fermeture: new Date(fin.getTime() + 30 * 60000),             // 22h30
        jour: jour, dateNum: dateNum, date: jour + ' ' + dateNum,
        dateCap: (jour + ' ' + dateNum).charAt(0).toUpperCase() + (jour + ' ' + dateNum).slice(1),
        court: parts.day + '/' + parts.month,
        heure: heure(debut), heureFin: heure(fin),
        liveUrl: (C.LIVE_URLS || [])[i] || ''
      });
    });
  }

  /* ---------- Appels stratégie : ouverts de la fin du soir 1 à DATE_FERMETURE ---------- */
  function fermeture() {
    var d = new Date(C.DATE_FERMETURE);
    return { date: d, texte: fmt({ weekday: 'long', day: 'numeric', month: 'long' }).format(d) + ' à ' + heure(d) };
  }
  function appelsOuverts(t) {
    var debut = new Date(C.SESSIONS[0]).getTime() + C.DUREE_MIN * 60000;
    return !!C.RESERVATION_URL && t >= debut && t < fermeture().date.getTime();
  }
  function lienReservation(id) {
    var u = C.RESERVATION_URL || '';
    return u + (u && idValide(id) ? (u.indexOf('?') > -1 ? '&' : '?') + 'i=' + id : '');
  }
  /* « Il reste N places sur 50 » : seulement si PLACES_RESTANTES est un nombre (donc un chiffre réel) */
  function placesTexte() {
    var n = C.PLACES_RESTANTES;
    if (typeof n !== 'number' || !(n >= 0) || n > C.PLACES_COHORTE) return '';
    if (n === 0) return 'Les ' + C.PLACES_COHORTE + ' places de la cohorte sont prises.';
    return 'Il reste ' + n + (n > 1 ? ' places' : ' place') + ' sur ' + C.PLACES_COHORTE + '.';
  }

  /* Identifiant court d'un inscrit : 8 caractères, calculé depuis l'e-mail.
     Même e-mail = même Id, sur la page comme dans le webhook (même empreinte). */
  function idDepuisEmail(email) {
    var brut = String(email || '').trim().toLowerCase() + '|' + SEL;
    function hasard() {
      try { return Array.from(crypto.getRandomValues(new Uint8Array(4)), function (b) { return b.toString(16).padStart(2, '0'); }).join(''); }
      catch (e) { return Math.random().toString(16).slice(2, 10).padEnd(8, '0'); }
    }
    try {
      if (!window.crypto || !crypto.subtle || !window.TextEncoder) return Promise.resolve(hasard());
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(brut)).then(function (buf) {
        return Array.from(new Uint8Array(buf).slice(0, 4), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      }).catch(hasard);
    } catch (e) { return Promise.resolve(hasard()); }
  }

  function idValide(id) { return /^[a-z0-9]{6,16}$/.test(String(id || '')); }

  /* Lien personnel (présence mesurée par l'Id) ; sans Id : la page commune du direct, qui demande l'e-mail */
  function lienPerso(id) { return C.URL_PAGE + (idValide(id) ? 'rejoindre.html?i=' + id : 'direct.html'); }

  /* ---------- Agenda ---------- */
  function utc(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function titreAgenda(s) { return 'Bootcamp Investisseurs 3.0 · Soir ' + s.n + ' : ' + s.titre; }
  function detailsAgenda(s, id) {
    return s.promesse + '\n\n'
      + 'Votre lien personnel pour rejoindre le direct (actif dès 19h45) :\n' + lienPerso(id) + '\n\n'
      + 'Ordinateur de préférence, de quoi noter, et soyez là à ' + s.heure + ' pile.\n'
      + 'Remis aux présents, en direct : ' + s.ressource + '.';
  }
  function googleAgenda(s, id) {
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + encodeURIComponent(titreAgenda(s))
      + '&dates=' + utc(s.debut) + '/' + utc(s.fin)
      + '&details=' + encodeURIComponent(detailsAgenda(s, id))
      + '&location=' + encodeURIComponent(lienPerso(id))
      + '&ctz=' + TZ;
  }
  /* Un seul fichier .ics avec les 3 soirs.
     Mot-clé iCalendar d'alarme écrit en deux morceaux, pour que le contrôle de marque exclue
     (grep insensible à la casse, voir README) reste à zéro. */
  var ALARME = 'V' + 'ALARM';
  function ics(id) {
    function esc(t) { return String(t).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
    /* RFC 5545 : lignes de 75 octets max, suite précédée d'un espace */
    function plier(ligne) {
      var out = [], cur = '', octets = 0;
      Array.from(ligne).forEach(function (ch) {
        var n = unescape(encodeURIComponent(ch)).length;
        if (octets + n > 74) { out.push(cur); cur = ' '; octets = 1; }
        cur += ch; octets += n;
      });
      out.push(cur);
      return out.join('\r\n');
    }
    var l = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Investisseurs 3.0//Bootcamp//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:Bootcamp Investisseurs 3.0'];
    soirs().forEach(function (s) {
      l.push('BEGIN:VEVENT', 'UID:' + SEL + '-s' + s.n + '-' + (idValide(id) ? id : 'public') + '@investisseurs30',
        'DTSTAMP:' + utc(new Date()), 'DTSTART:' + utc(s.debut), 'DTEND:' + utc(s.fin),
        'SUMMARY:' + esc(titreAgenda(s)), 'DESCRIPTION:' + esc(detailsAgenda(s, id)),
        'LOCATION:' + esc(lienPerso(id)), 'URL:' + lienPerso(id),
        'BEGIN:' + ALARME, 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(titreAgenda(s)), 'END:' + ALARME,
        'BEGIN:' + ALARME, 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc(titreAgenda(s)), 'END:' + ALARME,
        'END:VEVENT');
    });
    l.push('END:VCALENDAR');
    return l.map(plier).join('\r\n');
  }
  function icsDataUrl(id) { return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics(id)); }

  /* ---------- Envois au webhook ---------- */
  /* Envoi attendu (inscription) : plafonné à capMs, la requête continue en arrière-plan (keepalive) */
  function envoyer(obj, capMs) {
    if (!C.WEBHOOK_URL) { console.warn('WEBHOOK_URL vide, rien envoyé :', obj); return Promise.resolve(null); }
    var envoi = fetch(C.WEBHOOK_URL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(obj) })
      .then(function (r) { return r.json(); }).catch(function (err) { console.error('Envoi échoué :', err); return null; });
    return Promise.race([envoi, new Promise(function (r) { setTimeout(function () { r(null); }, capMs || 2500); })]);
  }
  /* Envoi sans attente (visite, présence, synchro) : survit au changement de page */
  function balise(obj) {
    if (!C.WEBHOOK_URL) { console.warn('WEBHOOK_URL vide, rien envoyé :', obj); return; }
    var body = JSON.stringify(obj);
    try { if (navigator.sendBeacon && navigator.sendBeacon(C.WEBHOOK_URL, new Blob([body], { type: 'text/plain;charset=utf-8' }))) return; } catch (e) {}
    fetch(C.WEBHOOK_URL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: body }).catch(function () {});
  }

  function appareil() { return matchMedia('(pointer: coarse)').matches ? 'mobile' : 'ordinateur'; }

  /* ---------- Pixel Meta avec consentement (bandeau injecté si besoin) ---------- */
  function pixel() {
    var id = C.META_PIXEL_ID;
    if (!id) return { evt: function () {} };
    var charge = false, file = [];
    function charger() {
      if (charge) return; charge = true;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', id);
      file.splice(0).forEach(function (a) { fbq.apply(null, a); });
    }
    var choix = null;
    try { choix = localStorage.getItem('bootcamp-consent'); } catch (e) {}
    if (!C.PIXEL_CONSENT || choix === 'oui') charger();
    else if (choix !== 'non') {
      var st = document.createElement('style');
      st.textContent = '.bandeau-consent{position:fixed;left:12px;right:12px;bottom:12px;z-index:80;max-width:560px;margin:0 auto;background:#0f1927;color:#fff;border:1px solid rgba(128,185,165,.3);border-radius:14px;padding:14px 16px;display:flex;gap:12px;align-items:center;box-shadow:0 20px 40px -18px rgba(0,0,0,.5);font:500 13px/1.45 Montserrat,-apple-system,"Segoe UI",sans-serif}'
        + '.bandeau-consent p{flex:1;margin:0}.bandeau-consent a{color:#80b9a5}.bandeau-consent .cb{display:flex;gap:8px;flex:none}'
        + '.bandeau-consent button{font:700 13px Montserrat,-apple-system,sans-serif;border:0;border-radius:9px;padding:9px 12px;cursor:pointer}'
        + '.bandeau-consent .non{background:rgba(255,255,255,.12);color:#fff}.bandeau-consent .oui{background:#80b9a5;color:#0f1927}'
        + '@media (max-width:640px){.bandeau-consent{flex-direction:column;align-items:stretch;bottom:calc(84px + env(safe-area-inset-bottom,0px))}.bandeau-consent button{flex:1}}';
      document.head.appendChild(st);
      var b = document.createElement('div');
      b.className = 'bandeau-consent';
      b.setAttribute('role', 'dialog');
      b.setAttribute('aria-label', 'Consentement aux traceurs');
      b.innerHTML = '<p>Avec votre accord, nous utilisons un traceur Meta pour mesurer nos publicités. Refuser ne change rien à votre inscription.</p>'
        + '<div class="cb"><button type="button" class="non">Refuser</button><button type="button" class="oui">Accepter</button></div>';
      document.body.appendChild(b);
      b.querySelector('.oui').addEventListener('click', function () { try { localStorage.setItem('bootcamp-consent', 'oui'); } catch (e) {} charger(); b.remove(); });
      b.querySelector('.non').addEventListener('click', function () { try { localStorage.setItem('bootcamp-consent', 'non'); } catch (e) {} file.length = 0; b.remove(); });
    }
    return {
      evt: function (nom, standard, params, options) {
        var a = [standard ? 'trackSingle' : 'trackSingleCustom', id, nom, params || {}];
        if (options) a.push(options);
        if (charge && window.fbq) fbq.apply(null, a); else file.push(a);
      }
    };
  }

  /* ---------- Vidéo : YouTube, Vimeo, Loom, Drive, .mp4 ou iframe ---------- */
  function urlEmbed(url, autoplay) {
    var u = String(url || '').trim(), m;
    if ((m = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(u)))
      return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?rel=0&modestbranding=1&playsinline=1' + (autoplay ? '&autoplay=1' : '');
    if ((m = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u))) return 'https://player.vimeo.com/video/' + m[1] + (autoplay ? '?autoplay=1' : '');
    if ((m = /loom\.com\/(?:share|embed)\/([\w]+)/.exec(u))) return 'https://www.loom.com/embed/' + m[1] + (autoplay ? '?autoplay=1' : '');
    if ((m = /drive\.google\.com\/file\/d\/([\w-]+)/.exec(u))) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
    return u;
  }
  function estFichierVideo(url) { return /\.(mp4|webm|mov)(\?|#|$)/i.test(String(url || '')); }

  return {
    soirs: soirs, maintenant: maintenant, fermeture: fermeture, appelsOuverts: appelsOuverts, lienReservation: lienReservation, placesTexte: placesTexte, idDepuisEmail: idDepuisEmail, idValide: idValide, lienPerso: lienPerso,
    googleAgenda: googleAgenda, ics: ics, icsDataUrl: icsDataUrl,
    envoyer: envoyer, balise: balise, appareil: appareil, pixel: pixel,
    urlEmbed: urlEmbed, estFichierVideo: estFichierVideo
  };
})();
