import { useContext, useEffect } from 'react';
import CardDetail from '../../components/CardDetail/CardDetail';
import style from './DoctorDetail.module.css';
import { Context } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';

const DoctorDetail = ({ doctor }) => {
  const [doctorsData] = useContext(Context);
  const { doctorDetail, fetchDoctorById } = doctorsData;
  const { id } = useParams();

  useEffect(() => {
    fetchDoctorById(id); // ----> {doctor} ----> doctorDetail
  }, []);

  return (
    <div className={style.divBody}>
      <CardDetail doctorDetail={doctorDetail} />
    </div>
  );
};

export default DoctorDetail;
