import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Message from '../Message';
import ConversationFooter from "./ConversationFooter";
import ConversationHeader from "./ConversationHeader";
import '../../../styles/Messenger/Conversation/Conversation.css';
import {CURRENT_LOGGED_USER_ID} from "../../../constants";

const CONVERSATION_QUERY = gql`
  query GetSingleConversation($conversationId: Int!) {
  getSingleConversation(conversationId: $conversationId) {
    id
    participants {
      id
      name
    }
    messages {
      id
      content
      author {
        id
        name
      }
      createdAt
    }
  }
}
`

const MESSAGE_ADDED = gql`
  subscription MessageAdded($userId: Int!) {
  messageAdded(userId: $userId) {
    id
    content
    author {
      id
      name
    }
    conversation {
      id
    }
    createdAt
  }
}
`;

const Conversation = (props) => {
    const {conversationId} = props;

    const {data, subscribeToMore} = useQuery(CONVERSATION_QUERY, {
        variables: {
            conversationId: conversationId,
            userId: parseInt(localStorage.getItem(CURRENT_LOGGED_USER_ID))
        }
    });

    subscribeToMore({
        document: MESSAGE_ADDED,
        variables: {
            userId: parseInt(localStorage.getItem(CURRENT_LOGGED_USER_ID))
        },
        updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const messageAdded = subscriptionData.data.messageAdded;
            const exists = prev.getSingleConversation.messages.find(
                ({id}) => id === messageAdded.id
            );
            if (exists) return prev;

            return Object.assign({}, prev, {
                getSingleConversation: {messages: [...prev.getSingleConversation.messages, messageAdded]},
            });
        }
    });

    return (
        <div className="conversation">
            {data && (
                <>
                    <ConversationHeader participants={data.getSingleConversation.participants}/>

                    <div className="conversation-content">
                        {data.getSingleConversation.messages.map((message) => (
                            <Message
                                mine={String(message.author.id) === localStorage.getItem(CURRENT_LOGGED_USER_ID)}
                                key={message.id} message={message}/>
                        ))}
                    </div>

                    <ConversationFooter conversationId={conversationId}/>
                </>
            )
            }
        </div>
    );
};

export default Conversation;