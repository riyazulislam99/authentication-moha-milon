import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {

    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // sign in user using context api
        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                e.target.reset();
                navigate('/orders');
            })
            .catch(error => {
                console.error(error)
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user);
            navigate('/orders');
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-info">Login</button>
                        </div>
                    </form>
                    <div className="pl-8">
                        <p>New user?<Link to='/register'><button className="btn btn-link">Register</button></Link></p>
                        <p onClick={handleGoogleSignIn} className="btn btn-ghost">Google</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;