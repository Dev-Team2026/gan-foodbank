const UserCard = ({index, first_name, role, prepAction}) => {
    return (
        <div>
            <p>{first_name} | {role}  <button onClick={()=>prepAction(index, "edit")} >edit</button> <button onClick={()=>prepAction(index, "delete")} >delete</button></p>
        </div>
    )
}
export default UserCard