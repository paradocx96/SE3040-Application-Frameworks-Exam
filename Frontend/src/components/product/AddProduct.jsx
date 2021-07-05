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
        code:'',
        name: '',
        amount:0,
        size:0,
        categories: [],
        getCategory:[],
        options:[]
    }

    componentDidMount() {
        CategoryService.getCategories()
            .then(response => {
                console.log(response);
                this.setState({getCategory: response.data.data}, () => {
                    let temp = [];
                    this.state.getCategory.map((item,index) => {
                        let temp_category = {
                            value: item._id,
                            label: item.name
                        }
                        temp.push(temp_category)
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
        let product = {
            code:this.state.code,
            name: this.state.name,
            amount:this.state.amount,
            size:this.state.size,
            categories:this.state.categories
        }
        console.log('What we send : ', product);        
        ProductService.postProduct(product)
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
            categories: event ? event.map(item => item.value) : []
        });
    }

    render() {
        return (
            <Container>
                <h1>Category</h1>
                <h2>Add new Category</h2>
                <Form onSubmit={this.onSubmit}
                    onReset={this.onReset}>

                    <Form.Group controlId="code">
                        <Form.Label>Product Code</Form.Label>
                        <Form.Control
                            placeholder="Product Name"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            placeholder="Product Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group controlId="amount">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="number"
                            name="size"
                            value={this.state.size}
                            onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="categories">
                        <Form.Label>Categories</Form.Label>
                        <Select options={this.state.options}
                                className="basic-multi-select"
                                isMulti
                                onChange={this.onSelect}/>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button type="submit">Add Product</Button>{'\u00A0'}
                            <Button type="reset">Reset</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}