import React, { Component } from 'react';
import { Container, Table, Button, Col, Form, Row } from "react-bootstrap";
import CategoryService from "../../service/CategoryService";

export default class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.viewProductsByCategoty = this.viewProductsByCategoty.bind(this);
    }

    initialState = {
        categoryList: [],
        productList:[]
    }

    componentDidMount() {
        CategoryService.getCategories()
            .then(response => {
                this.setState({
                    categoryList: response.data.data
                })
            }).catch(error => {
                console.log(error.message);
            })
    }

    viewProductsByCategoty(id) {
        CategoryService.getProductsByCategoryId(id)
            .then(response => {
                this.setState({
                    productList:response.data.products
                })
            }).catch(error => {
            console.log(error.message);
        })
    }

    render() {
        return (
            <Container>
                <h1>Category</h1>
                <h3>Category List</h3>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categoryList.length === 0 ?
                                <tr>
                                    <td>Loading...</td>
                                </tr>
                                :
                                this.state.categoryList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                        <Button onClick={this.viewProductsByCategoty.bind(this, item._id)}>
                                                View Products
                                        </Button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>

                <h3>Product Details</h3>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productList.length === 0 ?
                                <tr>
                                    <td>Click on View Products Button for Load Products...</td>
                                </tr>
                                :
                                this.state.productList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.size}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}