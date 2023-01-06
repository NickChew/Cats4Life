import { useRef } from "react";

const Modal = (props) => {
    const modalRef = useRef();

    const handleClick = (e) => {
        if (modalRef.current === e.target) {
            props.closeModal(false)
        }
    }
    const handleCloseClick = (e) => {
        props.closeModal(false)
    }

    return (
        <div className="modalBackground" ref={modalRef} onClick={handleClick}>
            <div className="modalBox">
                <p className="closeIcon" onClick={handleCloseClick}>x</p>
                <div className="topSection">
                    <img src={props.cat.catImg} alt={props.cat.name} height='250px' width='250px'></img>
                    <div className="whiteGradient"></div>
                </div>
                <div className="bottomSection">
                    <h4>{props.cat.name}</h4>
                    <p>£{props.cat.price}</p>
                    <p>{props.cat.gender}</p>
                    <p>Breed : {props.cat.breed}</p>
                    <p>Location: {props.cat.location}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;