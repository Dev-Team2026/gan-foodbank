import UserCard from "./UserCard"

const UserContainer = ({users, prepAction}) => {
    return (
        <div>
            {users.map((user)=>(
                <UserCard key={user.id} {...user} prepAction={prepAction} />
            ))}
        </div>
    )
}
export default UserContainer