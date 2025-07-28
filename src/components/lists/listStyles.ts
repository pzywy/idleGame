export const listStyles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
    },
    heading: {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
};