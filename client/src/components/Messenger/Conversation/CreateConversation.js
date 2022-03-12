import {gql, useMutation, useQuery} from '@apollo/client';
import "../../../styles/Messenger/Conversation/CreateConversation.css"
import React, {useState} from "react";

const USERS_QUERY = gql`
  query allUsers {
  getAllUsers {
    name
    id
  }
}
`

const CREATE_CONVERSATION = gql`
  mutation createConversation($usersId:[Int!]!) {
   createConversation(usersId: $usersId) {
    id
  }
}
`;

const CreateConversation = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [createConversationMutation] = useMutation(CREATE_CONVERSATION, {
        variables: {
            usersId: selectedUsers
        },
    });

    const handleChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedUsers(
            value
        );
    }

    const {data} = useQuery(USERS_QUERY);

    return (
        <div className="create-conversation">
            <label htmlFor="users-select">Create a conversation with multiple users</label>

            <select name="users" id="users-select" multiple size="5" onChange={handleChange} value={selectedUsers}>
                {data && (
                    <>
                        {data.getAllUsers.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </>
                )}
            </select>

            <button onClick={createConversationMutation}>Create conversation</button>
        </div>
    )
}

export default CreateConversation;