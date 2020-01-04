import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComment from '../comment-form/index'
import {
  faComment,
  faBookmark,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {get} from 'lodash'
const ItemComment = ({user}) => {
    const [reactLove,setReactLove] = React.useState(false)
    const [openComment,setOpenComment] = React.useState(false)
    const toggleLove =() => {
        setReactLove(!reactLove)
        console.log(reactLove)
    }
    const toggleComment = () => {
        setOpenComment(!openComment)
    }
    const onCloseComment = () => {
        setOpenComment(false)
    }
    return (
        <div className='for-item-comment'>
        {console.log(openComment)}
            <div className='user-account'>
                <span className='username'>nhtu</span>
                <span className='time'>14 giờ trước</span>
            </div>
            
            <div className='content-comment'>
                asdaskdjasdkj
                asdaskdjasdkj
                asdaskdjasdkj
            </div>
            {user ? 
            <div className='react-comment'>
                <div className={`general-item love ${reactLove ? 'active' :''}`} onClick ={toggleLove}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`icon-comment`}
                        
                    />
                    <div className='description total-love'>12</div>
                </div>
                <div className={`general-item reply ${openComment ? 'active' :''}`} onClick ={toggleComment} >
                    <FontAwesomeIcon
                        icon={faComment}
                        className='icon-comment'
                    />
                    <div className='description reply'>Trả lời</div>
                </div>
            </div>
            : ''}
            <div className='wrap-reply'>
                <div className='user-account'>
                    <span className='username'>nvphuoc</span>
                    <span className='time'>14 giờ trước</span>
                </div>
                <div className='content-comment'>
                    asdaskdjasdkj
                    asdaskdjasdkj
                    asdaskdjasdkj
                </div>
                
                {openComment ? 
                <FormComment hasReply={true} onClick = {onCloseComment} className='replyForm'/>
            : ''}
            </div>
            
        </div>
    )
}
const mapStateToProps = state => ({
    user: get(state, "user")
  });
export default connect(mapStateToProps,null)(ItemComment);
