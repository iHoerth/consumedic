import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import Loading from "../../Loading/Loading";

const MyDates = () => {
  const [loading, setLoading] = useState(true);
  const { patientDetail, fetchPatientByEmail } = useContext(Context)[1];
  const { session } = useContext(Context)[2];

  useEffect(() => {
    fetchPatientByEmail(session.email);
  }, []);

  useEffect(() => {
    patientDetail.id && setLoading(false);
    console.log(patientDetail);
  }, [patientDetail]);

  if (loading) {
    return <Loading></Loading>;
  }

  return <></>;
};

export default MyDates;
