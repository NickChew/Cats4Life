import { useRef } from "react";

const Modal = (props) => {
    const modalRef = useRef();

    const handleClick = (e) => {
        if(modalRef.current === e.target){
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
                    <img src={props.char.image_url} width="30px" alt={`Harry Potter Character`} />
                </div>
                <div className="bottomSection">                    
                    <h1>NAME: {props.char.name}</h1>                    
                    <p>{props.char.species}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;