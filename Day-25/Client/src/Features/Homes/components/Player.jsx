import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const shellStyles = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80px",
    background: "#000000",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.3)",
    zIndex: 1000
};

const leftSectionStyles = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: "0 0 250px"
};

const centerSectionStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
};

const rightSectionStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: "0 0 200px",
    gap: "12px"
};

const volumeButtonStyles = {
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    background: "transparent",
    color: "#ccc",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const volumeSliderStyles = {
    width: "80px",
    height: "4px",
    accentColor: "#ff6b35",
    cursor: "pointer",
    background: "#444"
};

const posterStyles = {
    width: "60px",
    height: "60px",
    borderRadius: "4px",
    objectFit: "cover",
    background: "#333",
    border: "1px solid #444"
};

const controlsRowStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flex: 1
};

const secondaryButtonStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "transparent",
    color: "#ccc",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s, background-color 0.2s"
};

const primaryButtonStyles = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#ff6b35",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(255, 107, 53, 0.4)",
    transition: "background-color 0.2s"
};

const sliderStyles = {
    width: "100%",
    height: "4px",
    accentColor: "#ff6b35",
    cursor: "pointer",
    background: "#444"
};

const infoPillStyles = {
    display: "none" // Hide in bottom player
};

function formatTime(value) {
    if (!Number.isFinite(value)) {
        return "0:00";
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}

function Player() {
    const audioRef = useRef(null);
    const { loading, song } = useSong();
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ volume, setVolume ] = useState(1);
    const [ isMuted, setIsMuted ] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return undefined;
        }

        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        audio.pause();
        audio.load();

        if (!song?.url) {
            return undefined;
        }

        const tryAutoPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                setIsPlaying(false);
            }
        };

        tryAutoPlay();

        return undefined;
    }, [ song?.url ]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return undefined;
        }

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
        const handleLoadedMetadata = () => setDuration(audio.duration || 0);
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };
        const handlePause = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("play", handlePlay);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("play", handlePlay);
        };
    }, []);

    async function togglePlayback() {
        const audio = audioRef.current;

        if (!audio || !song?.url) {
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                setIsPlaying(false);
            }
            return;
        }

        audio.pause();
    }

    function skipBy(seconds) {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const nextTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            duration || audio.duration || 0
        );

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    }

    function handleSeek(event) {
        const audio = audioRef.current;
        const nextTime = Number(event.target.value);

        if (!audio) {
            return;
        }

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    }

    function handleVolumeChange(event) {
        const audio = audioRef.current;
        const newVolume = Number(event.target.value);

        if (!audio) {
            return;
        }

        audio.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }

    function toggleMute() {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (isMuted) {
            audio.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    }

    return (
        <section style={shellStyles}>
            <audio ref={audioRef} preload="metadata">
                {song?.url ? <source src={song.url} /> : null}
            </audio>

            <div style={leftSectionStyles}>
                {song?.posterUrl ? (
                    <img src={song.posterUrl} alt={song.title || "Song poster"} style={posterStyles} />
                ) : (
                    <div style={posterStyles} />
                )}
                <div>
                    <h3 style={{ margin: 0, fontSize: "0.9rem", color: "#fff" }}>
                        {song?.title || "No song loaded"}
                    </h3>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.7rem", color: "#ccc" }}>
                        {song?.mood || "Detect expression"}
                    </p>
                </div>
            </div>

            <div style={centerSectionStyles}>
                <div style={controlsRowStyles}>
                    <button
                        type="button"
                        onClick={() => skipBy(-10)}
                        style={secondaryButtonStyles}
                        disabled={!song?.url}
                        title="Rewind 10 seconds"
                        aria-label="Rewind 10 seconds"
                    >
                        ⏮️
                    </button>
                    <button
                        type="button"
                        onClick={togglePlayback}
                        style={primaryButtonStyles}
                        disabled={!song?.url}
                        title={isPlaying ? "Pause" : "Play"}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? "⏸️" : "▶️"}
                    </button>
                    <button
                        type="button"
                        onClick={() => skipBy(10)}
                        style={secondaryButtonStyles}
                        disabled={!song?.url}
                        title="Forward 10 seconds"
                        aria-label="Forward 10 seconds"
                    >
                        ⏭️
                    </button>
                </div>
                <div style={{ width: "100%", marginTop: "8px" }}>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={Math.min(currentTime, duration || 0)}
                        onChange={handleSeek}
                        style={sliderStyles}
                        disabled={!song?.url}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "4px",
                            color: "#ccc",
                            fontVariantNumeric: "tabular-nums",
                            fontSize: "0.7rem"
                        }}
                    >
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <div style={rightSectionStyles}>
                <button onClick={toggleMute} style={volumeButtonStyles}>
                    {isMuted ? "🔇" : "🔊"}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    style={volumeSliderStyles}
                />
            </div>
        </section>
    );
}

export default Player;
