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
//SQLite commands
//

//commands with parameters use binding
//all ?'s are replaced in order with arguments to .get , .all , and .run functions

//get (SELECT)
export function getAllUsers()
{
    return db.prepare(`SELECT * FROM Users`).all()
}

export function getUserById(id)
{
    return db.prepare(`SELECT * FROM Users WHERE user_id=?`).get(id)
}

export function getInventory()
{
    return db.prepare(`SELECT I.item_id, I.name, C.name as category, I.stock FROM Inventory AS I LEFT JOIN Categories AS C ON I.category = C.category_id`).all()
}

export function getInvItemById(id)
{
    return db.prepare(`SELECT * FROM Inventory WHERE item_id=?`).get(id)
}

//add (INSERT)
export function AddUser(firstName, lastName, role, password)
{
    return db.prepare(
        `INSERT INTO Users (first_name, last_name, role, password)
         VALUES (?,?,?,?)
        `
    ).run(firstName, lastName, role, password)
}

export function AddInvItem(name,category,stock)
{
    return db.prepare(
        `INSERT INTO Inventory (name, category, stock)
         VALUES (?,?,?)
        `
    ).run(name,category,stock)
}

//modify (UPDATE)
export function UpdateUser(id, newFName, newLName, newRole, newPassword)
{
    return db.prepare(
        `UPDATE Users SET first_name=?, last_name=?, role=?, password=?
         WHERE user_id=?
        `
    ).run(newFName, newLName, newRole, newPassword, id)
}

export function UpdateInvItem(id, newName, newCategory, newStock)
{
    return db.prepare(
        `UPDATE Inventory SET name=?, category=?, stock=?
         WHERE item_id=?
        `
    ).run(newName, newCategory, newStock, id)
}

//remove (DELETE)
export function deleteUser(id)
{
    return db.prepare(`DELETE FROM Users WHERE user_id=?`).run(id)
}

export function deleteInvItem(id)
{
    return db.prepare(`DELETE FROM Inventory WHERE item_id=?`).run(id)
}