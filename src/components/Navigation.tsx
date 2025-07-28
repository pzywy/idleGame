import { NavLink } from "react-router-dom";


const Navigation = () => {

    const navigation = [
        { name: 'Main', url: '' },
        { name: 'Creations', url: 'creations' },
        { name: 'Enemies', url: 'enemies' },
        { name: 'Powers', url: 'powers' },
    ]

    return (
        <nav>
            <ul style={styles.nav}>
                {navigation.map((nav, index) => (
                    <li key={index} style={styles.li}>
                        <NavLink style={({ isActive }) => {
                            return {
                                ...styles.a,
                                ...(isActive ? styles.active : {})
                            };
                        }}
                            to={nav.url}>{nav.name}</NavLink>
                    </li>

                ))}
            </ul>
        </nav >


    );
};


const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        flexWrap: 'wrap',
        marginBottom: '10px',
    },
    li: {
        display: 'block',
        border: 'black solid 1px',

    },
    a: {
        display: 'flex',
        minWidth: '70px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20px',
        padding: '5px',
        color: 'black',
        textDecoration: 'none',
    },
    active: {
        background: '#d9d9d9'
    }
};

export default Navigation;
