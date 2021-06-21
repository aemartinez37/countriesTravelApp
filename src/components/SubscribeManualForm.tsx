import React, { useRef } from "react";
import { Country } from "../types";
import { useAppContext } from "../app-context/AppContext";
import { Form, Button } from "react-bootstrap";

export const SubscribeManualForm: React.FC = () => {
  const appContext = useAppContext();
  const travel = appContext.travel;
  const countries = appContext.value;
  const SUBSCRIBERS = "SUBSCRIBERS";
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameValue = nameRef.current!.value;
    const emailValue = emailRef.current!.value;
    const countryValue = countryRef.current!.value;

    if (nameValue == "" || emailValue == "") {
      alert("Incomplete information!");
    } else if (countryValue != travel[0].alpha3Code) {
      alert("You should live on the first visited country!");
    } else {
      const subscribersObj = JSON.parse(
        sessionStorage.getItem(SUBSCRIBERS) || "[]"
      ).concat([
        {
          name: nameValue,
          email: emailValue,
          country: countryValue,
          travel: travel.reduce((acum, x) => {
            return acum + " ->" + x.name;
          }, ""),
        },
      ]);
      sessionStorage.setItem(SUBSCRIBERS, JSON.stringify(subscribersObj));
      alert("Submited Ok!");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ width: "60rem", margin: "auto" }}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCountry">
          <Form.Label>Country:</Form.Label>
          <Form.Control
            as="select"
            id="inlineFormCustomSelect"
            ref={countryRef}
            custom
          >
            {countries.map((country: Country) => (
              <option value={country.alpha3Code}>{country.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
