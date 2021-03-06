import React, {useState} from "react";
import '../../../styles/Messenger/Conversation/ConversationFooter.css';
import {gql, useMutation} from "@apollo/client";
import "emoji-mart/css/emoji-mart.css";
import EmojiPicker from "../Reusable/EmojiPicker";

const ConversationFooter = (props) => {
    const {conversationId} = props;

    const [content, setContent] = useState('');

    const clear = () => {
        // return the initial state
        setContent('')
    }

    const addEmoji = (e) => {
        const emoji = e.native;
        setContent(content + emoji);
    };

    const SEND_MESSAGE = gql`
  mutation createMessage($content: String!, $conversationId: Int!) {
   createMessage(content: $content, conversationId: $conversationId) {
    id
    content
  }
}
`;

    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            content: content,
            conversationId: conversationId
        },
    });

    return (
        <div className="conversation-footer">
            <input type="text" className="conversation-text-input" placeholder="Enter your message here" value={content}
                   onChange={(e) => {
                       setContent(e.target.value)
                   }}
                   onKeyPress={(e) => {
                       if (e.key === 'Enter' && content) {
                           sendMessageMutation();
                           clear();
                       }
                   }}
            />
            <EmojiPicker addEmoji={addEmoji}/>
        </div>
    );
};

export default ConversationFooter;
