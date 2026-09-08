const AddUserForm = ({
                         handleOnSubmitUser,
                         handleOnChangeUser,
                         newUser
                     }) => {
    return (
        <form className="userForm" onSubmit={handleOnSubmitUser}>

            <div className="formGroup">
                <label htmlFor="name">User Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter user's name"
                    value={newUser.name}
                    onChange={handleOnChangeUser}
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleOnChangeUser}
                    required
                >
                    <option value="">Select a role</option>
                    <option value="1">Admin</option>
                    <option value="0">Volunteer</option>
                </select>
            </div>

            <div className="formGroup">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={newUser.password}
                    onChange={handleOnChangeUser}
                    required
                />
            </div>

            <button
                className="submitUserBtn"
                type="submit"
            >
                Add User
            </button>

        </form>
    );
};

export default AddUserForm;