import axios from 'axios';
import {useState} from 'react'

const GETFORM_FORM_ENDPOINT = "https://getform.io/f/3da53be7-abb3-4efa-8ed3-636f8ab09e0f";


function Form() {
    const [formStatus, setFormStatus] = useState(false);
    const [query, setQuery] = useState({
        name: "",
        email: "",
        platform: "",
        file: ""
    });

    const handleFileChange = () => (e) => {
        setQuery((prevState) => ({
            ...prevState,
            files: e.target.files[0]
        }));
    };

    const handleChange = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(query).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios
            .post(
                GETFORM_FORM_ENDPOINT,
                formData,
                {headers: {Accept: "application/json"}}
            )
            .then(function (response) {
                setFormStatus(true);
                setQuery({
                    fullname: "",
                    email: "",
                    platform: ""
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div class="container-md">
            <h2>Getform.io Next.js File Upload Form Example</h2>
            <form
                acceptCharset="UTF-8"
                method="POST"
                enctype="multipart/form-data"
                id="ajaxForm"
                onSubmit={handleSubmit}
            >
                <div className="form-group mb-2">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                        name="email"
                        value={query.email}
                        onChange={handleChange()}
                    />
                </div>
                <div className="form-group mb-2">
                    <label for="exampleInputName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        placeholder="Enter your fullname"
                        required
                        name="name"
                        value={query.name}
                        onChange={handleChange()}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Favourite Platform</label>
                    <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        required
                        name="platform"
                        value={query.platform}
                        onChange={handleChange()}
                    >
                        <option>Github</option>
                        <option>Gitlab</option>
                        <option>Bitbucket</option>
                    </select>
                </div>
                <hr/>
                <div className="form-group mt-3">
                    <label className="mr-2">Upload your CV:</label>
                    <input name="file" type="file" onChange={handleFileChange()}/>
                </div>
                <hr/>
                {formStatus ? (
                    <div className="text-success mb-2">
                        Your message has been sent.
                    </div>
                ) : (
                    ""
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Form