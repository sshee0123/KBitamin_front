import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import CalendarService from '../../../service/CalendarService'
import MemberService from '../../../service/MemberService'

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickRemove = (event , title, start) => {
    console.log('삭제버튼 ')
    console.log(title,'  ', start)
    setIsOpen(false);
    CalendarService.deleteTaking(MemberService.getCurrentUser().id, title, start);
    navigate(0);
  };
  const onClickEdit = (event , title) => {
    console.log('수정버튼 ')
    setIsOpen(false);
    console.log(title)
  };
  

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick ={(event ) => {onClickRemove(event, props.title, props.start) }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick ={(event ) => {onClickEdit(event, props) }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
