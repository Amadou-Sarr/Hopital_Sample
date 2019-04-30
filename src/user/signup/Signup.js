import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NOM_MIN_LENGTH, NOM_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,PRENOM_MIN_LENGTH, PRENOM_MAX_LENGTH,
    PHOTO_MIN_LENGTH, PHOTO_MAX_LENGTH,
} from '../../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        

            nom: {
                value: ''
            },
            prenom: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            photo: {
                value: ''
            },
             matricule: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
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
    
        const signupRequest = {
            nom: this.state.nom.value,
            prenom: this.state.prenom.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            photo: this.state.photo.value,
            matricule: this.state.matricule.value,
           
        };
        signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'Second Class Project',
                description: "Merci, Enregistrement avec success!! . Veuillez changer votre mot de passe pour continuer!",
            });          
            this.props.history.push("/utilisateur/{this.state.username.value}");
        }).catch(error => {
            notification.error({
                message: 'Second Class Project',
                description: error.message || 'Désolé! Une erreur est survenue. Veuillez reessayer Svp!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.nom.validateStatus === 'success' &&
            this.state.prenom.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'&&
            this.state.photo.validateStatus === 'success'&&
            this.state.matricule.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Enregistrement</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Votre Nom"
                            validateStatus={this.state.nom.validateStatus}
                            help={this.state.nom.errorMsg}>
                            <Input 
                                size="large"
                                name="nom"
                                autoComplete="off"
                                placeholder="Votre Nom"
                                value={this.state.nom.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Votre Prenom"
                            validateStatus={this.state.prenom.validateStatus}
                            help={this.state.prenom.errorMsg}>
                            <Input 
                                size="large"
                                name="prenom"
                                autoComplete="off"
                                placeholder="Votre Nom"
                                value={this.state.prenom.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Votre Matricule"
                            validateStatus={this.state.matricule.validateStatus}
                            help={this.state.matricule.errorMsg}>
                            <Input 
                                size="large"
                                name="matricule"
                                autoComplete="off"
                                placeholder="Votre Matricule"
                                value={this.state.matricule.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateMatricule)} />    
                        </FormItem>
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value} 
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
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
                        <FormItem 
                            label="Coller l'adresse de votre photo"
                            validateStatus={this.state.photo.validateStatus}
                            help={this.state.photo.errorMsg}>
                            <Input 
                                size="large"
                                name="photo"
                                autoComplete="off"
                                placeholder="Votre adresse photo"
                                value={this.state.photo.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePhoto)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Sign up</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }


    // Validation Functions

    validateName = (nom) => {
        if(nom.length < NOM_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nom Trop court (Minimum ${NOM_MIN_LENGTH} characteres.)`
            }
        } else if (nom.length > NOM_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Nom trop long (Maximum ${NOM_MAX_LENGTH} characteres permits.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    
    
    validatePhoto = (photo) => {
        if(photo.length < PHOTO_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Nom Trop court (Minimum ${PHOTO_MIN_LENGTH} characteres.)`
            }
        } else if (photo.length > PHOTO_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Chemain trop long (Maximum ${PHOTO_MAX_LENGTH} characteres permits.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    
    
    validateMatricule= (matricule) => {
        if(matricule.length < NOM_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Matricule Trop court (Minimum ${NOM_MIN_LENGTH} characteres.)`
            }
        } else if (matricule.length > NOM_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Matricule trop long (Maximum ${NOM_MAX_LENGTH} characteres permits.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateName = (prenom) => {
        if(prenom.length < PRENOM_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Prenom Trop court (Minimum ${PRENOM_MIN_LENGTH} characteres.)`
            }
        } else if (prenom.length > PRENOM_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Prenom trop long (Maximum ${PRENOM_MAX_LENGTH} characteres permits.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    
    
    

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
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

export default Signup;