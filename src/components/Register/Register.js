import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [comfirmPassword, setConfirmPassword] = useState("");

	const defaultValidInput = {
		isValidEmail: true,
		isValidPhone: true,
		isValidPassword: true,
		isValidConfirmPassword: true,
	};

	const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

	let history = useHistory();
	const handlerClickLogin = () => {
		history.push("/login");
	};

	useEffect(() => {}, []);

	const isValidInputs = () => {
		setObjCheckInput(defaultValidInput);

		if (!email) {
			toast.error("Email is required!");
			setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
			return false;
		}
		let regex = /\S+@\S+\.\S+/;
		if (!regex.test(email)) {
			setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
			toast.error("Your email is invalid!!");
			return false;
		}
		if (!phone) {
			setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
			toast.error("Phone is required!");
			return false;
		}
		if (!password) {
			setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
			toast.error("Password is required!");
			return false;
		}
		if (password != comfirmPassword) {
			setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
			toast.error("The password is not the same");
			return false;
		}

		return true;
	};

	const handleRegister = () => {
		let check = isValidInputs();
		if (check == true) {
			axios.post("http://localhost:8888/api/v1/register", {
				email,
				phone,
				username,
				password,
			});
		}
	};

	return (
		<div className="register-container">
			<div className="container">
				<div className="row px-3 px-sm-0">
					<div className="content-left col-12 d-none col-sm-7 d-sm-block">
						<div className="title">facebook</div>
						<div className="details">Facebook helps you connect and share with the people in your life.</div>
					</div>
					<div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
						<div className="title d-sm-none">facebook</div>
						<div className="form-group">
							<label>Email:</label>
							<input
								type="text"
								className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"}
								placeholder="Email address"
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							/>
						</div>

						<div className="form-group">
							<label>Phone number:</label>
							<input
								type="text"
								className={objCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"}
								placeholder="Phone number"
								value={phone}
								onChange={(event) => {
									setPhone(event.target.value);
								}}
							/>
						</div>
						<div className="form-group">
							<label>Username:</label>
							<input
								type="text"
								className="form-control"
								placeholder="Username"
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
						</div>
						<div className="form-group">
							<label>Password:</label>
							<input
								type="password"
								className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"}
								placeholder="Password"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
							/>
						</div>
						<div className="form-group">
							<label>Re-enter password:</label>
							<input
								type="password"
								className={objCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"}
								placeholder="Re-enter password"
								value={comfirmPassword}
								onChange={(event) => {
									setConfirmPassword(event.target.value);
								}}
							/>
						</div>
						<button className="btn btn-primary" onClick={() => handleRegister()}>
							Register
						</button>
						<hr />
						<div className="text-center">
							<button className="btn btn-success" onClick={() => handlerClickLogin()}>
								Already've an account. Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
