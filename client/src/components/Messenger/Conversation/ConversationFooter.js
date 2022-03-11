import React, {useState} from "react";
import '../../../styles/Messenger/Conversation/ConversationFooter.css';
import {TextField} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";

const ConversationFooter = (props) => {
    const {conversationId} = props;

    const [conversationState, setConversationState] = useState({
        content: ''
    });

    const clear = () => {
        // return the initial state
        setConversationState({
            content: ''
        })
    }

    const SEND_MESSAGE = gql`
  mutation createMessage($content: String!, $conversationId: Int!) {
   createMessage(content: $content, conversationId: $conversationId) {
    id
    content
    createdAt
  }
}
`;

    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            content: conversationState.content,
            conversationId: conversationId
        },
    });

    return (
        <div className="conversation-footer">
            <TextField value={conversationState.content}
                       onChange={(e) => {
                           setConversationState({content: e.target.value})
                       }}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter' && conversationState.content) {
                               sendMessageMutation();
                               clear();
                           }
                       }} className="conversation-text-input" label="Enter your message here" variant="outlined"/>
        </div>
    );
};

export default ConversationFooter;
