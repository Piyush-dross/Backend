import { useContext } from "react";
import { getSong } from "../services/song.api";
import { songContext } from "../song.context";

const moodMap = {
    surprised: "suprised"
};

export function useSong() {
    const context = useContext(songContext);

    if (!context) {
        throw new Error("useSong must be used inside SongContextProvider");
    }

    const { loading, setLoading, song, setSong } = context;

    async function handleGetSong({ mood }) {
        const normalizedMood = moodMap[ mood ] || mood;

        setLoading(true);

        try {
            const data = await getSong({ mood: normalizedMood });
            setSong(data.song || null);
        } catch (error) {
            console.error("Failed to fetch song", error);
            setSong(null);
        } finally {
            setLoading(false);
        }
    }

    return { loading, song, handleGetSong };
}
