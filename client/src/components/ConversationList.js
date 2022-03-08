import React from 'react';
import Conversation from './Conversation';

import { useQuery, gql } from '@apollo/client';

const CONVERSATIONS_QUERY = gql`
  {
    getAllConversations {
    id
    participants {
      id
      name
    }
  }
  }
`

const ConversationList = () => {
    const { data } = useQuery(CONVERSATIONS_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.getAllConversations.map((conversation) => (
                        <Conversation key={conversation.id} conversation={conversation} />
                    ))}
                </>
            )}
        </div>
    );
};

export default ConversationList;