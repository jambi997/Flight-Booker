import { useFormik } from "formik";
import React, { useEffect } from "react";
import Plus from "../icons/plusmito.svg";
import SubmitButton from "./SubmitButton";
import { colors } from "../data/style";
import { useLocation, useNavigate } from "react-router-dom";
import { BookValues, Location } from "../types/generalTypes";
import * as Yup from "yup";
import Autocomplete from "./Autocomplete";
import DateSelector from "./DateSelector";
import { cities } from "../data/data";
import { isMobile } from "react-device-detect";

const DestinationSelector = () => {
  const [originCities, setOriginCities] = React.useState<string[]>(cities);
  const [destinationCities, setDestinationCities] =
    React.useState<string[]>(cities);
  const navigate = useNavigate();
  const storedData = localStorage.getItem("bookValues");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const formik = useFormik<BookValues>({
    initialValues: {
      origin: parsedData?.origin || "",
      destination: parsedData?.destination || "",
      departureDate: parsedData?.departureDate
        ? new Date(parsedData.departureDate)
        : null,
      returnDate: parsedData?.returnDate
        ? new Date(parsedData.returnDate)
        : null,
    },
    validationSchema: Yup.object({
      origin: Yup.string().required("Please select origin"),
      destination: Yup.string().required("Please select destination"),
      departureDate: Yup.date()
        .min(new Date(), "Departure date cannot be before today")
        .required("Please select departure"),
      returnDate: Yup.date()
        .nullable()
        .test(
          "not-same",
          "Return date must be after departure",
          function (value) {
            const { departureDate } = this.parent;
            return (
              !departureDate ||
              !value ||
              new Date(value) > new Date(departureDate)
            );
          }
        ),
    }),
    onSubmit: (values: BookValues) => {
      // navigate(
      //   `/book?origin=${values.origin}&${values.destination}&${values.departureDate}&${values.returnDate}`,
      //   { state: values }
      // );
      navigate(`/book`);
    },
  });
  useEffect(() => {
    localStorage.setItem("bookValues", JSON.stringify(formik.values));
  }, [formik.values]);

  useEffect(() => {
    const filteredCities = cities.filter(
      (city) => city !== formik.values.origin
    );
    setDestinationCities(filteredCities);
  }, [formik.values.origin]);

  useEffect(() => {
    const filteredCities = cities.filter(
      (city) => city !== formik.values.destination
    );
    setOriginCities(filteredCities);
  }, [formik.values.destination]);
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
          maxWidth: "450px",
          padding: "10px",
          paddingBottom: "30px",
        }}
      >
        {/* <h1>DestinationSelector</h1> */}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "auto" : "auto auto",
              padding: "10px",
            }}
          >
            <Autocomplete
              name="origin"
              label="Origin"
              options={originCities}
              error={formik.errors.origin}
              value={formik.values.origin}
              onChange={(value) => formik.setFieldValue("origin", value)}
            />
            <Autocomplete
              name="destination"
              label="Destination"
              error={formik.errors.destination}
              options={destinationCities}
              value={formik.values.destination}
              onChange={(value) => formik.setFieldValue("destination", value)}
            />
            <DateSelector
              name="departureDate"
              value={formik.values.departureDate}
              onChange={(value) => formik.setFieldValue("departureDate", value)}
              error={formik.errors.departureDate}
              label="Departure"
            />
            <DateSelector
              name="returnDate"
              value={formik.values.returnDate}
              onChange={(value) => formik.setFieldValue("returnDate", value)}
              error={formik.errors.returnDate}
              label="Return"
            />
          </div>
          <SubmitButton label="Search" />
        </form>
      </div>
    </div>
  );
};

export default DestinationSelector;
