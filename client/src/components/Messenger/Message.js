import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import Chip from "./Reusable/Chip";
import '../../styles/Messenger/Message.css';
import EmojiPicker from "./Reusable/EmojiPicker";

const Message = (props) => {
    const {message, mine} = props;
    const ref = useRef(null);
    // indicates if the current messages is over the middle of its parent (the conversation) to better position the emoji picker
    const [isOverHalfPage, setIsOverHalfPage] = useState(true);

    useEffect(() => {
        const {offsetTop, offsetHeight} = ref.current;
        const rect = document.body.getBoundingClientRect();
        const documentHeight = rect.height;

        if (offsetTop + offsetHeight > (documentHeight / 2)) {
            setIsOverHalfPage(false);
        }
    }, []);

    return (
        <div className={`message ${mine ? "my-message" : "their-message"}`} ref={ref}>
            <p className="message-date">{moment(message.createdAt, "x").format('HH:mm')} {message.author.name}</p>
            <div className="message-content">
                <Chip text={message.content}/>
            </div>
            <div className={`message-reactions ${mine ? "my-message-reactions" : "their-message-reactions"} ${isOverHalfPage ? "over-half-page" : "under-half-page"}`}>
                <EmojiPicker/>
            </div>
        </div>

    );
};

export default Message;

