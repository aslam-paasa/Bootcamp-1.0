import { useForm, type SubmitHandler } from "react-hook-form";
import "../style.css";

/**
 * Define the form data type:
*/
interface FormData {
    firstName: string;
    lastName: string;  
    email: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    completeLocation: string;
}


/**
 * Define the form component:
*/
const MyForm: React.FC = () => {
    /**
     * Destructured useForm hooks:
     * a. register    : is used to connect input fields to the form. 
     * b. handleSubmit: is a function to handle form submission.
     * c. errors      : contains validation errors for the form fields.
    */
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


    /**
     * Define the submit handler with the proper type
    */
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };


    /**
     * Render the form:
     * a. form handling:
     *    - Put handleSubmit in form onSubmit()
     *    - Pass onSubmit custom fn to handleSubmit() as a callback function
     *    - custom onSubmit() will then print the form data to the console 
     *   
     * b. form fields handling using register():
     *    - call register() to connect the input field to the form. 
     *    - It takes two arguments:
     *      a. name   : the name of the input field (e.g. "firstName")
     *      b. options: an object with the following properties:
     *         - required: boolean val make the field mandatory
     *         - message: string val to display error message
     *      c. Example:
     *         - {...register("firstName", { required: "First Name is required" })}: register the form field
     *         - 
     * c. error handling:
     *    - If the field is required and not filled, the error message will 
     *      be displayed.
     *    - Ex: "First Name is required"
     * c. button:
     *    - type        : the type of the button
     *    - Submit      : submit the form
    */
    return (
        <div className="form-container">
            <h2>Registration Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        {...register("firstName", { required: "First Name is required" })}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        {...register("lastName", { required: "Last Name is required" })}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email Address is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        {...register("city", { required: "City is required" })}
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        type="text"
                        {...register("state", { required: "State is required" })}
                    />
                    {errors.state && <p>{errors.state.message}</p>}
                </div>

                <div>
                    <label htmlFor="zip">ZIP</label>
                    <input
                        id="zip"
                        type="text"
                        {...register("zip", { required: "ZIP is required" })}
                    />
                    {errors.zip && <p>{errors.zip.message}</p>}
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        type="text"
                        {...register("country", { required: "Country is required" })}
                    />
                    {errors.country && <p>{errors.country.message}</p>}
                </div>

                <div>
                    <label htmlFor="completeLocation">Complete Location</label>
                    <textarea
                        id="completeLocation"
                        {...register("completeLocation", {
                            required: "Complete Location is required",
                        })}
                    />
                    {errors.completeLocation && <p>{errors.completeLocation.message}</p>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MyForm;