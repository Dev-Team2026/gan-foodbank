const UserCard = ({index, name, role, prepAction}) => {
    return (
        <div>
            <p>{name} | {role}  <button onClick={()=>prepAction(index, "edit")} >edit</button> <button onClick={()=>prepAction(index, "delete")} >delete</button></p>
        </div>
    )
}
export default UserCard