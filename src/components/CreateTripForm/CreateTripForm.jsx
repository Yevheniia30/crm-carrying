import { Formik, Field, ErrorMessage } from "formik";
import { initialTrip } from "utils/initials";
import { tripSchema } from "utils/validations";

const CreateTripForm = ({ onSubmit, drivers }) => {
  //   console.log(drivers);
  const options = drivers?.map((item) => {
    return (
      <option key={item?.phoneNumber}>{item?.phoneNumber || Date.now()}</option>
    );
  });
  //   console.log("options", options);
  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={(msg) => <p className="text-danger">{msg}</p>}
      />
    );
  };
  return (
    <Formik
      initialValues={initialTrip}
      validationSchema={tripSchema}
      //   onSubmit={(values, { setSubmitting }) => {
      //     console.log("values", values);
      //     onSubmit(values);
      //   }}
    >
      {(formik) => (
        <form>
          <pre>{JSON.stringify(formik, null, 2)}</pre>
          <div className="form-group">
            <label htmlFor="carNumber">Car number</label>
            <Field
              type="text"
              className="form-control"
              id="carNumber"
              name="carNumber"
              placeholder="Car number"
              value={formik.values.carNumber}
              onChange={formik.handleChange}
            />
            <FormError name="carNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="departure">From</label>
            <Field
              type="text"
              className="form-control"
              id="departure"
              name="departure"
              placeholder="Departure"
              value={formik.values.departure}
              onChange={formik.handleChange}
            />
            <FormError name="departure" />
          </div>
          <div className="form-group">
            <label htmlFor="destination">To</label>
            <Field
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              value={formik.values.destination}
              onChange={formik.handleChange}
              placeholder="Destination"
            />
            <FormError name="destination" />
          </div>
          <div className="form-group">
            <label htmlFor="passengersCount">Count of passengers</label>
            <Field
              type="text"
              className="form-control"
              id="passengersCount"
              name="passengersCount"
              placeholder="Count of passengers"
              value={formik.values.passengersCount}
              onChange={formik.handleChange}
            />
            <FormError name="passengersCount" />
          </div>
          <div className="form-group">
            <label htmlFor="driver">Select a driver</label>
            <select
              value={formik.values.driver}
              className="form-control"
              id="driver"
              onChange={formik.handleChange}
            >
              {options}
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid}
              data-dismiss="modal"
              onClick={() => onSubmit(formik.values)}
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateTripForm;
