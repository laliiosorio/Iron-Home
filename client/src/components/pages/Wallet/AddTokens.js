import { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import WalletService from "../../../services/wallet.service"



class AddTokens extends Component {

    constructor() {
        super()
        this.state = {
            wallet: {
                balance: ''
            },
            loading: false
        }
        this.walletService = new WalletService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ wallet: { ...this.state.wallet, [name]: value } })
    }


    handleFormSubmit = e => {
        e.preventDefault()

        this.walletService
            .editWallet(this.state.wallet.balance)
            .then(() => {
                this.props.closeModal()
                this.props.refreshWallet()
                this.props.showMessage('Su recarga ha sido realizada con exito')
                this.setState({ wallet: { balance: '' } })
            })
            .catch(err => this.props.showMessage(err.response.data.message))
    }


    render() {
        return (
            <Container>

                <Form onSubmit={this.handleFormSubmit} className='add-tokens'>
                    <p>Saldo:</p>
                    <h4>{this.props.wallet.balance} </h4>

                    <Form.Group controlId="balance">
                        <Form.Label>¿Cuántos tokens quieres Cargar?</Form.Label>
                        <Form.Control type="number" value={this.state.wallet.balance} onChange={this.handleInputChange} name="balance" />
                    </Form.Group>

                    <Button className='button-box' type="submit" disabled={this.state.loading}>CARGAR</Button>

                </Form>

            </Container >
        )
    }
}

export default AddTokens