import React from "react";
import { render, screen, waitFor, fireEvent } from "./test-utils";
import { SubscribeLibForm } from "../src/components/SubscribeLibForm";
import { cleanup } from "@testing-library/react";

describe("SubscribeLibForm component", () => {
  it("should render an error when name is empty", async () => {
    render(<SubscribeLibForm />);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "" },
    });
    fireEvent(
      screen.getByText("Submit"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeTruthy();
      cleanup();
    });
  });

  it("should render an error when email is empty", async () => {
    render(<SubscribeLibForm />);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Andres" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "" },
    });
    fireEvent(
      screen.getByText("Submit"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeTruthy();
      cleanup();
    });
  });

  it("should render an error when email has wrong format", async () => {
    const wrongEmail = "qwerty";
    render(<SubscribeLibForm />);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Andres" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: wrongEmail },
    });
    fireEvent(
      screen.getByText("Submit"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      screen.getByText("Invalid email address");
    });
  });
});
