import React, { useState, createContext, useContext } from "react";
import ShowToast from "../components/ShowToast";

interface ToastContextProps {
  showToast: (title: string, message: string, type: string) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    title: "",
    message: "",
    type: "",
  });

  const showToastHandler = (title: string, message: string, type: string) => {
    setToastConfig({ title, message, type });
    setShowToast(true);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast: showToastHandler,
        hideToast: hideToastHandler,
      }}
    >
      {children}
      {showToast && (
        <ShowToast
          title={toastConfig.title}
          message={toastConfig.message}
          type={toastConfig.type as any}
          autohide={true}
          delay={6000}
          onClose={hideToastHandler as any}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
