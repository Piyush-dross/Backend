import FaceExpression from "../../Expression/Components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

const pageStyles = {
    minHeight: "100vh",
    padding: "32px 20px 120px 20px",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #ff6b35 100%)",
    color: "#ffffff"
};

const layoutStyles = {
    width: "min(1080px, 100%)",
    margin: "0 auto",
    display: "grid",
    gap: "24px"
};

const cardStyles = {
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255, 107, 53, 0.1)",
    border: "1px solid #ff6b35",
    boxShadow: "0 8px 24px rgba(255, 107, 53, 0.2)",
    backdropFilter: "blur(12px)"
};

function Home() {
    const { handleGetSong } = useSong();

    return (
        <main style={pageStyles}>
            <section style={layoutStyles}>
                <div style={cardStyles}>
                    <FaceExpression onClick={(expression)=>{handleGetSong({mood:expression})}} />
                </div>
            </section>
            <Player />
        </main>
    );
}

export default Home;
