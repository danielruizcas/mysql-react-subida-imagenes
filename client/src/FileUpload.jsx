import { useEffect, useState } from "react";
import axios from "axios";

function FileUpload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const RELATIVEPATH = "http://localhost:8081/images/";

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", file);
    await axios
      .post("http://localhost:8081/register", formData)
      .then((res) => {
        if (res.data.status === "Success") {
          console.log("Succeded");
        } else {
          console.log(res);
        }
      })
      .catch((error) => console.error(error));
  };

  const isFormValid = name && email && password && file;

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <section className="bg-white p-3 rounded w-25">
        <h2>Sign up</h2>
        <form action="" onSubmit={handleUpload}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              className="form-control rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="form-control rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-3">
              <label htmlFor="image">
                <strong>Image</strong>
              </label>
              <input
                name="image"
                type="file"
                onChange={handleFile}
                className="form-control rounded"
              />
            </div>
          </div>
          <button className="btn btn-success w-100" disabled={!isFormValid}>
            <strong>Create acount</strong>
          </button>
          <p>You are agree to out terms and policies</p>
        </form>
      </section>
      <section>
        <ul>
          {data &&
            data.map((res) => (
              <li
                key={res.id_user}
                style={{
                  display: "flex",
                  listStyle: "none",
                  flexDirection: "row",
                }}
              >
                <span>
                  {res.name}
                  <br />
                  {res.email}
                  <br />
                  {res.id_user}
                  <br />
                </span>
                <img
                  src={RELATIVEPATH + res.image}
                  alt="imagen"
                  style={{ width: "60px", marginLeft: "10px" }}
                ></img>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default FileUpload;
