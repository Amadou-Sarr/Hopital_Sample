import React, { Component } from 'react';
import { changepass } from '../../util/APIUtils';
import './changepass.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { 
   
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
} from '../../constants';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: {
                value: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

  

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const changepassReq = {
            password: this.state.password.value,
           
        };
        changepass(changepassReq)
        .then(response => {
            notification.success({
                message: 'Second Class Project',
                description: "Merci, mot de passe changer avec success!! vous serrez rediriger dans quelques secondes! ",
            });          
            this.props.history.push("/signin");
        }).catch(error => {
            notification.error({
                message: 'Second Class Project',
                description: error.message || 'Désolé! Une erreur est survenue. Veuillez reessayer Svp!'
            });
        });
    }

    render() {
        
        return (
        <div className="changepass-container">
                <h1 className="page-title">Sign Up</h1>
            <Form onSubmit={this.handleSubmit} className="changepass-form">
                
                <FormItem 
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="changepass-form-button">ChangePassword</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
          </div>
        );
    }

validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
        }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };            
    }
}

}

export default ChangePassword;