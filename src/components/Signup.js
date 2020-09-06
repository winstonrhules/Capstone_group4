import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from "../constants";

export default class Signup extends Component {
    state =  {
        fname: "",
        lname: "", 
        address: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        agreebox: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signUp = e => {
        e.preventDefault();
        axios.post(API_URL, this.state)
        .then(() => {
            console.log(this.state)
            this.setState({
                fname: "",
                lname: "", 
                address: "",
                phone: "",
                username: "",
                email: "",
                password: "",
                password_confirm: "",
                agreebox: ""
            })
        })
    }
    render() {
        return (
            <div className="container"> 
                    <p className="register">Registration</p>
                        <form className="grid-container">
                            <div>
                                <input type="text" name="fname" 
                                value={this.state.fname} 
                                onChange={this.onChange}
                                placeholder="First Name *"/>
                                <input type="text" name="lname" 
                                value={this.state.lname} 
                                onChange={this.onChange}
                                placeholder="Last Name *"/>
                                <input type="text" name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                                onChange={this.onChange} 
                                placeholder="Address *"/>
                                <input type="text" name="phone"
                                value={this.state.phone}
                                onChange={this.onChange} 
                                placeholder="Phone Number *"/>
                                {/* <br/>
                                <select className="city">
                                    <option>City</option>
                                    <option>Accra</option>
                                    <option>Kumasi</option>
                                    <option>Tamale</option>
                                    <option>Takoradi</option>
                                </select>
                                <br/> */}
                                <input className="checkbox" name="agreebox"
                                type="checkbox" value="Agree"/><span>I agree with the 
                                <a href="/">Terms & Conditions</a></span>
                            </div>
                            <div>
                                <input type="text" name="username"
                                value={this.state.username} 
                                onChange={this.onChange}
                                placeholder="Username *"/>
                                <input type="text" name="email"
                                value={this.state.email} 
                                onChange={this.onChange}
                                placeholder="Email *"/>
                                <input type="text" name="password"
                                value={this.state.password}
                                onChange={this.onChange} 
                                placeholder="Password"/>
                                <input type="text" name="password_confirm"
                                value={this.state.password_confirm}
                                onChange={this.onChange} 
                                placeholder="Confirm Password"/>
                            </div>
                        </form>
                        <div><button onSubmit={this.signUp}>Create Account</button></div> 
            </div>  
        )
    }
}
