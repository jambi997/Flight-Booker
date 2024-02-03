import { useFormik } from "formik";
import React from "react";
import Textfield from "./Textfield";
import Plus from "../icons/plusmito.svg";
import SubmitButton from "./SubmitButton";
import { colors } from "../data/style";
import { useLocation, useNavigate } from "react-router-dom";
import { BookValues, Location } from "../types/generalTypes";
import * as Yup from "yup";
import Autocomplete from "./Autocomplete";
import DateSelector from "./DateSelector";
import { cities } from "../data/data";

const DestinationSelector = () => {
  const location: any = useLocation();
  // const { origin, destination, departureDate, returnDate } = location.state;
  const navigate = useNavigate();
  const formik = useFormik<BookValues>({
    initialValues: {
      origin: "",
      destination: "",
      departureDate: new Date(),
      returnDate: null,
    },
    validationSchema: Yup.object({
      origin: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      destination: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      departureDate: Yup.date()
      .required("Required"),
      returnDate: Yup.date().nullable(),
    }),
    onSubmit: (values: BookValues) => {
      // console.log(values);
      navigate("/book", { state: values });
    },
  });

  return (
    <div
      style={{
        backgroundColor: colors.text1,
      }}
    >
      <div
        style={{
          height: "50px",
          backgroundColor: colors.primary,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: colors.text1,
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
          width: "450px",
          padding: "10px",
          paddingBottom: "30px",
        }}
      >
        {/* <h1>DestinationSelector</h1> */}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div
            style={{
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-between",
              display: "grid",
              gridTemplateColumns: "auto auto",
              padding: "10px",
            }}
          >
            <Autocomplete
              name="origin"
              options={cities}
              value={formik.values.origin}
              onChange={(value) => formik.setFieldValue("origin", value)}
            />
            <Autocomplete
              name="destination"
              options={cities}
              value={formik.values.destination}
              onChange={(value) => formik.setFieldValue("destination", value)}
            />
            <DateSelector
              name="departureDate"
              value={formik.values.departureDate}
              onChange={(value) => formik.setFieldValue("departureDate", value)}
            />
            <DateSelector
              name="returnDate"
              value={formik.values.returnDate}
              onChange={(value) => formik.setFieldValue("returnDate", value)}
            />
          </div>
          <SubmitButton label="Search" />
        </form>
      </div>
    </div>
  );
};

export default DestinationSelector;
