import UserCard from "./UserCard"

const UserContainer = ({users, prepUserEdit}) => {
    return (
        <div>
            {users.map((user)=>(
                <UserCard key={user.id} {...user} prepUserEdit={prepUserEdit} />
            ))}
        </div>
    )
}
export default UserContainer