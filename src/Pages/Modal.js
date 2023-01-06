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
                    <img src={props.catImage.image_url} width="30px" alt={`Cat`} />
                </div>
                <div className="bottomSection">                    
                    <h1>NAME: {props.cat.name}</h1>                    
                    <p>{props.cat.breed}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;