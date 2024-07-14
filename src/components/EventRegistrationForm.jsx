import React, { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = () => {
    setErrors(validate(values));
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest === 'Yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const { values, errors, handleChange, handleBlur } = useForm(
    {
      name: '',
      email: '',
      age: '',
      attendingWithGuest: 'No',
      guestName: '',
    },
    validate
  );

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border-2 rounded-xl">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Are you attending with a guest?</label>
            <select
              name="attendingWithGuest"
              value={values.attendingWithGuest}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {values.attendingWithGuest === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Guest Name</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.guestName && <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4  rounded-md">
          <h2 className="text-lg font-medium text-gray-900">Form Submission Summary</h2>
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Age:</strong> {values.age}</p>
          <p><strong>Attending with Guest:</strong> {values.attendingWithGuest}</p>
          {values.attendingWithGuest === 'Yes' && <p><strong>Guest Name:</strong> {values.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
