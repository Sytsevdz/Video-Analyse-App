import React from "react";
import ReactDOM from "react-dom/client";
import { supabase } from "./supabaseClient";
import "./styles.css";

const MATCHES_TABLE = "matches";
const TEAM_OPTIONS = ["Dames", "Dames -21", "Heren", "Heren -21"];

// Helper om seconden om te zetten naar mm:ss
export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const INSTRUCTIONS_VERSION = "3";

const RELEASE_NOTES = [
  "Spatiebalk pauzeert video en links/rechts spoelen 5 seconden",
  "Overschrijven van bestaande wedstrijden met controle",
  "Categorie Dames O21 toegevoegd",
  "Categorie Heren O21 toegevoegd",
  "Banner toont nu dames of heren afhankelijk van de gekozen database",
  "Laden van opgeslagen wedstrijd laadt nu ook de juiste video",
  "Verberg en toon knoppen toegevoegd",
  "Fixed frame met scroll optie voor gemarkeerde momenten toegevoegd",
  "Selecteren van dames/heren categorie",
  "Banner toegevoegd",
  "Mogelijkheid om een verzoek tot verwijderen van wedstrijden in te dienen (werkt nog niet, dus app Sytse direct voor zo'n verzoek).",
  "Indeling aangepast",
  "Sneltoetsen achter knop gestopt",
  "Link & laad video knop verplaatst",
  "Tijdlijn verbeterd en schot-iconen onderscheiden",
  "Snelheid aanpassen met pijltje omhoog/omlaag"
];

const ReleaseModal = ({ onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
      overflowY: "auto",
      padding: 20,
    }}
  >
    <div
      className="modal-card"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 600,
        margin: "40px auto",
        lineHeight: 1.6,
      }}
    >
      <h2>📝 Releases</h2>
      <ul>
        {RELEASE_NOTES.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <button
        onClick={onClose}
        style={{ marginTop: 20, padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
      >
        Sluiten
      </button>
    </div>
  </div>
);

const ShortcutsModal = ({ onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
      overflowY: "auto",
      padding: 20,
    }}
  >
    <div
      className="modal-card"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 620,
        margin: "40px auto",
        lineHeight: 1.6,
      }}
    >
      <h2>⌨️ Sneltoetsen</h2>
      <ul className="shortcut-list">
        <li className="shortcut-item"><span className="keycap">1</span> Doelpunt NL</li>
        <li className="shortcut-item"><span className="keycap">2</span> Tegendoelpunt</li>
        <li className="shortcut-item"><span className="keycap">3</span> Schot NL</li>
        <li className="shortcut-item"><span className="keycap">4</span> Schot tegen</li>
        <li className="shortcut-item"><span className="keycap">5</span> Balwinst</li>
        <li className="shortcut-item"><span className="keycap">6</span> Balverlies</li>
        <li className="shortcut-item"><span className="keycap">A</span> Start aanval NL</li>
        <li className="shortcut-item"><span className="keycap">S</span> Start tegenaanval</li>
        <li className="shortcut-item"><span className="keycap">D</span> Verdedigingsmoment NL</li>
        <li className="shortcut-item"><span className="keycap">F</span> Verdedigingsmoment tegen</li>
        <li className="shortcut-item"><span className="keycap">W</span> Markeer moment</li>
        <li className="shortcut-item"><span className="keycap">E</span> Markeer + pauze</li>
        <li className="shortcut-item"><span className="keycap">Spatie</span> Start/pauzeer video</li>
        <li className="shortcut-item"><span className="keycap">←</span> 5 seconden terug</li>
        <li className="shortcut-item"><span className="keycap">→</span> 5 seconden vooruit</li>
        <li className="shortcut-item"><span className="keycap">↑</span> Video sneller</li>
        <li className="shortcut-item"><span className="keycap">↓</span> Video langzamer</li>
      </ul>
      <button
        onClick={onClose}
        style={{ marginTop: 20, padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
      >
        Sluiten
      </button>
    </div>
  </div>
);

const InstructionsModal = ({ onClose, label }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
      overflowY: "auto",
      padding: 20,
    }}
  >
    <div
      className="modal-card"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 600,
        margin: "40px auto",
        lineHeight: 1.6,
      }}
    >
      <h2>📺 Handleiding – Video Analyse NL {label}</h2>
      <p>
        Met deze web-app kun je live of achteraf analytische “momenten” in een
        YouTube-video markeren en de analyse als <strong>wedstrijd</strong> opslaan. Hieronder vind je een korte stap-voor-stap uitleg.
      </p>
      <hr />
      <h3>1. Video laden</h3>
      <ol>
        <li>
          Plak de <strong>YouTube-link</strong> in het veld “YouTube link
          plakken…” in de zijbalk rechts.
        </li>
        <li>
          Klik op <strong>🎬 Laad video en start analyse</strong>. De speler
          verschijnt en de video staat klaar om af te spelen (spatiebalk =
          play/pause).
        </li>
      </ol>
      <hr />
      <h3>2. Momenten markeren</h3>
      <p>
        Momenten markeren kan met de knoppen in de zijbalk of via de
        sneltoetsen, klik op de "Sneltoetsen" knop om weer te geven.
      </p>
      <p>
        Elke keer dat je een knop indrukt, verschijnt het bijbehorende label in
        de sectie <strong>Gemarkeerde momenten</strong> onderaan. Het moment
        wordt altijd 5 seconden terug in de tijd opgeslagen.
      </p>
      <hr />
      <h3>3. Wedstrijd opslaan</h3>
      <ol>
        <li>
          Selecteer rechtsonder <strong>Heren</strong>, <strong>Dames</strong>, <strong>Dames O21</strong> of <strong>Heren O21</strong> en vul in het veld “Wedstrijdnaam…” een herkenbare en unieke titel in.
        </li>
        <li>
          Klik <strong>Opslaan</strong> om de huidige video + gemarkeerde
          momenten vast te leggen.
        </li>
        <li>
          Gebruik <strong>Bekijk opgeslagen</strong> om eerder opgeslagen
          wedstrijden per categorie &ndash; Heren, Dames, Dames O21 of Heren O21 &ndash; te openen.
        </li>
      </ol>
      <h3>4. Tips</h3>
      <ul>
        <li>
          Je kunt tijdens het afspelen labels toevoegen zonder te pauzeren;
          gebruik <code>E</code> als je eerst wilt pauzeren.
        </li>
        <li>
          Labels zijn kleur-gecodeerd: <strong>groen</strong> = voor NL, <strong>rood</strong> = voor de tegenstander.
        </li>
        <li>
          Fout gemaakt? Verwijder een entry in de lijst <em>Gemarkeerde momenten</em> voordat je opslaat.
        </li>
        <li>
          Check ook de releases voor updates.
        </li>
      </ul>
      <p>Veel analyse-plezier!</p>
      <button
        onClick={onClose}
        style={{ marginTop: 20, padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
      >
        Aan de slag
      </button>
    </div>
  </div>
);

const DeleteRequestModal = ({ match, reason, onReasonChange, onSubmit, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
      overflowY: "auto",
      padding: 20,
    }}
  >
    <div
      className="modal-card"
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 500,
        margin: "40px auto",
      }}
    >
      <h2>Verzoek tot verwijderen</h2>
      <p>Waarom wil je "{match}" verwijderen?</p>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={onSubmit} style={{ marginRight: 10 }}>Verzoek verwijdering</button>
        <button onClick={onClose}>Annuleren</button>
      </div>
    </div>
  </div>
);

// Toont markers met icoontjes op een tijdlijn van de video
const Timeline = ({ moments, duration, onSeek }) => {
  if (!duration || moments.length === 0) return null;

  const min = Math.max(0, Math.min(...moments.map((m) => m.time)) - 60);
  const max = Math.min(duration, Math.max(...moments.map((m) => m.time)) + 60);
  const range = max - min || 1;

  // Icons komen overeen met de knoppen voor het markeren van momenten
  const ICON_MAP = {
    "Doelpunt NL": "⚽",
    "Tegendoelpunt": "🥅",
    "Schot NL": "🎯",
    "Schot tegen": "💥",
    "Balwinst": "✅",
    "Balverlies": "❌",
    "Start aanval NL": "➡️",
    "Start tegenaanval": "⬅️",
    "Verdedigingsmoment NL": "🛡️",
    "Verdedigingsmoment tegen": "🛡️",
  };

  return (
    <div style={{ position: "relative", height: 40, marginBottom: 10 }}>
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#ccc" }} />
      {moments.map((m, i) => (
        <div
          key={i}
          onClick={() => onSeek(m.time)}
          title={`${m.label ? m.label + " " : ""}${formatTime(m.time)}`}
          style={{
            position: "absolute",
            left: `${((m.time - min) / range) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          {ICON_MAP[m.label] || "📍"}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{formatTime(min)}</span>
        <span>{formatTime(max)}</span>
      </div>
    </div>
  );
};

const App = () => {
  const [videoId, setVideoId] = React.useState("");
  const [player, setPlayer] = React.useState(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [moments, setMoments] = React.useState([]);
  const [matchName, setMatchName] = React.useState("");
  const [savedMatches, setSavedMatches] = React.useState([]);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [showReleases, setShowReleases] = React.useState(false);
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState("Dames");
  const [deleteMatchName, setDeleteMatchName] = React.useState(null);
  const [deleteMatchTeam, setDeleteMatchTeam] = React.useState(null);
  const [deleteReason, setDeleteReason] = React.useState("");
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [analysisMode, setAnalysisMode] = React.useState(false);
  const playbackTimeout = React.useRef(null);

  const labels = [
    "Doelpunt NL",
    "Tegendoelpunt",
    "Schot NL",
    "Schot tegen",
    "Balwinst",
    "Balverlies",
    "Start aanval NL",
    "Start tegenaanval",
    "Verdedigingsmoment NL",
    "Verdedigingsmoment tegen"
  ];

  const allLabels = [...labels, "Moment zonder label"];
  const [visibleLabels, setVisibleLabels] = React.useState(
    () => Object.fromEntries(allLabels.map((l) => [l, true]))
  );
  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!player) return;
      const active = document.activeElement;
      if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;

      const key = e.key.toLowerCase();
      const map = {
        '1': 'Doelpunt NL',
        '2': 'Tegendoelpunt',
        '6': 'Balverlies',
        '5': 'Balwinst',
        '3': 'Schot NL',
        '4': 'Schot tegen',
        'a': 'Start aanval NL',
        's': 'Start tegenaanval',
        'd': 'Verdedigingsmoment NL',
        'f': 'Verdedigingsmoment tegen',
      };

      if (key === 'w') {
        markMoment("");
      } else if (key === 'e') {
        markMoment("", true);
      } else if (e.key === 'ArrowLeft') {
        clearPlayback();
        const t = Math.max(0, player.getCurrentTime() - 5);
        player.seekTo(t, true);
      } else if (e.key === 'ArrowRight') {
        clearPlayback();
        const t = Math.min(player.getDuration(), player.getCurrentTime() + 5);
        player.seekTo(t, true);
      } else if (e.key === 'ArrowUp') {
        clearPlayback();
        const rates = player.getAvailablePlaybackRates();
        const current = player.getPlaybackRate();
        const idx = rates.indexOf(current);
        if (idx !== -1 && idx < rates.length - 1) {
          const newRate = rates[idx + 1];
          player.setPlaybackRate(newRate);
          setPlaybackRate(newRate);
        }
      } else if (e.key === 'ArrowDown') {
        clearPlayback();
        const rates = player.getAvailablePlaybackRates();
        const current = player.getPlaybackRate();
        const idx = rates.indexOf(current);
        if (idx > 0) {
          const newRate = rates[idx - 1];
          player.setPlaybackRate(newRate);
          setPlaybackRate(newRate);
        }
      } else if (key === ' ') {
        clearPlayback();
        const state = player.getPlayerState();
        if (state === 1) {
          player.pauseVideo();
        } else if (state === 2) {
          player.playVideo();
        }
      } else if (map[key]) {
        markMoment(map[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player]);

  // Bij nieuw geladen video de duur ophalen (ook bij geladen wedstrijden)
  React.useEffect(() => {
    if (!player || !videoId) return;
    setDuration(0);
    let attempts = 0;
    const check = () => {
      const d = player.getDuration();
      if (d) {
        setDuration(d);
      } else if (attempts < 10) {
        attempts += 1;
        setTimeout(check, 500);
      }
    };
    check();
  }, [player, videoId]);

  React.useEffect(() => {
    const seen = localStorage.getItem("instructionsVersion");
    if (seen !== INSTRUCTIONS_VERSION) {
      setShowInstructions(true);
    }
  }, []);

  React.useEffect(() => {
    setSavedMatches([]);
  }, [selectedTeam]);

  const isSupabaseReady = () => {
    if (supabase) return true;

    const message = "Supabase is niet geconfigureerd. Vul VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY in .env in en start de app opnieuw.";
    console.error(message);
    alert(message);
    return false;
  };

  const closeInstructions = () => {
    localStorage.setItem("instructionsVersion", INSTRUCTIONS_VERSION);
    setShowInstructions(false);
  };


const handlePlayerReady = (event) => {
  setPlayer(event.target);
  setVideoLoaded(true);
  setDuration(event.target.getDuration());
  setPlaybackRate(event.target.getPlaybackRate());
};

  const handleVideoLoad = (url = videoId) => {
    const id = getYouTubeVideoId(url);
    if (!id) return;
    setDuration(0);
    if (player) {
      player.loadVideoById(id);
      setVideoLoaded(true);
      player.setPlaybackRate(1);
      setPlaybackRate(1);
      setTimeout(() => setDuration(player.getDuration()), 1000);
    } else {
      document.getElementById("player-container").innerHTML = "";
      new YT.Player("player-container", {
        width: "100%",
        height: "100%",
        videoId: id,
        playerVars: { modestbranding: 1, rel: 0 },
        events: { onReady: handlePlayerReady },
      });
    }
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const trimmedUrl = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmedUrl)) return trimmedUrl;

    const match =
      trimmedUrl.match(/[?&]v=([^&]+)/) ||
      trimmedUrl.match(/youtu\.be\/([^?]+)/) ||
      trimmedUrl.match(/youtube\.com\/live\/([^?]+)/) ||
      trimmedUrl.match(/youtube\.com\/embed\/([^?]+)/);
    return match ? match[1] : null;
  };


  const markMoment = (label = "", pause = false) => {
    if (!player) return;
    const currentTime = Math.max(0, player.getCurrentTime() - 5);
    if (pause) player.pauseVideo();
    const newMoment = { time: currentTime, label, note: "" };
    setMoments((prev) => [...prev, newMoment]);
  };

  const jumpTo = (time) => player && player.seekTo(time, true);

  const updateLabel = (index, newLabel) => {
    const updated = [...moments];
    updated[index].label = newLabel;
    setMoments(updated);
  };

  const updateNote = (index, note) => {
    const updated = [...moments];
    updated[index].note = note;
    setMoments(updated);
  };

  const adjustTime = (index, offset) => {
    const updated = [...moments];
    updated[index].time = Math.max(0, updated[index].time + offset);
    setMoments(updated);
  };

  const deleteMoment = (index) => setMoments(moments.filter((_, i) => i !== index));

  const saveMatch = async () => {
    if (!matchName) {
      alert('Vul eerst een wedstrijdnaam in.');
      return;
    }

    if (!videoId) {
      alert('Laad eerst een YouTube-video voordat je opslaat.');
      return;
    }

    if (!isSupabaseReady()) return;

    // Check of de wedstrijd al bestaat binnen de geselecteerde categorie
    const { data: existingMatches, error: existingError } = await supabase
      .from(MATCHES_TABLE)
      .select('id, moments')
      .eq('name', matchName)
      .eq('team', selectedTeam)
      .order('created_at', { ascending: false })
      .limit(1);

    if (existingError) {
      console.error('Fout bij controleren bestaande wedstrijd:', existingError.message);
      return;
    }

    const existing = existingMatches?.[0];

    if (existing) {
      // Alleen overschrijven als er meer momenten zijn dan in de opgeslagen versie
      const hasMoreInfo = moments.length > (existing.moments ? existing.moments.length : 0);
      if (!hasMoreInfo) {
        alert('Er staat al een versie met evenveel of meer informatie in de database.');
        return;
      }
      const confirmOverwrite = window.confirm('De wedstrijd bestaat al in de database. Overschrijven?');
      if (!confirmOverwrite) return;

      const { error } = await supabase
        .from(MATCHES_TABLE)
        .update({ name: matchName, moments, video_id: videoId, team: selectedTeam })
        .eq('id', existing.id);

      if (error) {
        console.error('Fout bij opslaan:', error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from(MATCHES_TABLE)
        .insert({ name: matchName, moments, video_id: videoId, team: selectedTeam });

      if (error) {
        console.error('Fout bij opslaan:', error.message);
        return;
      }
    }

    if (!savedMatches.includes(matchName)) {
      setSavedMatches([...savedMatches, matchName]);
    }
  };

  const handleLoadMatch = async (name) => {
    if (!isSupabaseReady()) return;

    const { data: matches, error } = await supabase
      .from(MATCHES_TABLE)
      .select()
      .eq("name", name)
      .eq("team", selectedTeam)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Fout bij ophalen:", error.message);
      return;
    }

    const data = matches?.[0];

    if (!data) {
      console.error("Geen wedstrijd gevonden voor deze categorie.");
      return;
    }

    setMoments(data.moments || []);
    setMatchName(data.name);
    setVideoId(data.video_id || "");
    handleVideoLoad(data.video_id);
  };

  const deleteMatch = async (name) => {
    setDeleteMatchName(name);
    setDeleteMatchTeam(selectedTeam);
    setDeleteReason("");
  };

  const submitDeleteRequest = async () => {
    if (!deleteMatchName || !deleteMatchTeam || !isSupabaseReady()) return;

    const { error } = await supabase
      .from(MATCHES_TABLE)
      .delete()
      .eq("name", deleteMatchName)
      .eq("team", deleteMatchTeam);

    if (error) {
      console.error('Fout bij verwijderen:', error.message);
      return;
    }

    setSavedMatches((prev) => prev.filter((name) => name !== deleteMatchName));
    if (matchName === deleteMatchName && selectedTeam === deleteMatchTeam) {
      setMatchName("");
      setMoments([]);
      setVideoId("");
    }
    setDeleteMatchName(null);
    setDeleteMatchTeam(null);
    setDeleteReason("");
  };

  const loadMatches = () => {
    if (!isSupabaseReady()) return;

    supabase
      .from(MATCHES_TABLE)
      .select("name, created_at")
      .eq("team", selectedTeam)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Fout bij ophalen wedstrijden:", error.message);
          return;
        }

        const names = (data || []).map((m) => m.name);
        setSavedMatches(names);
      });
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(moments, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = matchName || "momenten.json";
    a.click();
  };

  const buttonStyle = (color = "#f3f3f3", large = false) => ({
    margin: "5px",
    padding: large ? "12px 18px" : "8px 12px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    background: color,
    cursor: "pointer",
    minWidth: large ? "180px" : undefined
  });

  const clearPlayback = () => {
    if (playbackTimeout.current) {
      clearTimeout(playbackTimeout.current);
      playbackTimeout.current = null;
    }
  };

  const playCategory = (label) => {
    if (!player) return;
    clearPlayback();
    const clips = moments
      .filter((m) => m.label === label)
      .sort((a, b) => a.time - b.time);
    if (clips.length === 0) return;
    let idx = 0;
    const playNext = () => {
      if (idx >= clips.length) {
        player.pauseVideo();
        return;
      }
      const start = clips[idx].time;
      const end = idx < clips.length - 1 ? Math.min(start + 15, clips[idx + 1].time) : start + 15;
      player.seekTo(start, true);
      player.playVideo();
      idx += 1;
      playbackTimeout.current = setTimeout(playNext, (end - start) * 1000);
    };
    playNext();
  };

  const renderFloatingButtons = () => (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
        <button
          onClick={() => markMoment("")}
          className="neutral-action"
          style={{ ...buttonStyle("#ddd", true), flex: 1, fontWeight: "bold" }}
        >
          ➕ Markeer moment
        </button>
        <button
          onClick={() => markMoment("", true)}
          className="neutral-action"
          style={{ ...buttonStyle("#ddd", true), flex: 1, fontWeight: "bold" }}
        >
          ⏸️ Markeer + pauze
        </button>
      </div>
      <div className="quick-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
        <div className="button-column" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button className="green-action" onClick={() => markMoment("Doelpunt NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>⚽ Doelpunt NL</button>
          <button className="green-action" onClick={() => markMoment("Schot NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>🎯 Schot NL</button>
          <button className="green-action" onClick={() => markMoment("Balwinst")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>✅ Balwinst</button>
          <button className="green-action" onClick={() => markMoment("Start aanval NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>➡️ Start aanval NL</button>
          <button className="green-action" onClick={() => markMoment("Verdedigingsmoment NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>🛡️ Verdedigingsmoment NL</button>
        </div>
        <div className="button-column" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button className="red-action" onClick={() => markMoment("Tegendoelpunt")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>🥅 Tegendoelpunt</button>
          <button className="red-action" onClick={() => markMoment("Schot tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>💥 Schot tegen</button>
          <button className="red-action" onClick={() => markMoment("Balverlies")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>❌ Balverlies</button>
          <button className="red-action" onClick={() => markMoment("Start tegenaanval")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>⬅️ Start tegenaanval</button>
          <button className="red-action" onClick={() => markMoment("Verdedigingsmoment tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>🛡️ Verdedigingsmoment tegen</button>
        </div>
      </div>
    </>
  );

  const renderAnalysisButtons = () => (
    <div className="mode-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
      <div className="button-column" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button className="green-action" onClick={() => playCategory("Doelpunt NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>Bekijk doelpunt NL</button>
        <button className="green-action" onClick={() => playCategory("Schot NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>Bekijk schot NL</button>
        <button className="green-action" onClick={() => playCategory("Balwinst")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>Bekijk balwinst</button>
        <button className="green-action" onClick={() => playCategory("Start aanval NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>Bekijk start aanval NL</button>
        <button className="green-action" onClick={() => playCategory("Verdedigingsmoment NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>Bekijk verdedigingsmoment NL</button>
      </div>
      <div className="button-column" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button className="red-action" onClick={() => playCategory("Tegendoelpunt")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>Bekijk tegendoelpunt</button>
        <button className="red-action" onClick={() => playCategory("Schot tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>Bekijk schot tegen</button>
        <button className="red-action" onClick={() => playCategory("Balverlies")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>Bekijk balverlies</button>
        <button className="red-action" onClick={() => playCategory("Start tegenaanval")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>Bekijk start tegenaanval</button>
        <button className="red-action" onClick={() => playCategory("Verdedigingsmoment tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>Bekijk verdedigingsmoment tegen</button>
      </div>
    </div>
  );

  const isVisible = (label) => visibleLabels[label || "Moment zonder label"];
  const filteredMoments = moments.filter((m) => isVisible(m.label));

  return (
    <div className="app-shell">
      {showInstructions && (
        <InstructionsModal onClose={closeInstructions} label={selectedTeam} />
      )}
      {showReleases && (
        <ReleaseModal onClose={() => setShowReleases(false)} />
      )}
      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}

      <div
        className="hero"
        style={{
          backgroundImage:
            "url('/canoe_polo_banner_8x1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          marginBottom: 22,
        }}
      >
        <h1
          className="hero-title"
          style={{
            background: "rgba(0,0,0,0.45)",
            padding: "12px 22px",
            borderRadius: "14px",
            margin: 0,
          }}
        >
          {`Video Analyse NL - ${selectedTeam}`}
        </h1>
      </div>

      <div className="app-grid">
        <div className="main-column stack">
          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Video</h2>
                <p className="card-subtitle">Analyseer de YouTube-video met duidelijke afspeelsnelheid.</p>
              </div>
            </div>
            <div className="video-frame" style={{ position: "relative", paddingTop: "56.25%" }}>
              {!videoLoaded && (
                <div
                  className="video-placeholder"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "24px",
                  }}
                >
                  Video
                </div>
              )}
              <div id="player-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
              <div
                className="playback-pill"
                style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {playbackRate}x
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Gemarkeerde momenten</h2>
                <p className="card-subtitle">Elke gebeurtenis staat als aparte rij met tijd, label en notitie.</p>
              </div>
              <button onClick={download} className="neutral-action" style={buttonStyle()}>📥 Download JSON</button>
            </div>
            <div className="timeline-wrap">
              <Timeline moments={filteredMoments} duration={duration} onSeek={jumpTo} />
            </div>
            <div className="moments-panel" style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "0 5px", borderRadius: "8px", position: "relative" }}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="filter-button neutral-action"
                style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
              >
                🔎 Filter
              </button>
              {showFilter && (
                <div
                  className="filter-popover"
                  style={{
                    position: "absolute",
                    top: 35,
                    right: 5,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 5,
                    zIndex: 2,
                  }}
                >
                  <button
                    onClick={() =>
                      setVisibleLabels(Object.fromEntries(allLabels.map((l) => [l, true])))
                    }
                    className="neutral-action"
                    style={{ display: "block", width: "100%", textAlign: "left" }}
                  >
                    Selecteer alles
                  </button>
                  <button
                    onClick={() =>
                      setVisibleLabels(Object.fromEntries(allLabels.map((l) => [l, false])))
                    }
                    className="neutral-action"
                    style={{ display: "block", width: "100%", textAlign: "left", marginTop: 6 }}
                  >
                    Selecteer niks
                  </button>
                  <hr />
                  {allLabels.map((l) => (
                    <label key={l} style={{ display: "block", marginBottom: 4 }}>
                      <input
                        type="checkbox"
                        checked={visibleLabels[l]}
                        onChange={() =>
                          setVisibleLabels((prev) => ({
                            ...prev,
                            [l]: !prev[l],
                          }))
                        }
                      />{' '}
                      {l}
                    </label>
                  ))}
                </div>
              )}
              <ul className="moment-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filteredMoments.length === 0 && (
                  <li style={{ textAlign: "center", color: "#777", padding: "30px 0" }}>
                    Momenten verschijnen hier.
                  </li>
                )}
                {filteredMoments.map((m, i) => (
                  <li key={i} className="moment-row" style={{ marginBottom: "4px" }}>
                    <button className="time-button" onClick={() => jumpTo(m.time)} style={{ marginRight: 5, ...buttonStyle() }}>{formatTime(m.time)}</button>
                    <select value={m.label} onChange={(e) => updateLabel(i, e.target.value)}>
                      <option value="">-- Kies label --</option>
                      {labels.map((l, j) => <option key={j} value={l}>{l}</option>)}
                    </select>
                    <input type="text" placeholder="Notitie..." value={m.note} onChange={(e) => updateNote(i, e.target.value)} />
                    <button className="icon-button neutral-action" onClick={() => adjustTime(i, -1)}>-1s</button>
                    <button className="icon-button neutral-action" onClick={() => adjustTime(i, 1)}>+1s</button>
                    <button className="icon-button danger-button" onClick={() => deleteMoment(i)}>🗑️</button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="side-column stack">
          <section className="card form-stack">
            <div className="card-header">
              <div>
                <h2 className="card-title">Wedstrijdbeheer</h2>
                <p className="card-subtitle">Laad een video, kies de categorie en sla je analyse op.</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="YouTube link plakken..."
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              style={{ width: "100%" }}
            />
            <button
              onClick={() => handleVideoLoad()}
              className="primary-action"
              style={{ ...buttonStyle("#007bff", true), width: "100%", fontWeight: "bold" }}
            >
              🎬 Laad video en start analyse
            </button>
            <div className="action-row" style={{ display: "flex", gap: "5px", margin: "10px 0" }}>
              <button onClick={() => setShowInstructions(true)} className="neutral-action" style={{ ...buttonStyle(), flex: 1 }}>
                ❔ Instructies
              </button>
              <button onClick={() => setShowReleases(true)} className="neutral-action" style={{ ...buttonStyle(), flex: 1 }}>
                📝 Releases
              </button>
              <button onClick={() => setShowShortcuts(true)} className="neutral-action" style={{ ...buttonStyle(), flex: 1 }}>
                ⌨️ Sneltoetsen
              </button>
              <button
                onClick={() => {
                  setAnalysisMode(!analysisMode);
                  clearPlayback();
                }}
                className="neutral-action"
                style={{ ...buttonStyle(), flex: 1 }}
              >
                {analysisMode ? "🖊️ Markeer weergave" : "🔎 Analyse weergave"}
              </button>
            </div>
            <div className="help-note" style={{ background: "#ffeeba", padding: "8px 10px", borderRadius: "10px", textAlign: "center" }}>
              Selecteer hieronder de categorie
            </div>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} style={{ width: "100%" }}>
              {TEAM_OPTIONS.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
            <input type="text" placeholder="Wedstrijdnaam..." value={matchName} onChange={(e) => setMatchName(e.target.value)} style={{ width: "100%" }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveMatch} disabled={!matchName} className="green-action" style={{ ...buttonStyle(), flex: 1 }}>💾 Opslaan</button>
              <button onClick={loadMatches} className="neutral-action" style={{ ...buttonStyle(), flex: 1 }}>📂 Bekijk opgeslagen</button>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Snel markeren</h2>
                <p className="card-subtitle">Groen blijft NL, rood blijft tegenstander.</p>
              </div>
            </div>
            {analysisMode ? renderAnalysisButtons() : renderFloatingButtons()}
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Sneltoetsen</h2>
                <p className="card-subtitle">Compact overzicht van de bestaande toetscombinaties.</p>
              </div>
            </div>
            <ul className="shortcut-list">
              <li className="shortcut-item"><span className="keycap">1</span> Doelpunt NL</li>
              <li className="shortcut-item"><span className="keycap">2</span> Tegendoelpunt</li>
              <li className="shortcut-item"><span className="keycap">3</span> Schot NL</li>
              <li className="shortcut-item"><span className="keycap">4</span> Schot tegen</li>
              <li className="shortcut-item"><span className="keycap">5</span> Balwinst</li>
              <li className="shortcut-item"><span className="keycap">6</span> Balverlies</li>
              <li className="shortcut-item"><span className="keycap">A</span> Start aanval NL</li>
              <li className="shortcut-item"><span className="keycap">S</span> Start tegenaanval</li>
              <li className="shortcut-item"><span className="keycap">W</span> Markeer moment</li>
              <li className="shortcut-item"><span className="keycap">E</span> Markeer + pauze</li>
            </ul>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Opgeslagen wedstrijden</h2>
                <p className="card-subtitle">Gebruik “Bekijk opgeslagen” om wedstrijden voor {selectedTeam} te tonen.</p>
              </div>
            </div>
            {savedMatches.length > 0 ? (
              <ul className="saved-list">
                {savedMatches.map((m, i) => (
                  <li key={i} className="saved-row">
                    <strong>{m}</strong>
                    <button onClick={() => handleLoadMatch(m)} className="neutral-action">Laden</button>
                    <button onClick={() => deleteMatch(m)} className="danger-button">🗑️</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card-subtitle" style={{ margin: 0 }}>Nog geen opgeslagen wedstrijden geladen.</p>
            )}
          </section>
        </aside>
      </div>
      {deleteMatchName && (
        <DeleteRequestModal
          match={deleteMatchName}
          reason={deleteReason}
          onReasonChange={setDeleteReason}
          onSubmit={submitDeleteRequest}
          onClose={() => {
            setDeleteMatchName(null);
            setDeleteMatchTeam(null);
          }}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
