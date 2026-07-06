import UserCard from "./UserCard"

const UserContainer = ({users, prepUserEdit, prepUserDelete}) => {
    return (
        <div>
            {users.map((user)=>(
                <UserCard key={user.id} {...user} prepUserEdit={prepUserEdit} prepUserDelete={prepUserDelete} />
            ))}
        </div>
    )
}
export default UserContainer