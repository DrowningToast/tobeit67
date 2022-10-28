import { MainBase } from "airtable-api";

export const fetchAirtableCamperByEmail = async (email: string) => {
  const records = await MainBase.table<{
    Email: string;
    ชื่อ: string;
    นามสกุล: string;
    มัธยมศึกษาชั้นปีที่:
      | "ม.4"
      | "ม.5"
      | "ม.6"
      | "ปวช. ปี1"
      | "ปวช. ปี2"
      | "ปวช. ปี3"
      | "อื่นๆ";
    จังหวัด: string;
    เบอร์โทรศัพท์ที่สามารถติดต่อได้: string;
  }>("Camper-Register")
    .select({
      fields: [
        "ชื่อ",
        "Email",
        "นามสกุล",
        "มัธยมศึกษาชั้นปีที่",
        "จังหวัด",
        "เบอร์โทรศัพท์ที่สามารถติดต่อได้",
      ],
      filterByFormula: `Email= "${email}"`,
    })
    .all();

  return records;
};

export const fetchAirtableCamperById = async (id: string) => {
  const records = await MainBase.table<{
    Email: string;
    ชื่อ: string;
    นามสกุล: string;
    มัธยมศึกษาชั้นปีที่:
      | "ม.4"
      | "ม.5"
      | "ม.6"
      | "ปวช. ปี1"
      | "ปวช. ปี2"
      | "ปวช. ปี3"
      | "อื่นๆ";
    จังหวัด: string;
    เบอร์โทรศัพท์ที่สามารถติดต่อได้: string;
  }>("Attendance")
    .select({
      fields: [
        "ชื่อ",
        "Email",
        "นามสกุล",
        "มัธยมศึกษาชั้นปีที่",
        "จังหวัด",
        "เบอร์โทรศัพท์ที่สามารถติดต่อได้",
      ],
      filterByFormula: `RECORD_ID()= "${id}"`,
    })
    .all();

  return records;
};

export interface OnsiteCamperRecord {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
  phoneNum: string;
  team: string;
  tid: number;
}

// fetch onsite camper by email
export const fetchAirtableOnsiteCamperByEmail = async (email: string) => {
  const record = await MainBase.table<{
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    nickname: string;
    phoneNum: string;
    team: string;
    tid: number;
  }>("Attendance")
    .select({
      fields: [
        "id",
        "email",
        "firstname",
        "lastname",
        "nickname",
        "phoneNum",
        "team",
        "tid",
      ],
      filterByFormula: `email="${email}"`,
    })
    .all();
  return record;
};

// fetch all onsite campers
export const fetchAirtableOnsiteCampers = async () => {
  const records = await MainBase.table<{
    email: string;
    firstname: string;
    lastname: string;
    nickname: string;
    phoneNum: string;
    team: string;
    tid: number;
  }>("Attendance")
    .select({
      fields: [
        "email",
        "firstname",
        "lastname",
        "nickname",
        "phoneNum",
        "team",
        "tid",
      ],
    })
    .all();
  return records;
};

export const fetchAirtaableStaffByEmail = async (email: string) => {
  const record = await MainBase.table<{
    email: string;
  }>("Staff")
    .select({
      fields: ["email"],
      filterByFormula: `email="${email}"`,
    })
    .all();
  return record;
};

export const checkInCamper = async (
  id: string,
  day: string,
  suffix: "in" | "out"
) => {
  const record = await MainBase.table("Attendance").update([
    {
      id,
      fields: {
        [`day${day}_${suffix}`]: "true",
      },
    },
  ]);
  return record;
};
