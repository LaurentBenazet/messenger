import React from 'react';
import ConversationPreview from './ConversationPreview';

import {gql, useQuery} from '@apollo/client';

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

const ConversationList = (props) => {
    const {selectConversation} = props;
    const {data} = useQuery(CONVERSATIONS_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.getAllConversations.map((conversation) => (
                        <ConversationPreview key={conversation.id} conversation={conversation}
                                             selectConversation={selectConversation}/>
                    ))}
                </>
            )}
        </div>
    );
};

export default ConversationList;