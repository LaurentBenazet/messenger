import React from "react";
import moment from "moment";
import Chip from "./Reusable/Chip";
import '../../styles/Messenger/Message.css';
import EmojiPicker from "./Reusable/EmojiPicker";

const Message = (props) => {
    const {message, mine} = props;

    return (
        <div className={`${mine ? "my-message" : "their-message"}`}>
            <p className="message-date">{moment(message.createdAt, "x").format('HH:mm')} {message.author.name}</p>
            <div className="message-content">
                <Chip text={message.content}/>
            </div>
            <div className={`"message-reactions" ${mine ? "my-message-reactions" : "their-message-reactions"}`}>
                <EmojiPicker/>
            </div>
        </div>

    );
};

export default Message;

