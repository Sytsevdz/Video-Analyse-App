import React from "react";
import ReactDOM from "react-dom/client";
import { supabase } from "./supabaseClient";

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
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 400,
        margin: "40px auto",
        lineHeight: 1.6,
      }}
    >
      <h2>⌨️ Sneltoetsen</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li><strong>1</strong>: Doelpunt NL</li>
        <li><strong>2</strong>: Tegendoelpunt</li>
        <li><strong>3</strong>: Schot NL</li>
        <li><strong>4</strong>: Schot tegen</li>
        <li><strong>5</strong>: Balwinst</li>
        <li><strong>6</strong>: Balverlies</li>
        <li><strong>A</strong>: Start aanval NL</li>
        <li><strong>S</strong>: Start tegenaanval</li>
        <li><strong>D</strong>: Verdedigingsmoment NL</li>
        <li><strong>F</strong>: Verdedigingsmoment tegen</li>
        <li><strong>W</strong>: Markeer moment</li>
        <li><strong>E</strong>: Markeer + pauze</li>
        <li><strong>Spatie</strong>: Start/pauzeer video</li>
        <li><strong>&larr;</strong>: 5 seconden terug</li>
        <li><strong>&rarr;</strong>: 5 seconden vooruit</li>
        <li><strong>&uarr;</strong>: Video sneller</li>
        <li><strong>&darr;</strong>: Video langzamer</li>
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
  const [table, setTable] = React.useState("matches");
  const [deleteMatchName, setDeleteMatchName] = React.useState(null);
  const [deleteReason, setDeleteReason] = React.useState("");
  const [playbackRate, setPlaybackRate] = React.useState(1);

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

  const tableOptions = {
    matches_heren: "Heren",
    matches: "Dames",
    matches_u21d: "Dames O21",
    matches_u21h: "Heren O21"
  };

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
        const t = Math.max(0, player.getCurrentTime() - 5);
        player.seekTo(t, true);
      } else if (e.key === 'ArrowRight') {
        const t = Math.min(player.getDuration(), player.getCurrentTime() + 5);
        player.seekTo(t, true);
      } else if (e.key === 'ArrowUp') {
        const rates = player.getAvailablePlaybackRates();
        const current = player.getPlaybackRate();
        const idx = rates.indexOf(current);
        if (idx !== -1 && idx < rates.length - 1) {
          const newRate = rates[idx + 1];
          player.setPlaybackRate(newRate);
          setPlaybackRate(newRate);
        }
      } else if (e.key === 'ArrowDown') {
        const rates = player.getAvailablePlaybackRates();
        const current = player.getPlaybackRate();
        const idx = rates.indexOf(current);
        if (idx > 0) {
          const newRate = rates[idx - 1];
          player.setPlaybackRate(newRate);
          setPlaybackRate(newRate);
        }
      } else if (key === ' ') {
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
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
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
    if (!matchName || !videoId) return;

    // Check of de wedstrijd al bestaat
    const { data: existing } = await supabase
      .from(table)
      .select('moments')
      .eq('name', matchName)
      .single();

    if (existing) {
      // Alleen overschrijven als er meer momenten zijn dan in de opgeslagen versie
      const hasMoreInfo = moments.length > (existing.moments ? existing.moments.length : 0);
      if (!hasMoreInfo) {
        alert('Er staat al een versie met evenveel of meer informatie in de database.');
        return;
      }
      const confirmOverwrite = window.confirm('De wedstrijd bestaat al in de database. Overschrijven?');
      if (!confirmOverwrite) return;
    }

    const { error } = await supabase
      .from(table)
      .upsert({ name: matchName, moments, video_id: videoId }, { onConflict: 'name' });

    if (error) {
      console.error('Fout bij opslaan:', error.message);
    } else if (!savedMatches.includes(matchName)) {
      setSavedMatches([...savedMatches, matchName]);
    }
  };

  const handleLoadMatch = async (name) => {
    const { data, error } = await supabase.from(table).select().eq("name", name).single();
    if (error) {
      console.error("Fout bij ophalen:", error.message);
      return;
    }

    setMoments(data.moments || []);
    setMatchName(data.name);
    setVideoId(data.video_id || "");
    handleVideoLoad(data.video_id);
  };

  const deleteMatch = async (name) => {
    setDeleteMatchName(name);
    setDeleteReason("");
  };

  const submitDeleteRequest = async () => {
    if (!deleteMatchName) return;
    try {
      await supabase.from('delete_requests').insert({
        match: deleteMatchName,
        reason: deleteReason,
        table
      });
      alert('Verwijderingsverzoek verstuurd');
    } catch (e) {
      console.error('Fout bij verzoek:', e.message);
    } finally {
      setDeleteMatchName(null);
    }
  };

  const loadMatches = () => {
    supabase.from(table).select("name").then(({ data }) => {
      const names = data.map((m) => m.name).sort((a, b) => a.localeCompare(b));
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

  const renderFloatingButtons = () => (
    <>
      <div style={{ display: "flex", gap: "5px", marginBottom: 10 }}>
        <button
          onClick={() => markMoment("")}
          style={{ ...buttonStyle("#ddd", true), flex: 1, fontWeight: "bold" }}
        >
          ➕ Markeer moment
        </button>
        <button
          onClick={() => markMoment("", true)}
          style={{ ...buttonStyle("#ddd", true), flex: 1, fontWeight: "bold" }}
        >
          ⏸️ Markeer + pauze
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button onClick={() => markMoment("Doelpunt NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>⚽ Doelpunt NL</button>
          <button onClick={() => markMoment("Schot NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>🎯 Schot NL</button>
          <button onClick={() => markMoment("Balwinst")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>✅ Balwinst</button>
          <button onClick={() => markMoment("Start aanval NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>➡️ Start aanval NL</button>
          <button onClick={() => markMoment("Verdedigingsmoment NL")} style={{ ...buttonStyle("#d4edda"), width: "100%" }}>🛡️ Verdedigingsmoment NL</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <button onClick={() => markMoment("Tegendoelpunt")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>🥅 Tegendoelpunt</button>
          <button onClick={() => markMoment("Schot tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>💥 Schot tegen</button>
          <button onClick={() => markMoment("Balverlies")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>❌ Balverlies</button>
          <button onClick={() => markMoment("Start tegenaanval")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>⬅️ Start tegenaanval</button>
          <button onClick={() => markMoment("Verdedigingsmoment tegen")} style={{ ...buttonStyle("#f8d7da"), width: "100%" }}>🛡️ Verdedigingsmoment tegen</button>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      {showInstructions && (
        <InstructionsModal onClose={closeInstructions} label={tableOptions[table]} />
      )}
        {showReleases && (
          <ReleaseModal onClose={() => setShowReleases(false)} />
        )}
        {showShortcuts && (
          <ShortcutsModal onClose={() => setShowShortcuts(false)} />
        )}
      <div
        style={{
          backgroundImage:
            "url('/canoe_polo_banner_8x1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            background: "rgba(0,0,0,0.5)",
            padding: "10px 20px",
            borderRadius: "8px",
            margin: 0,
          }}
        >
          {`Video Analyse NL - ${tableOptions[table]}`}
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginTop: 20 }}>
        <div style={{ flex: 4 }}>
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          {!videoLoaded && (
            <div
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

          <h3>Gemarkeerde momenten:</h3>
          <Timeline moments={moments} duration={duration} onSeek={jumpTo} />
          <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "0 5px", borderRadius: "8px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {moments.map((m, i) => (
                <li key={i} style={{ marginBottom: "4px" }}>
                  <button onClick={() => jumpTo(m.time)} style={{ marginRight: 5, ...buttonStyle() }}>{formatTime(m.time)}</button>
                  <select value={m.label} onChange={(e) => updateLabel(i, e.target.value)}>
                    <option value="">-- Kies label --</option>
                    {labels.map((l, j) => <option key={j} value={l}>{l}</option>)}
                  </select>
                  <input type="text" placeholder="Notitie..." value={m.note} onChange={(e) => updateNote(i, e.target.value)} style={{ marginLeft: 5 }} />
                  <button onClick={() => adjustTime(i, -1)}>-1s</button>
                  <button onClick={() => adjustTime(i, 1)}>+1s</button>
                  <button onClick={() => deleteMoment(i)} style={{ color: "red" }}>🗑️</button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={download} style={buttonStyle()}>📥 Download JSON</button>
        </div>

        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="YouTube link plakken..."
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <button
            onClick={() => handleVideoLoad()}
            style={{ ...buttonStyle("#007bff", true), width: "100%", fontWeight: "bold" }}
          >
            🎬 Laad video en start analyse
          </button>
          <div style={{ display: "flex", gap: "5px", margin: "10px 0" }}>
            <button onClick={() => setShowInstructions(true)} style={buttonStyle()}>
              ❔ Instructies
            </button>
            <button onClick={() => setShowReleases(true)} style={buttonStyle()}>
              📝 Releases
            </button>
            <button onClick={() => setShowShortcuts(true)} style={buttonStyle()}>
              ⌨️ Sneltoetsen
            </button>
          </div>
          {renderFloatingButtons()}
          <div style={{ background: "#ffeeba", padding: "5px", borderRadius: "4px", marginBottom: "5px", textAlign: "center" }}>
            Selecteer hieronder de categorie
          </div>
          <select value={table} onChange={(e) => setTable(e.target.value)} style={{ width: "100%", marginBottom: 5 }}>
            {Object.entries(tableOptions).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <input type="text" placeholder="Wedstrijdnaam..." value={matchName} onChange={(e) => setMatchName(e.target.value)} style={{ width: "100%" }} />
          <button onClick={saveMatch} disabled={!matchName} style={buttonStyle()}>💾 Opslaan</button>
          <button onClick={loadMatches} style={buttonStyle()}>📂 Bekijk opgeslagen</button>
          {savedMatches.length > 0 && (
            <ul>
              {savedMatches.map((m, i) => (
                <li key={i}>
                  <strong>{m}</strong>
                  <button onClick={() => handleLoadMatch(m)} style={{ marginLeft: 10 }}>Laden</button>
                  <button onClick={() => deleteMatch(m)} style={{ marginLeft: 5, color: "red" }}>🗑️</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {deleteMatchName && (
        <DeleteRequestModal
          match={deleteMatchName}
          reason={deleteReason}
          onReasonChange={setDeleteReason}
          onSubmit={submitDeleteRequest}
          onClose={() => setDeleteMatchName(null)}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
