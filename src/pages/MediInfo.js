import { useState, useEffect } from 'react';
// components
import { makeStyles } from '@material-ui/core/styles';
import { ShapeStyle } from '../sections/@dashboard/user';
// MediService
import MediService from '../service/MedicineService';
// Css
import './MediInfo.css';

// ----------------------------------------------------------------------

export default function MediInfo() {

    // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

    const [medicines, setMedicines] = useState([]);
    // 약 리스트 개수
    const [medicineCnt, setMedicineCnt] = useState(0);

    // 비동기 처리로 다시 약 정보 가져오기
    const fetchMediFunc = async () => {
      await MediService.getAllMedicineInfo().then((res) => {
        setMedicineCnt(medicineCnt+1);
        setMedicines(res.data);
        return res.data;
      })  
    }
  
    useEffect(() => {
      fetchMediFunc()
    },[]);

  // Toggle function
  const useStyles = makeStyles((theme) => ({
    toggleContainer: {
      margin: theme.spacing(2, 0),
    },
  }));

  const classes = useStyles();

  const [menuItem, setMenuItem] = useState(medicines);

  // ShapeStyle 에 MediInfo 코드 다 있음
  return (
        <ShapeStyle menuItems={menuItem}/>
  );
}