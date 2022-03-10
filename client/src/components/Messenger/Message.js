import React from "react";
import {Chip} from "@material-ui/core";


const Message = (props) => {
    const {message, mine} = props;

    return (
        <div style={{textAlign: mine?"right":"left", marginRight: mine ? "10px" : "0", marginLeft: mine ? "0" : "10px"}}>
            <p style={{marginBottom:"0.3rem"}}>{mine ? "(Me) " : "" }{message.author.name}</p>
            <Chip style={{fontSize:"0.9rem"}} color={mine?"primary": "secondary"} label={message.content}/>
        </div>
    );
};

export default Message;

