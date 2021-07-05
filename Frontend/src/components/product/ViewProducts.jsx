import React, { Component } from 'react';
import { Container, Table, Button, Col, Form, Row } from "react-bootstrap";
import ProductService from "../../service/ProductService";

export default class ViewProducts extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.deleteProductById = this.deleteProductById.bind(this);
    }

    initialState = {
        productList:[]
    }

    componentDidMount() {
        ProductService.getProducts()
            .then(response => {
                this.setState({
                    productList: response.data.data
                })
            }).catch(error => {
                console.log(error.message);
            })
    }

    deleteProductById(id) {
        ProductService.deleteProductById(id)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            }).catch(error => {
            console.log(error.message);
        })
    }

    render() {
        return (
            <Container>
                <h1>Product</h1>
                <h3>Product List</h3>
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productList.length === 0 ?
                                <tr>
                                    <td>Loading...</td>
                                </tr>
                                :
                                this.state.productList.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.size}</td>
                                        <td>
                                        <Button onClick={this.deleteProductById.bind(this, item._id)}>
                                                Delete Product
                                        </Button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>               
            </Container>
        )
    }
}