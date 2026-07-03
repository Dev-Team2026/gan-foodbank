import UserCard from "./UserCard"

const UserContainer = ({users}) => {
    return (
        <div>
            {users.map((user)=>(
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    )
}
export default UserContainer