import Database from 'better-sqlite3'

//Create db object when module is loaded
//for testing purposes can be pointed to any other ".db" file in directory
//(will create the file if it doesnt exist)
const db = new Database('GanFB.db')
db.pragma('journal_mode = WAL')

export function close()
{
    db.close()
}

//
//SQLite commands (grouped by table)
//

//commands with parameters use binding
//all ?'s are replaced in order with arguments to .get , .all , and .run functions

//
//Users
//
export function getAllUsers()
{
    return db.prepare(`SELECT U.*, R.name as role_name FROM Users AS U LEFT JOIN Roles as R ON U.role = R.role_id`).all()
}

export function getUserById(id)
{
    return db.prepare(`SELECT U.*, R.name as role_name FROM Users AS U LEFT JOIN Roles as R ON U.role = R.role_id WHERE user_id=?`).get(id)
}

export function AddUser(firstName, lastName, role, password)
{
    return db.prepare(
        `INSERT INTO Users (first_name, last_name, role, password)
         VALUES (?,?,?,?)
        `
    ).run(firstName, lastName, role, password)
}

export function UpdateUser(id, newFName, newLName, newRole, newPassword)
{
    return db.prepare(
        `UPDATE Users SET first_name=?, last_name=?, role=?, password=?
         WHERE user_id=?
        `
    ).run(newFName, newLName, newRole, newPassword, id)
}

export function deleteUser(id)
{
    return db.prepare(`DELETE FROM Users WHERE user_id=?`).run(id)
}

//
//Inventory
//
export function getInventory()
{
    return db.prepare(`SELECT I.*, C.name as category_name FROM Inventory AS I LEFT JOIN Categories AS C ON I.category = C.category_id`).all()
}

export function getInvItemById(id)
{
    return db.prepare(`SELECT I.*, C.name as category_name FROM Inventory AS I LEFT JOIN Categories AS C ON I.category = C.category_id WHERE item_id=?`).get(id)
} 

export function AddInvItem(name,category,stock,par)
{
    return db.prepare(
        `INSERT INTO Inventory (name, category, stock, par)
         VALUES (?,?,?,?)
        `
    ).run(name,category,stock,par)
}

export function UpdateInvItem(id, newName, newCategory, newStock, newPar)
{
    return db.prepare(
        `UPDATE Inventory SET name=?, category=?, stock=?, par=?
         WHERE item_id=?
        `
    ).run(newName, newCategory, newStock, newPar, id)
}

export function deleteInvItem(id)
{
    return db.prepare(`DELETE FROM Inventory WHERE item_id=?`).run(id)
}

//
//Categories
//
export function getCategories()
{
    return db.prepare(`SELECT * FROM Categories`).all()
} 

//
//Roles
//
export function getRoles()
{
    return db.prepare(`SELECT * FROM Roles`).all()
} 