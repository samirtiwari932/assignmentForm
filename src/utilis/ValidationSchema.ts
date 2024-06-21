import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup
    .string()
    .transform(value => value.replace(/\D/g, "")) // Remove any non-digit characters
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  instagram: yup.string().required("Instagram handle is required"),
  tiktok: yup.string().required("TikTok handle is required"),
  twitter: yup.string().required("Twitter handle is required"),
  favcolor: yup.string(), // Optional field, no specific validation
  custom_field_1: yup.string().required("Custom Field 1 is required"),
  custom_field_2: yup.string(), // Optional field, no specific validation
  custom_field_3: yup.boolean().required("Custom Field 3 is required"),
});
