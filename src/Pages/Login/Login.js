import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {register,formState: { errors },handleSubmit,} = useForm(); 
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);


  const[token]=useToken(user || gUser)

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // Error Answer for : Cannot update a component (`BrowserRouter`) while rendering a different component (`Login`). To locate the bad setState() call 
  useEffect(() => {
    if (token) {
      // console.log(user || gUser);
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="flex justify-center h-screen items-center ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          {/* //hook form  start*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*email text-input start*/}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p role="alert" className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </label>
            </div>
            {/*email text-input end */}

            {/*password text-input start*/}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="your Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </label>
            </div>
            {/*password text-input end */}

            {signInError}
            <input
              className="btn  w-full max-w-xs text-white"
              type="submit"
              value="Login"
            />
          </form>
          {/* //hook form end*/}

          <small>
            <p>
              new to doctors portal ?{" "}
              <Link className="text-primary" to="/signup">
                Create New Account{" "}
              </Link>{" "}
            </p>
          </small>

          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
