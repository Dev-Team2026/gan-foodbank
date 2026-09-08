const UserCard = ({ index, first_name, role, prepAction }) => {
    return (
        <div className="userCard">
            <div className="userInfo">
                <span className="userName">{first_name}</span>
                <span className={`userRole ${role === 1 ? "adminRole" : "volunteerRole"}`}>
                    {role === 1 ? "Admin" : "Volunteer"}
                </span>
            </div>

            <div className="userActions">
                <button
                    className="userBtn editBtn"
                    onClick={() => prepAction(index, "edit")}
                >
                    Edit
                </button>

                <button
                    className="userBtn deleteBtn"
                    onClick={() => prepAction(index, "delete")}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;