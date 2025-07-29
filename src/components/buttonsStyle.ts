export const buttonStyle: { [key: string]: React.CSSProperties } = {
    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        marginTop: "5px",
        padding: "5px 10px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    disabledButton: {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
    },
};