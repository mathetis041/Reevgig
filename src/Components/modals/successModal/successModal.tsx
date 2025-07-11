import React from 'react';
import {ButtonII} from "../../../stories/Button-II/ButtonII";
import style from "../mailModal/modal.module.css";

interface modalProps {
    Forward: () => void;
    Backward: () => void;
    text: string;
    Btnlabel1: string;
    Btnlabel2: string;
}

const SuccessModal = ({Forward, Backward, text, Btnlabel2, Btnlabel1}: modalProps) => {
    return (
        <div className={style.container}>
            <br/>
            <br/>

            <div>
                <img
                    src="https://res.cloudinary.com/do5wu6ikf/image/upload/v1721834248/Reev/Vectormodal_2_done_aksbop.svg"
                    alt="success illustration"/>
            </div>

            <div className={style.headerText}>
                <h1>{text}</h1>
            </div>

            <br/>
            <br/>
            <div className={style.btnCont}>
                <ButtonII label={Btnlabel1} primary={false} hasIcon={false} disabled={false} isLabelVisible={true}
                          onClick={Backward}/>
                <ButtonII label={Btnlabel2} primary={true} hasIcon={false} disabled={false} isLabelVisible={true}
                          onClick={Forward}/>
            </div>
        </div>
    );
};

export default SuccessModal;