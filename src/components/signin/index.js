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
                    </div>
                    <Button className='button__normal' type='submit'>Đăng nhập</Button>
                    <div className='form__option'>
                        <span>OR</span>
                    </div>
                    <div>
                        <Button className='btn__social google'>
                            <div className="form__social"> 
                                <img src='media/images/logo/google.png'/>
                                Đăng nhập bằng tài khoản Google
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button className='btn__social facebook'>
                            <div className="form__social"> 
                                <img src='media/images/logo/facebook.png'/>
                                Đăng nhập bằng tài khoản Facebook
                            </div>
                        </Button>
                    </div>
                    <div className='forgot__password'>
                        <a href='/forgot-password'>Quên mật khẩu ?</a>
                    </div>
                    <div className='form__other'>Bạn chưa có có tài khoản? <a href="/sign-up">Đăng kí ngay</a></div>
                </Form>
            </div>
        );
    }
}

export default SignIn;