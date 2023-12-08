import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

type PopupAlertProps = {
  message: string;
  onClose: () => void;
};

function PopupAlert(props: PopupAlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true); // Reset show state when message prop changes
  }, [props.message]);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  if (show) {
    return (
      <Alert variant="success" onClose={handleClose} dismissible>
        <p>{props.message}</p>
      </Alert>
    );
  } else {
    return null;
  }
}

export default PopupAlert;
