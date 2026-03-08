import { useRef, type FormEvent, useState } from "react";

type formData = {
  name: string;
  email: string;
  password: string;
};

const Form = () => {
  const [submittedData, setSubmittedData] = useState<formData>({
    name: "",
    email: "",
    password: "",
  });

  /**
   * useRef: is used to store the value of the input field.
   * > Type: We qre going to use useRef inside our form and inside specific
   *   input element, so we have to tell our useRef that we are going to use
   *   name, email and password inside the html input element:
   *   - useRef<HTMLInputElement>(null) 
  */
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameVal = name.current!.value;
    const emailVal = email.current!.value;
    const passwordVal = password.current!.value;

    setSubmittedData({
      name: nameVal,
      email: emailVal,
      password: passwordVal,
    });

    console.log(nameVal);
    console.log(emailVal);
    console.log(passwordVal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your name" ref={name} />
      <input type="email" placeholder="Enter your email" ref={email} />
      <input type="password" placeholder="Enter your password" ref={password} />
      <button type="submit">Submit</button>

      <section>
        <h1>Name: {submittedData.name}</h1>
        <h1>Email: {submittedData.email}</h1>
        <h1>Password: {submittedData.password}</h1>
      </section>
    </form>
  );
};

export default Form;