import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SimpleForm = () => {
  /**
   * register → connects input fields to the form state.
   * handleSubmit → handles the form submission.
   * formState → includes 'errors' and 'isSubmitting'.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // onSubmit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);

    // simulate async call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Form submitted successfully 🚀");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Name Field */}
      <div>
        <label htmlFor="name" style={{ fontWeight: "bold" }}>
          Name:
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" style={{ fontWeight: "bold" }}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" style={{ fontWeight: "bold" }}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          background: isSubmitting ? "#aaa" : "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontWeight: "bold",
          transition: "0.3s ease",
        }}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

// Inline CSS styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "13px",
  marginTop: "4px",
};

export default SimpleForm;
