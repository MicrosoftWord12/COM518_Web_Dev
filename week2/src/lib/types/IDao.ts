export default interface IDao {
    tableName: string
    createSql: (sql: string, params?: any) => unknown[]
    createSqlMany: (sql: string[], params?: any) => void
}