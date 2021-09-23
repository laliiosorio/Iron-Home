import { Component } from 'react'
import { Form, Button, Container, Modal, Col, Row } from 'react-bootstrap'
import MenuPurchase from '../../../../services/menu.service'
import FoodList from './FoodList'
import './MenuForm.css'
import logoTokens from './IronTokens.png'



class MenuForm extends Component {

    constructor() {
        super()
        this.state = {
            menu: {
                date: '',
                dish: [],
            },
            modal: false,
            menu_id: ''

        }
        this.MenuPurchase = new MenuPurchase()

    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ menu: { ...this.state.menu, [name]: value } })
    }

    handleCheckbox = (id, checked) => {
        console.log('esto me llega', id, checked)

        const menuCopy = { ...this.state.menu }
        if (checked === true) {
            menuCopy.dish.push(id)
        }
        if (checked === false) {
            menuCopy.dish.splice(menuCopy.dish.indexOf(id), 1)
        }
        this.setState({ menu: menuCopy })
        console.log(menuCopy)

    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.MenuPurchase
            .newMenu(this.state.menu.date, this.state.menu.dish)
            .then((response) => {
                console.log(response)
                this.setState({ menu: { date: '', dish: [] } })
                this.props.showMessage('Compra realizada')
                this.props.history.push('/wallet')
            })
            .catch(err => this.props.showMessage(err.response.data.message))
    }


    PriceMenu(Alldishes) {
        let finalPrice = Alldishes * 6
        return finalPrice
    }


    render() {
        return (
            <>
                <div className='form-menu'>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group controlId="date">
                            <Row className='row-menu'>
                                <h1>Reservar Menú</h1>

                                <Col md={6}>
                                    <div className='menu-ticket'>
                                        <Form.Label>1. ¿Qué día quiere?</Form.Label>
                                        <Form.Control type="date" value={this.state.menu.date} onChange={this.handleInputChange} name="date" />
                                        <Button className='Button-Box' type="submit" disabled={this.state.loading}>
                                            {this.state.loading ? 'Tomando nota' : 'Comprar menú'}
                                        </Button>
                                    </div>
                                </Col >
                                <Col md={6}>

                                    <div className='ticket-menu'>
                                        <div className='ticket-title-menu' >
                                            <img className='logo-ticket-menu' src={logoTokens} alt="IronToken"></img>
                                            <h2>Tu Compra</h2>
                                        </div>
                                        <p><strong>CANTIDAD:</strong> </p>
                                        <p><strong>PRECIO:</strong> 8 Tokens/Tula</p>
                                        <h3><strong>TOTAL:</strong> {this.PriceMenu(this.state.menu.dish.length)}  </h3>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row className='bg-color'>
                            <div className='form-contain'>
                                <Form.Label>2. Elija los platos</Form.Label>
                                <FoodList match={this.props.match} handleCheckbox={this.handleCheckbox} />
                            </div>
                        </Row>
                    </Form>
                </div>
            </>
        )
    }
}

export default MenuForm