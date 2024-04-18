import db from "@/lib/db";

const UserService = {
    getUserByEmail: async (email: string) => {
        return db.user.findUnique({
            where: { email }
        });
    },
    getUserById: async (id: string) => {
        return db.user.findUnique({
            where: { id }
        });
    }
}

export default UserService;