import React from "react";
import { SubscriptionType } from "../types";
import { useAppContext } from "../app-context/AppContext";
import { Formik, Field, Form, ErrorMessage } from "formik";

export const SubscribeLibForm: React.FC = () => {
  const appContext = useAppContext();
  const travel = appContext.visitedCountries;
  const SUBSCRIBERS = "SUBSCRIBERS";

  const handleSubmit = (values: SubscriptionType) => {
    const subscribersObj = JSON.parse(
      sessionStorage.getItem(SUBSCRIBERS) || "[]"
    ).concat([
      {
        name: values.name,
        email: values.email,
        country: values.country,
        travel: travel.reduce((acum, x) => {
          return acum + " ->" + x.name;
        }, ""),
      },
    ]);
    sessionStorage.setItem(SUBSCRIBERS, JSON.stringify(subscribersObj));
    alert("Submited Ok!");
    window.location.href = "/";
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", country: "" }}
        validate={(values: SubscriptionType) => {
          const errors = {} as SubscriptionType;
          if (!values.name) {
            errors.name = "Required";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.country) {
            errors.country = "Required";
          } else if (
            travel[0].name.toUpperCase() != values.country.toUpperCase()
          ) {
            errors.country = "You should live on the first visited country!";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          handleSubmit(values as SubscriptionType);
        }}
      >
        <Form style={{ width: "60rem", margin: "auto" }}>
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field name="country" type="text" placeholder="Country" />
          <ErrorMessage name="country" component="div" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
