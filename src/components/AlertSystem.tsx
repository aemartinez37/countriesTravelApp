import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { ComplianceService } from "../services/ComplianceService";

const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      ComplianceService.checkForAlerts().then((newAlerts) => {
        setAlerts((prevAlerts) => [...prevAlerts, ...newAlerts]);
      });
    }, 900000); // 15 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Alert System</h1>
      {alerts.map((alert, index) => (
        <Alert key={index} variant="danger">
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default AlertSystem;
