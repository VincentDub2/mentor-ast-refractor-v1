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
    },
    getAdminEmails: async () => {
        return  db.user.findMany({
            where: {
                role: "ADMIN",
            },
            select: {
                email: true,
            },
        });

    }
}

export default UserService;