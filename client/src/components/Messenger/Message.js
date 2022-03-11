import React from "react";
import moment from "moment";
import Chip from "./Reusable/Chip";
import '../../styles/Messenger/Message.css';

const Message = (props) => {
    //primaryColor is the color used for the current user's messages, the secondaryColor for the other participants
    const {message, mine, primaryColor='#3f51b5', secondaryColor='#f50057'} = props;

    return (
        <div className="message" style={{
            textAlign: mine ? "right" : "left",
            marginRight: mine ? "20px" : "0",
            marginLeft: mine ? "0" : "20px"
        }}>
            <p className="message-date"
               style={{marginBottom: "0.3rem"}}>{moment(message.createdAt, "x").format('HH:mm')} {message.author.name}</p>
            <Chip text={message.content} backgroundColor={mine ? primaryColor : secondaryColor} textColor="white"/>
        </div>

    );
};

export default Message;

