
export const checkAdminService = (role: string) => {
    if (role == undefined) throw new Error("You are not authorized to make this operation");
    if (role !== 'admin') throw new Error("You are not authorized to make this operation");
} 