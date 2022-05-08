import React, { useState, useEffect } from 'react';
// material
import { Button, ButtonGroup, Stack } from '@mui/material';
import 원형 from './Images/circle.png';
import All from './Images/diamond.png';
import fillcolor from './Images/fillcolor.png';
import halfcircle from './Images/halfcircle.png';
import hexa from './Images/hexa.png';
import 장방형 from './Images/jangbang.png';
import jeongjae from './Images/jeongjae.png';
import kyungjil from './Images/kyungjil.png';
import minus from './Images/minus.png';
import nothing from './Images/nothing.png';
import othershape from './Images/othershape.png';
import 타원형 from './Images/oval.png';
import penta from './Images/penta.png';
import plusplus from './Images/plusplus.png';
import 사각형 from './Images/triangle.png';
import 삼각형 from './Images/square.png';
import yeonjil from './Images/yeonjil.png';





function Seperate({ button, filter }) {
    return (
        <div>
            {
                button.map((fuck, i) => {
                    return <Button onClick={() => filter(fuck)} >{fuck}</Button>

                })
            }

        </div>

    )
}

export default Seperate;