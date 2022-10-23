import { MainBase } from "airtable-api";

const fetchAirtableCamperByEmail = async (email: string) => {
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

export default fetchAirtableCamperByEmail;
