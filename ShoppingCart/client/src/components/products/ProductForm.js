import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addProduct } from "../../actions/productActions";
import ImageUpload from "../common/ImageUpload";
import axios from "axios";

class ProductForm extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    image: null,
    errors: {}
  };

  // imageSelectedHandler = e => {
  //   this.setState({
  //     image: e.target.files[0]
  //   });
  // };

  imageUploadHandler = e => {
    console.log("##########");
    // console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append("file", e.target.files[0]);

    console.log("*************");
    console.log(this.state.image);

    axios
      .post("api/products/upload", fd)
      .then(res => {
        console.log(res.data);
        // this.setState({ image: images });
      })
      .catch(err => console.log(err));

    // const files = Array.from(e.target.files);

    // const formData = new FormData();
    // const types = ["image/png", "image/jpeg", "image/gif"];

    // const config = { headers: { "content-type": "multipart/form-data" } };

    // files.forEach((file, i) => {
    //   if (types.every(type => file.type !== type)) {
    //     this.setState({ errors: `"${file.type}" is not a supported format` });
    //   }

    //   if (file.size > 150000) {
    //     this.setState({
    //       errors: `"${file.name}" is too large, please upload a smaller picture`
    //     });
    //   }

    //   files.forEach((file, i) => {
    //     formData.append(i, file);
    //   });
    // });
  };

  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // const { user } = this.props.auth;

    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description
    };

    this.props.addProduct(newProduct, this.props.history);

    this.setState({
      name: "",
      price: "",
      description: "",
      image: ""
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="product-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add a product...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <div className="imageUpload">
                  <input type="file" />
                  <button onClick={this.imageUploadHandler}>Upload</button>
                </div>
                {/* <ImageUpload imagesHandler={this.imagesHandler} /> */}
                {/* <div className="">
                  <label htmlFor="upload files">Upload Your File</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={this.imagesHandler}
                  />
                </div> */}

                <TextFieldGroup
                  placeholder="name of product"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextAreaFieldGroup
                  placeholder="Brief description of the product"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
              </div>
              <button className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProduct }
)(ProductForm);
