import React from "react";
import { ICreation, IResourceCost } from "../../types/creationTypes";
import { buttonStyle } from "../buttonsStyle";

const CreationUse: React.FC<{ creation: ICreation, name?: string }> = ({ creation }) => {


    const use = () => { }

    const canUse = creation.owned > 0

    return (
        <div>
            <button
                style={{
                    ...styles.button,
                    ...(!canUse ? styles.disabledButton : {}),
                }}
                onClick={() => use()}
                disabled={!canUse}
            >
                Use
            </button>
        </div >
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    ...buttonStyle
};
export default CreationUse;