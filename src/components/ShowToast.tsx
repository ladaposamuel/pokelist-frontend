import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ShowToastProps {
  title: string;
  message: string;
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  autohide: boolean;
  delay: number;
  onClose: () => void;
}

const ShowToast: React.FC<ShowToastProps> = ({
  title,
  message,
  type,
  autohide,
  delay,
  onClose,
}) => {
  const textColor = (type: string) => {
    if (type === "dark" || type === "success" || type === "danger") {
      return "text-white";
    }
    return "text-dark";
  };

  return (
    <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: 1 }}>
      <Toast
        bg={type.toLowerCase()}
        onClose={onClose}
        show={true}
        delay={delay}
        autohide={autohide}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={textColor(type)}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ShowToast;
