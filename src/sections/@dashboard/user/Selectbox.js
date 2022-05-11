import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['없음', '어지러움', '두통', '권태감', '쇼크', '불면', '우울증', '흥분', '졸림', '빈맥', '혈압변화', '가슴 통증', '구토', '변비', '설사', '복통', '식욕부진', '위염', '발진', '두드러기', '부종', '탈모', '근육통', '관절통', '경련', '호흡곤란', '코피', '코막힘', '기침', '피로', '발열', '무기력증', '충혈', '눈곱', '각막염', '이명', '청력소실'];

export default function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        autoSelect
        autoComplete
        options={options}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="상세 부작용" />}
      />
  );
}
