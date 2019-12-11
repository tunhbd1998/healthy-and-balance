import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap'
import './auth.css'
class SignIn extends Component {
    render() {
        return (
            <div>
                <Form className="form__auth">
                    <div className="header">
                        <div className='header__logo'><img src='/media/images/logo/logo.png'/></div>
                        <div className='header__title'>
                            <span>Sức Khỏe Blog</span>
                        </div>
                    </div>
                    <div className='form__content'>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control type="text" placeholder="Tên đăng nhập"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Mật khẩu"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control type="text" placeholder="Họ và tên"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Control as='select'>
                                <option value='1'>Nam</option>
                                <option value='0'>Nữ</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <Button className='button__normal' type='submit'>Đăng kí</Button>
                    <div className='form__option' style={{margin:'15px 0'}}>
                        <span>Đăng nhập qua</span>
                        <Button className='btn__social__sign_up google'>
                                <img src='media/images/logo/google.png'/>
                        </Button>
                        <Button className='btn__social__sign_up facebook'>
                                <img src='media/images/logo/facebook.png'/>
                        </Button>
                    </div>
                    <div className='form__other'>Bạn đã có tài khoản? <a href="/sign-in">Đăng nhập ngay</a></div>
                </Form>
            </div>
        );
    }
}

export default SignIn;