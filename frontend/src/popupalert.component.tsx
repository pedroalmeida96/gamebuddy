import { useState } from "react";
import { Alert } from "react-bootstrap";

type PopupAlertProps = {
  message: string;
};

function PopupAlert(props: PopupAlertProps) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <p>{props.message}</p>
      </Alert>
    );
  }
}

export default PopupAlert;
