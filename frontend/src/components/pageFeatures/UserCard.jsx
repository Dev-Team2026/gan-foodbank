const UserCard = ({id, name, role, prepUserEdit}) => {
    return (
        <div>
            <p>{name} | {role}  <button onClick={()=>prepUserEdit(id)} >edit</button></p>
        </div>
    )
}
export default UserCard