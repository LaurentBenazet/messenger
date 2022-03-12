import React, {useState} from "react";
import '../../../styles/Messenger/Conversation/ConversationFooter.css';
import {TextField} from "@material-ui/core";
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
        let emoji = e.native;
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
            <TextField value={content}
                       onChange={(e) => {
                           setContent(e.target.value)
                       }}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter' && content) {
                               sendMessageMutation();
                               clear();
                           }
                       }} className="conversation-text-input" label="Enter your message here" variant="outlined"/>
            <EmojiPicker addEmoji={addEmoji}/>
        </div>
    );
};

export default ConversationFooter;
