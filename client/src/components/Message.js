import React from "react";
import {Chip} from "@material-ui/core";


const Message = (props) => {
    const {message} = props;

    return (
        <div>
            <p style={{marginBottom:"0.3rem"}}>{message.author.name}</p>
            <Chip style={{fontSize:"0.9rem", color:"primary"}} label={message.content}/>
        </div>
    );
};

export default Message;

