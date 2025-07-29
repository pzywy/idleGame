import { useSelector } from "react-redux";
import { listStyles } from "./listStyles";
import Enemy from "../../Enemies/Enemy";
import { enemiesSelector } from "../../store/enemiesSlice";


const Enemies = () => {
    const enemies = useSelector(enemiesSelector);

    return (
        <div style={listStyles.container}>
            {/* <h2 style={styles.heading}>Creations</h2> */}
            <div style={listStyles.grid}>
                {enemies.map((element) => (
                    <Enemy
                        key={element.id}
                        enemy={element}
                    />
                ))}
            </div>
        </div>
    );
};


export default Enemies;