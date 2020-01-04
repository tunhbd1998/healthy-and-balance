import React from 'react'
import './form-comment.scss'
import { Form,Button } from "react-bootstrap";
import {connect} from "react-redux";
import {get} from 'lodash'
const FormComment = ({hasReply,onClick})=> {
        const [disabled, setDisabled] = React.useState(true)
        const [open,setOpen] = React.useState(true)
        const handleChangeText = (e) => {
            console.log(e.target.value.length)
            const sizeText = e.target.value.length;
            if(sizeText === 0) {
                setDisabled(true)
            }
            else {
                setDisabled(false)
            }
        }
        return (
            <div>
            <div className='form-comment-container'>
                <Form.Group className='custom-form'>
                    <Form.Control as="textarea" rows="3" className ='area-comment' onChange={handleChangeText}/>
                    <div className='control-comment'>
                        {hasReply ? <div className='cancel' onClick={onClick}>Huỷ</div> : ''}
                        <button className='button-comment' onClick ={onClick}disabled={disabled}>Bình luận</button>
                    </div>
                </Form.Group>
            </div>
                
            </div>
        )
}
const mapStateToProps = state => ({
    user: get(state, "user")
  });
export default connect(mapStateToProps,null)(FormComment);
