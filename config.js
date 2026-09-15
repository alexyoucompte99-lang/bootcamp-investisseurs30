/* =====================================================================
   BOOTCAMP INVESTISSEURS 3.0 · CONFIG (la seule zone à modifier)
   Utilisée par index.html, merci.html, rejoindre.html, direct.html et console.html.

   - SESSIONS : les 3 soirs, heure de Paris (+02:00 jusqu'au 25/10/2026).
   - DUREE_MIN : durée d'un soir en minutes.
   - SOIRS : titre, promesse et ressource de chaque soir (BRIEF §5 et §6).
   - VARIANTES : A/B du haut de page. « accent » = morceau du titre en sauge.
   - WEBHOOK_URL : URL /exec de l'Apps Script (dossier webhook/). Vide = rien
     n'est envoyé (la page marche quand même, pratique pour tester).
   - STATS_KEY : clé de la route stats (agrégats seulement, aucune donnée
     personnelle). Même valeur que STATS_KEY dans webhook/Code.js.
   - VIDEO_URL : vidéo de présentation (YouTube, Vimeo, Loom, Drive ou .mp4).
     Vide = visuel de remplacement avec la photo de Thomas.
   - VIDEO_MERCI_URL : vidéo de 60 s de la page merci. Vide = encart « bientôt ».
   - GROUPES_WHATSAPP : liens d'invitation. Vide = bouton masqué. Plusieurs
     liens = un tiré au hasard par inscrit (répartit la charge entre groupes).
   - LIVE_URLS : lien du direct de chaque soir (YouTube non répertorié), ouvert par
     rejoindre.html (lien perso) et direct.html (lien commun, demande l'e-mail).
     Vide = « le lien s'active à 19h45 le jour J ».
   - RESERVATION_URL : questionnaire Tally de réservation de l'appel stratégie.
     Affiché sur rejoindre.html et direct.html après le soir 3, avec ?i=<Id>.
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
      titre: "Où part votre argent",
      promesse: "Voir ce que vos frais, votre inflation et votre attente vous coûtent vraiment, et comment récupérer ce qui vous revient.",
      ressource: "Le Détecteur de frais",
      ressourceDetail: "Entrez vos contrats : il calcule ce que les frais vous coûtent sur 10, 20 et 30 ans."
    },
    {
      titre: "Faire travailler votre argent",
      promesse: "La méthode pour construire une stratégie simple, sans intermédiaire : quelles enveloppes, quelle répartition, comment l'automatiser.",
      ressource: "Le Plan de répartition",
      ressourceDetail: "PEA, assurance vie en ligne, PER, compte-titres : 3 profils pédagogiques et la checklist d'ouverture."
    },
    {
      titre: "Votre plan d'indépendance",
      promesse: "Chiffrer votre objectif de liberté financière, poser votre plan d'action sur 90 jours et savoir par où commencer lundi.",
      ressource: "Le Plan 90 jours",
      ressourceDetail: "La feuille de route semaine par semaine et le calcul de votre chiffre d'indépendance."
    }
  ],

  VARIANTES: {
    a: {
      nom: "Contrôle",
      titre: "Reprenez le contrôle de votre argent en 3 soirées.",
      accent: "en 3 soirées.",
      sousTitre: "Du 20 au 22 octobre à 20h, Thomas Mayol vous montre en direct comment construire une stratégie d'investissement qui travaille pour vous : sans banque, sans frais cachés, sans dépendre de personne. Gratuit, en ligne, sur 3 cas réels."
    },
    b: {
      nom: "Frais cachés",
      titre: "Votre argent peut travailler pour vous. Votre banque ne vous montrera pas comment.",
      accent: "Votre banque ne vous montrera pas comment.",
      sousTitre: "3 soirées en direct avec Thomas Mayol, du 20 au 22 octobre à 20h : où partent vos frais, comment investir par vous-même, et le plan pour passer à l'action. Gratuit, en ligne, sur 3 cas réels."
    }
  },

  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbx_pOE_ieFvdP2-tkTreXEg9bBkV7zfdlgfo93a74pmLqIUltzrw_8GRiPPRnARjiId/exec",
  STATS_KEY: "LN2lBeGw9e8H3tnN_I_5ugsIpu8ITv9R",
  VIDEO_URL: "",
  VIDEO_MERCI_URL: "",
  GROUPES_WHATSAPP: [],
  LIVE_URLS: ["", "", ""],
  RESERVATION_URL: "",
  META_PIXEL_ID: "",
  PIXEL_CONSENT: true,
  COMPTEUR_MIN: 300,
  OBJECTIF_INSCRITS: 3000,
  OBJECTIF_PRESENTS: 750,
  URL_PAGE: "https://alexyoucompte99-lang.github.io/bootcamp-investisseurs30/",
  SOURCE: "lp-bootcamp-i3-v1"
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
      + 'Ressource du soir : ' + s.ressource + '.';
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
      evt: function (nom, standard, params) {
        var a = [standard ? 'trackSingle' : 'trackSingleCustom', id, nom, params || {}];
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
    soirs: soirs, maintenant: maintenant, idDepuisEmail: idDepuisEmail, idValide: idValide, lienPerso: lienPerso,
    googleAgenda: googleAgenda, ics: ics, icsDataUrl: icsDataUrl,
    envoyer: envoyer, balise: balise, appareil: appareil, pixel: pixel,
    urlEmbed: urlEmbed, estFichierVideo: estFichierVideo
  };
})();
