import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./styles.css";

type PopupAlertProps = {
  message: string;
  onClose: () => void;
};

function PopupAlert(props: PopupAlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [props.message]);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  if (show) {
    return (
      <Alert variant="success" onClose={handleClose} dismissible className="popup-alert">
        <p className="popup-alert-content">{props.message}</p>
      </Alert>
    );
  } else {
    return null;
  }
}

export default PopupAlert;
