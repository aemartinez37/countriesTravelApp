import React from "react";
import { FallbackProps } from "react-error-boundary";
import { SubscribeLibForm } from "./SubscribeLibForm";
import { SubscribeManualForm } from "./SubscribeManualForm";

export function AppError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <h1>You finished your trip</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Go back!</button>
      <hr />
      <h2>Subscribe to win your current trip</h2>
      <h3>(Manual form)</h3>
      <SubscribeManualForm />
      <hr />
      <h3>(Lib form)</h3>
      <SubscribeLibForm />
      <hr />
    </div>
  );
}
