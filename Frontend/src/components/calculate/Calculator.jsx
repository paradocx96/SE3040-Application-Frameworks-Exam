import React, { Component } from 'react';
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import Select from 'react-select';
import CalculatorService from "../../service/CalculatorService";
import ProductService from "../../service/ProductService";

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = this.initialState;
    }

    initialState = {
        delivery: 0,
        products: [],
        getProduct: [],
        options: []
    }

    componentDidMount() {
        ProductService.getProducts()
            .then(response => {
                console.log(response);
                this.setState({ getProduct: response.data.data }, () => {
                    let temp = [];
                    this.state.getProduct.map((item, index) => {
                        let temp_product = {
                            value: item._id,
                            label: item.name,
                            price: item.amount
                        }
                        temp.push(temp_product)
                    });
                    this.setState({ options: temp });
                })
            }).catch(error => {
                console.log(error.message);
            })
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        let temp = {
            delivery: this.state.delivery,
            products: this.state.products
        }
        console.log('What we send : ', temp);        
        CalculatorService.getCalculateValue(temp)
            .then(res => {
                console.log('Calculated Price : ',res);
            }).catch(err => {
                console.log(err.message);
                alert(err.message);
            });
        this.setState(() => this.initialState);
    }

    onReset = (event) => {
        event.preventDefault();
        this.setState(() => this.initialState);
    }

    onSelect(event) {
        this.setState({
            products: event ? event.map(item => item.price) : []
        });
    }

    render() {
        return (
            <Container>
                <h1>Order Price Calculator</h1>
                <Form onSubmit={this.onSubmit}
                    onReset={this.onReset}>
                    <Form.Group controlId="delivery">
                        <Form.Label>Delivery Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="delivery"
                            value={this.state.delivery}
                            onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="products">
                        <Form.Label>Select Products</Form.Label>
                        <Select options={this.state.options}
                            className="basic-multi-select"
                            isMulti
                            onChange={this.onSelect} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button type="submit">Calculate</Button>{'\u00A0'}
                            <Button type="reset">Reset</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}