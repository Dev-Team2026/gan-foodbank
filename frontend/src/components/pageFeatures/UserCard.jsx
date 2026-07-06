const UserCard = ({index, name, role, prepUserEdit, prepUserDelete}) => {
    return (
        <div>
            <p>{name} | {role}  <button onClick={()=>prepUserEdit(index)} >edit</button> <button onClick={()=>prepUserDelete(index)} >delete</button></p>
        </div>
    )
}
export default UserCard