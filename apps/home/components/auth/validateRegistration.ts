import { MainBase } from "airtable-api";
import { User } from "firebase/auth";

const vaildateRegistration = async (user: User | null) => {
  const data = await MainBase.table("Camper-Register")
    .select({
      fields: ["ชื่อ", "Email"],
    })
    .all();

  if (!user) return false;

  return data.find((record) => record.fields["Email"] === user.email) && true;
};

export default vaildateRegistration;
