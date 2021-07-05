import React, { Component } from 'react';
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import Select from 'react-select';
import CategoryService from "../../service/CategoryService";
import ProductService from "../../service/ProductService";

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = this.initialState;
    }

    initialState = {
        name: '',
        description: '',
        products: [],
        getProduct:[],
        options:[]
    }

    componentDidMount() {
        ProductService.getProducts()
            .then(response => {
                console.log(response);
                this.setState({getProduct: response.data.data}, () => {
                    let temp = [];
                    this.state.getProduct.map((item,index) => {
                        let temp_product = {
                            value: item._id,
                            label: item.name
                        }
                        temp.push(temp_product)
                    });
                    this.setState({options:temp});
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
        let category = {
            name: this.state.name,
            description: this.state.description,
            products: this.state.products
        }

        console.log('What we send : ', category);
        
        CategoryService.postCategory(category)
            .then(res => {
                console.log(res);
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
            products: event ? event.map(item => item.value) : []
        });
    }

    render() {
        return (
            <Container>
                <h1>Category</h1>
                <h2>Add new Category</h2>
                <Form onSubmit={this.onSubmit}
                    onReset={this.onReset}>

                    <Form.Group controlId="name">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            placeholder="Category Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Category Details..."
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="products">
                        <Form.Label>Products</Form.Label>
                        <Select options={this.state.options}
                                className="basic-multi-select"
                                isMulti
                                onChange={this.onSelect}/>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button type="submit">Add Category</Button>{'\u00A0'}
                            <Button type="reset">Reset</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}