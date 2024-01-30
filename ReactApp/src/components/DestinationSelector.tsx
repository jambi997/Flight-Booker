import { useFormik } from "formik";
import React from "react";
import Textfield from "./Textfield";
import Plus from "../icons/plusmito.svg";
import SubmitButton from "./SubmitButton";
import { colors } from "../data/style";
const DestinationSelector = () => {
  const formik = useFormik({
    initialValues: {
      destination: "",
      origin: "",
      departure: "",
      return: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div
        style={{
          height: "50px",
          backgroundColor: colors.primary,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: colors.text1,
          //   paddingLeft: "10px",
        }}
      >
        <img
          src={Plus}
          style={{
            height: "20px",
            paddingRight: "10px",
            paddingLeft: "10px",
            // backgroundColor: "blue",
          }}
          alt="plus"
        />
        MITO AIRLINE
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "500px",
          padding: "10px",
          paddingBottom: "30px",
        }}
      >
        {/* <h1>DestinationSelector</h1> */}
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Textfield
              label="destination"
              value={formik.values.destination}
              onChange={(value) => formik.setFieldValue("destination", value)}
            />
            <Textfield
              label="origin"
              value={formik.values.origin}
              onChange={(value) => formik.setFieldValue("origin", value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Textfield
              label="destination"
              value={formik.values.destination}
              onChange={(value) => formik.setFieldValue("destination", value)}
            />
            <Textfield
              label="origin"
              value={formik.values.origin}
              onChange={(value) => formik.setFieldValue("origin", value)}
            />
          </div>
          <SubmitButton label="Search" />
        </form>
      </div>
    </div>
  );
};

export default DestinationSelector;
