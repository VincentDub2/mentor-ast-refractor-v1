import db from "@/lib/db";

const AccountService = {
    getAccountByUserId : async (userId: string) => {
        try {
            return  db.account.findFirst({
                where: {userId}
            });
        } catch {
            return null;
        }
    }
}

export default AccountService;