import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import UserStore    from './stores/UserStore';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false
        }
    }
// PROPERTY HERE REFERS TO THE 'Email' AND 'Password'
    setInputValue(property, val) {
        val = val.trim();
        if(val.length > 12){
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            email: '',
            password: '',
            buttonDisabled: false
        })
    }
    // API CALL
    async doLogin() {
        if (!this.state.email){
            return;
        }
        if (!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
           
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
            }

            else if (result && result.success === false) {
                this.resetForm();
                alert (result.msg);
            }
        }

        catch(e) {
            console.log(e);
            this.resetForm();

        }
    }
    render(){
    // USER INTERFACE FOR THE LOGIN FORM
        return(
            <div className="loginForm">
    
                Sign into your account
            {/* THE INPUT FIELD FOR EMAIL ADDRESS */}
                <InputField
                    type = 'text'
                    placeholder = 'Email'
                    value = { this.state.email ? this.state.email: ''}
                    onChange = { (val) => this.setInputValue('email', val)}
               />
               
            {/* THE INPUT FIELD FOR PASSWORD */}
    
                <InputField
                    type = 'password'
                    placeholder = 'Password'
                    value = { this.state.password ? this.state.password: ''}
                    onChange = { (val) => this.setInputValue('password', val)}
                />
            {/* THE LOG IN BUTTON */}
                <SubmitButton
                    text = 'Login'
                    disabled = { this.state.buttonDisabled}
                    onClick = { () => this.doLogin()}
                />


            </div>
        );
    }
}

export default LoginForm;